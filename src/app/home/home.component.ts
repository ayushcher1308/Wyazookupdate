import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  price = 1000;

  ngOnInit() {
  }

  clickHere()
  {
      console.log("jkljs");
  }

}
