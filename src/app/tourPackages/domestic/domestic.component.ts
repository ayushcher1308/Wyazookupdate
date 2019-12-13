import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-domestic',
  templateUrl: './domestic.component.html',
  styleUrls: ['./domestic.component.scss']
})
export class DomesticComponent implements OnInit {

  constructor() { }



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

  ngOnInit() {
    
  }

}
