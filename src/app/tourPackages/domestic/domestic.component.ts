import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { ToursService } from '../../service/tours.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domestic',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ],
  templateUrl: './domestic.component.html',
  styleUrls: ['./domestic.component.scss']
})
export class DomesticComponent implements OnInit {

  constructor(private tours:ToursService,
    private router:Router) { }

  public carouselTile: NgxCarousel;
  Domestic = false;
  International = false;
  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number): string => {
      return '₹' + value;
    }
  };

  totalTours;

  ngOnInit() {
    
    document.getElementById("dom").classList.add("selected");
    this.Domestic = true;
    
    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }

    this.tours.getTours('wayzook/tours').subscribe(Response=>
      {
          this.totalTours = Response;
          for(var i=0;i<this.totalTours.length;i++)
          {
            let obj = this.totalTours[i].destImages;
            // console.log(obj[Object.keys(obj)[0]]);
            this.totalTours[i].imageLink = obj[Object.keys(obj)[0]].image;
          }
          console.log(this.totalTours);
      });



    
  }
  
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  domTours()
  {
    document.getElementById("dom").classList.add("selected");
    document.getElementById("int").classList.remove("selected");
    this.Domestic = true;
    this.International = false;
  }

  intTours()
  {
    document.getElementById("int").classList.add("selected");
    document.getElementById("dom").classList.remove("selected");
    this.International = true;
    this.Domestic = false;
  }

  goToTour(id)
  {
    this.router.navigate(['tour'], {
      queryParams: { 'id':id}
    });
  }
  

}
