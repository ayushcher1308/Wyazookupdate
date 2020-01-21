 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToursService } from '../service/tours.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
// import { Response } from '@angular/http';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public carouselBannerItems: Array<any>;
  public carouselBanner: NgxCarousel;

  constructor(public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private tours:ToursService) { }

  people;
  price = 1000;
  tour;
  upcomingTrips = [];

  ngOnInit() {
     var height = window.innerHeight+20;
    if(document.getElementById("myCarousel")){
    document.getElementById("myCarousel").style.height = height+'px';}
    this.people = 1;
    this.getDestination();
    this.carouselBannerItems = [
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg',
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg',
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg',
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg',
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg',
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg',
'https://www.tripsinegypt.com/wp-content/uploads/2019/07/Egypt-Deals-2020-Egypt-Holiday-Deals-Egypt-Tours-2020-Nile-Cruise-2020-Trips-In-Egypt-1.jpg'];
this.carouselBanner = {
  grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
  slide: 1,
  speed: 400,
  interval: 4000,
  point: {
    visible: true
  },
  load: 2,
  loop: true,
  custom: 'banner',
  touch: true
}
    this.loader();

  }

  getDestination()
  {
      this.tours.getTours('wayzook/tours').subscribe(Response=>
        {
            this.tour = Response;
            console.log(Response);
            for(var i=0;i<5;i++)
            {
                if(this.tour[i])
                {
                  let obj = this.tour[i].destImages;
                  if(obj)
                  this.tour[i].imageLink = obj[Object.keys(obj)[0]].image;
                  this.upcomingTrips.push(this.tour[i]);
                }
                else
                break;
                
                
            }
            console.log(this.tour);
        })
  }

  loader()
  {
    setTimeout(function() {
    for(var i=1;i<5;i++){
         var element = document.getElementById("landing"+i);
        element.classList.add("done");
    }
  
  setTimeout(function() {
    for(var i=1;i<5;i++){
         var element = document.getElementById("landing"+i);
        element.classList.add("page");
        
    }
    
    setTimeout(function() {
      var el = document.getElementById("pageLoad");
      el.classList.add('off');
      document.getElementById("comppage").style.display = 'block';
      // document.getElementById("page-content-wrapper").style.display = 'block';
  	}, 500)
  }, 500)
}, 1500);
console.log("anii");
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  public carouselBannerLoad(evt: any) {
 
    const len = this.carouselBannerItems.length
    console.log("hii");
      for (let i = 0; i < len; i++) {
        this.carouselBannerItems.push(i);
      }
   
 
  }

  goToTour(id)
  {
    this.router.navigate(['tour',id]);
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


}