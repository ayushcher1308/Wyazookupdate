import { Component, OnInit } from '@angular/core';
import { ToursService } from '../service/tours.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor(private tours: ToursService,
    private route:ActivatedRoute,
    private router:Router) { }
    tourName;
    destAbout;
    totalTours;
    toursInfo;

  ngOnInit() {
    document.getElementById("popular").classList.add("activeFilter");

    this.route.queryParamMap.subscribe(queryParams => {
      this.tourName = queryParams.get("tourName");
    })

    this.tours.getTours('wayzook/tours/getTourbyDestName?name='+this.tourName).subscribe(Response=>{
      console.log(Response);
      this.toursInfo = Response;
      for(var i=0;i<this.toursInfo.length;i++)
      {
        let obj = this.toursInfo[i].destImages;
        console.log(obj[Object.keys(obj)[0]]);
        this.toursInfo[i].imageLink = obj[Object.keys(obj)[0]].image;
      }
      this.totalTours = Response.length;
      this.destAbout = Response[0].destAbout;
      document.getElementById("loading").style.display="none";
    })
  }

  goToTour(id) {
    this.router.navigate(['tour'], {
      queryParams: { 'id': id }
    });
  }

}
