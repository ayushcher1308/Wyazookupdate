import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  price = 1000;
  maxLeft;
  maxRight;

  ngOnInit() {
    this.maxLeft = 0;
    this.maxRight = -9*320;
    document.getElementById("transform").style.width = "800px";
  }

  clickHere()
  {
      console.log("jkljs");
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

}
