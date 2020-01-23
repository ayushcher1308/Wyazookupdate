import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../service/tours.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private tours:ToursService) { }
  tourId;
  tourInfo;
  image;
  tourImages = [];
  transactionId;
  UserDetail;
  orderId;
  ngOnInit() {
    document.getElementById("loading").style.display="block";

    // this.route.queryParamMap.subscribe(queryParams => {
    //   this.transactionId = queryParams.get("booking");
    // });


    this.route.paramMap.subscribe(Response => {
      console.log(Response['params'].tour);
      this.transactionId = Response['params'].pid;
      this.tourId = Response['params'].tour;
      this.orderId = Response['params'].orderId;
      this.getTourInfo();
      // this.transactionId = Response.params.tour;
    });
  


  }

  getUserDetails()
  {
    let uid = localStorage.getItem("uid");
    this.tours.getTours('wayzook/users/findById?id='+uid).subscribe(Response=>{
      console.log(Response)
      this.UserDetail={
        name:Response.name,
        contact:Response.contact,
        email:Response.email
      };
      document.getElementById("loading").style.display="none";
      })
  }

  getTourInfo()
  {
    this.tours.getTours('wayzook/tours/findById?id='+this.tourId).subscribe(Response=>
      {
          this.tourInfo = Response;
          console.log(this.tourInfo);
          
          let a = Object.keys(this.tourInfo.destImages);
          for(let i=0;i<3;i++)
          {
            if(this.tourInfo.destImages[a[i]])
            {
              this.tourImages.push(this.tourInfo.destImages[a[i]]);
            }
          }
          this.image = this.tourImages[0].image;
          console.log(this.tourImages);
          this.getUserDetails();
      });
  }

}
