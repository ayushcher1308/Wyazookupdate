 
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToursService } from '../service/tours.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router,
    private tours:ToursService) { }

  people;
  price = 1000;
  tour;

  ngOnInit() {
     var height = window.innerHeight+20;
    if(document.getElementById("myCarousel")){
    document.getElementById("myCarousel").style.height = height+'px';}
    this.people = 1;
    this.getDestination();
    this.loader();
    // setTimeout(()=>this.router.navigate(['/booking']),2000);
    // this.router.navigate(['/booking']);
  }

  getDestination()
  {
      this.tours.getTours('wayzook/tours').subscribe(Response=>
        {
            console.log(Response);
            this.tour = Response;
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

  decrement()
  {
    if(this.people > 1)
    {
      this.people = this.people - 1;
    }
  }

  increment()
  {
    if(this.people < 8)
    {
      this.people = this.people + 1;
    }
  }

}