import { Component, OnInit } from '@angular/core';
import { ToursService } from '../service/tours.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private tours: ToursService,
    private route:ActivatedRoute) { }
    tourName;

  ngOnInit() {

    this.route.queryParamMap.subscribe(queryParams => {
      this.tourName = queryParams.get("tourName");
    })

    this.tours.getTours('wayzook/tours/findByName?name='+this.tourName).subscribe(Response=>{
      console.log(Response);
    })
  }

}
