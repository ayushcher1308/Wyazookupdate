import { Component, OnInit } from '@angular/core';
import { ToursService } from '../service/tours.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private tours:ToursService,
    private router:Router,
    public ngxSmartModalService: NgxSmartModalService) { }
  Users;
  bookingDetails;
  confirmCancel=false;
  bookingKey;
  index;
  cancelMessage;

  ngOnInit() {
    document.getElementById("loader").style.display = "block";
    let uid = localStorage.getItem("uid");
    this.tours.getTours('wayzook/users/findById?id='+uid).subscribe(Response=>{
        this.Users = Response;
    })

    this.getAllBookings();
  }

  getAllBookings()
  {
    let uid = localStorage.getItem("uid");
    this.tours.getTours("wayzook/bookings/getAllBookingForUser?userid="+uid).subscribe(Response=>
      {
        console.log(Response);
        this.bookingDetails = Response;
        for(var i=0;i<Response.length;i++)
        {
          var date = new Date(Response[i].tour.startDate).toString();
          var datearr = date.split(" ");
          this.bookingDetails[i].month = datearr[1];
          this.bookingDetails[i].date = datearr[2];
          document.getElementById("loader").style.display = "none";
        }
      })
  }

  login()
{
  localStorage.setItem("previousRoute",this.router.url);
  this.router.navigate(['login']);
}

logout()
{
  localStorage.removeItem("uid");
  localStorage.removeItem("token");
  location.reload();
}

cancel(key,i)
{
  this.bookingKey = key;
  this.index = i;
  this.confirmCancel = false;
  this.ngxSmartModalService.open("myModal");
}

cancelBooking(){
  document.getElementById("loader").style.display = "block";
  this.bookingDetails.splice(this.index,1);
  let headers={
    "key":this.bookingKey
  }
  this.tours.cancelBooking("wayzook/bookings/cancel",headers).subscribe(Response=>{
      console.log(Response);
      this.cancelMessage = Response.msg;
      document.getElementById("loader").style.display = "none";
      this.ngxSmartModalService.closeAll();
      this.snackbar();

      // this.getAllBookings();

  })
}

snackbar()
{
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


}
