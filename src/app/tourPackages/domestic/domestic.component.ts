import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { ToursService } from '../../service/tours.service';
import { trigger, style, animate, transition } from '@angular/animations';

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

  constructor(private tours:ToursService) { }

  public carouselTile: NgxCarousel;
  Domestic = false;
  International = false;

  countryName = [
    {
      name:"Spain",
      price:100000,
      tour:"2 Days/ 1 Night"
    },
     {
      name:"Australia",
      price:100000,
      tour:"2 Days/ 1 Night",
      offer:"20% Off"
    },
     {
      name:"Manali",
      price:100000,
      tour:"2 Days/ 1 Night"
    },
     {
      name:"New York",
      price:100000,
      tour:"2 Days/ 1 Night",
       offer:"10% Off"
    },
     {
      name:"China",
      price:100000,
      tour:"2 Days/ 1 Night"
    },
     {
      name:"Kerela",
      price:100000,
      tour:"2 Days/ 1 Night"
    }

  ];

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
  

}
