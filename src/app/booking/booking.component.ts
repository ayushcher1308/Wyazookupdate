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
  ngOnInit() {

    this.route.queryParamMap.subscribe(queryParams => {
      this.transactionId = queryParams.get("booking");
    });

    this.tourId = this.route.snapshot.paramMap.get('tour');
    
    console.log(this.tourId+"  "+this.transactionId);

    document.getElementById("loading").style.display="block";

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
          document.getElementById("loading").style.display="none";
      });


  }

  getUserDetails()
  {
    let uid = localStorage.getItem("uid");
    this.tours.getTours('wayzook/users/findById?id='+uid).subscribe(Response=>{
      this.UserDetail={
        name:Response.name,
        contact:Response.contact,
        email:Response.email
      };
      document.getElementById("loading").style.display="none";
      })
  }

}
