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
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './domestic.component.html',
  styleUrls: ['./domestic.component.scss']
})
export class DomesticComponent implements OnInit {

  constructor(private tours: ToursService,
    private router: Router) { }

  public carouselTile: NgxCarousel;
  Domestic = false;
  International = false;
  cities = [];
  minValue: number = 10000;
  maxValue: number = 500000;
  options: Options = {
    floor: 1000,
    ceil: 1000000,
    translate: (value: number): string => {
      return '₹' + value;
    }
  };

  keyword = 'name';
  data = [];

  totalTours;
  domesticTours;
  internationalTours;
  filteredTours;
  cityList;
  cityS;
  daysS;
  maxLeft;
  maxRight;
  domMaxRight;
  intMaxRight
  r1;
  r2;
  enquiryForm = {
    destination:'',
    departureCity:'',
    departureDate:'',
    type:'',
    contact:'+91-',
    name:'',
    email:''
  };
  popularTours;

  ngOnInit() {

    // document.getElementById("dom").classList.add("selected");
    document.getElementById("loading").style.display="block";
    this.Domestic = true;
    document.getElementById("myDate").setAttribute("min",this.formatDate());

    this.carouselTile = {
      grid: { xs: 2, sm: 3, md: 3, lg: 5, all: 0 },
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

    this.maxLeft = 0;
    this.maxRight = -9*320;
    document.getElementById("transform").style.width = "800px";

    this.getAllTours();

  }

  getAllTours() {
    this.tours.getTours('wayzook/tours').subscribe(Response => {
      this.totalTours = Response;
      console.log(Response);
      for (var i = 0; i < this.totalTours.length; i++) {
        let obj = this.totalTours[i].destImages;
        // console.log(obj[Object.keys(obj)[0]]);
        if(obj)
        this.totalTours[i].imageLink = obj[Object.keys(obj)[0]].image;
        this.cities.push(this.totalTours[i].destName);
      }
      this.cityList = this.getUnique(this.cities);
      for(let i=0;i<this.cityList.length;i++)
      {
        let obj = {
          id:i+1,
          name:this.cityList[i]
        }
        this.data.push(obj);
      }
      console.log(this.cityList);
      this.filteredTours = this.totalTours;
      console.log(this.filteredTours);
      this.getDomesticTours();
      this.getInternational();
      this.getPopularTours();
      document.getElementById("loading").style.display="none";
    });
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  getPopularTours()
  {
      this.popularTours=[];
      for(var i=0;i<this.totalTours.length;i++)
    {
      if(this.totalTours[i].popular)
      {
          this.popularTours.push(this.totalTours[i]);
      }
    }
    this.maxRight = -(this.popularTours.length-1)*320;
  }

 getDomesticTours()
 {
   this.domesticTours=[];
    for(var i=0;i<this.totalTours.length;i++)
    {
      if(this.totalTours[i].catName=="Domestic")
      {
          this.domesticTours.push(this.totalTours[i]);
      }
    }
    this.domMaxRight = -(this.domesticTours.length-1)*320;
 }

 getInternational()
 {
   this.internationalTours=[];
   for(var i=0;i<this.totalTours.length;i++)
   {
     if(this.totalTours[i].catName=="International")
     {
       this.internationalTours.push(this.totalTours[i]);
     }
   }
   this.intMaxRight = -(this.internationalTours.length-1)*320;
 }

  goToTour(id) {
    this.router.navigate(['tour',id], {
    });
  }

  getUnique(array) {
    var uniqueArray = [];

    // Loop through array values
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  findTour() {
    console.log(this.minValue, this.cityS, this.daysS, this.maxValue);
    var filter1 = [];
    if (this.cityS != "") {
      for (var i = 0; i < this.totalTours.length; i++) {
        if (this.totalTours[i].destName == this.cityS) {
          filter1.push(this.totalTours[i]);
        }

      }

      
      console.log('filtr1' + filter1);
      let filter2 = [];
      for (var i = 0; i < filter1.length; i++) {
        let cost = parseInt(filter1[i].cost);
        if (cost > this.minValue && cost < this.maxValue) {
          filter2.push(filter1[i]);
        }
      }
      this.filteredTours.splice(0, this.filteredTours.length)
      this.filteredTours = filter2;
    }

    
  }


  translateright()
  {
    const myEl = document.getElementById("transform");
    let currentX = window.getComputedStyle(myEl).transform.split(',')[4];
    console.log(currentX);
    if( parseInt(currentX)-this.maxRight  < 320)
    {
      var t =parseInt(currentX)-1;
    }
    else
    {
      var t = parseInt(currentX) - 320;
    }
      if(t>this.maxRight)
      {
        myEl.style.transform = "translateX("+t+"px)";
      }
    
  }

  translateLeft()
  {
    const myEl = document.getElementById("transform");
    let currentX = window.getComputedStyle(myEl).transform.split(',')[4];
    console.log(currentX);
    if(parseInt(currentX) < 320 && parseInt(currentX)>0)
    {
        var t = 320 - parseInt(currentX);
    }
    else
    {
      var t = parseInt(currentX) + 320;
    }
    if(t != 320)
    {
      myEl.style.transform = "translateX("+t+"px)";
    }


}

  domesticLeft()
  {
    const myEl = document.getElementById("transform2");
    let currentX = window.getComputedStyle(myEl).transform.split(',')[4];
    console.log(currentX);
    if(parseInt(currentX) < 320 && parseInt(currentX)>0)
    {
        var t = 320 - parseInt(currentX);
    }
    else
    {
      var t = parseInt(currentX) + 320;
    }
    if(t != 320)
    {
      myEl.style.transform = "translateX("+t+"px)";
    }
  }

  domesticRight()
  {
    const myEl = document.getElementById("transform2");
    let currentX = window.getComputedStyle(myEl).transform.split(',')[4];
    console.log(currentX);
    if( parseInt(currentX)-this.maxRight  < 320)
    {
      var t =parseInt(currentX)-1;
    }
    else
    {
      var t = parseInt(currentX) - 320;
    }
      if(t>this.domMaxRight)
      {
        myEl.style.transform = "translateX("+t+"px)";
      }
  }

  internationalLeft()
  {
    const myEl = document.getElementById("transform3");
    let currentX = window.getComputedStyle(myEl).transform.split(',')[4];
    console.log(currentX);
    if(parseInt(currentX) < 320 && parseInt(currentX)>0)
    {
        var t = 320 - parseInt(currentX);
    }
    else
    {
      var t = parseInt(currentX) + 320;
    }
    if(t != 320)
    {
      myEl.style.transform = "translateX("+t+"px)";
    }
  }

  internationalRight()
  {
    const myEl = document.getElementById("transform3");
    let currentX = window.getComputedStyle(myEl).transform.split(',')[4];
    console.log(currentX);
    if( parseInt(currentX)-this.maxRight  < 320)
    {
      var t =parseInt(currentX)-1;
    }
    else
    {
      var t = parseInt(currentX) - 320;
    }
      if(t>this.intMaxRight)
      {
        myEl.style.transform = "translateX("+t+"px)";
      }
      
  }

  formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

submitEnquiry()
{
  document.getElementById("loading").style.display="block";
  console.log(this.enquiryForm);
  this.tours.checkUser("wayzook/userenquiry/add",this.enquiryForm).subscribe(response=>{
    console.log(response);
    this.enquiryForm = {
      destination:'',
      departureCity:'',
      departureDate:'',
      type:'',
      contact:'+91-',
      name:'',
      email:''
    };
    document.getElementById("loading").style.display="none";
    if(response.msg)
    {
      var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
  })
}

selectEvent(item) {
  // do something with selected item
  console.log(item);
  this.router.navigate(['searchResult',item.name]);
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