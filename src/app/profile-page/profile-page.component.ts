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

  ngOnInit() {
    document.getElementById("loader").style.display = "block";
    let uid = localStorage.getItem("uid");
    this.tours.getTours('wayzook/users/findById?id='+uid).subscribe(Response=>{
        this.Users = Response;
        document.getElementById("loader").style.display = "none";
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

cancel()
{
  this.ngxSmartModalService.open("myModal");
}


}
