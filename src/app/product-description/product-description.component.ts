import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../service/tours.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private tours:ToursService,
    public ngxSmartModalService: NgxSmartModalService) { }
  tourId;
  tourInfo;

  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.tourId = queryParams.get("id");
    })
    console.log(this.tourId);


    this.tours.getTours('wayzook/tours/findById?id="'+this.tourId+'"').subscribe(Response=>
      {
          this.tourInfo = Response;
          console.log(this.tourInfo);
      });
  }

  signup()
  {
    this.ngxSmartModalService.closeAll();
    this.ngxSmartModalService.open("myModal2");
  }

}
