import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from '../service/tours.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit,AfterViewInit  {
  @ViewChild('top') textarea: ElementRef

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('',[Validators.required,Validators.minLength(7)]),
  });

  Register = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
    email:new FormControl(''),
    contact:new FormControl('')
  });

message;

  constructor(private route:ActivatedRoute,
    private tours:ToursService,
    public ngxSmartModalService: NgxSmartModalService) { }
  tourId;
  tourInfo;
  image;
  tourImages = [];
  iternary = [];

  ngAfterViewInit() {
    
    this.textarea.nativeElement.focus();
  }

  ngOnInit() {
    // this.scrollToElement(top);
    this.route.queryParamMap.subscribe(queryParams => {
      this.tourId = queryParams.get("id");
    })
    console.log(this.tourId);


    this.tours.getTours('wayzook/tours/findById?id='+this.tourId).subscribe(Response=>
      {
          this.tourInfo = Response;
          console.log(this.tourInfo);
          let a = Object.keys(this.tourInfo.destImages);
          let it = Object.keys(this.tourInfo.iternary);
          for(let i=0;i<3;i++)
          {
            if(this.tourInfo.destImages[a[i]])
            {
              this.tourImages.push(this.tourInfo.destImages[a[i]]);
            }
          }
          this.image = this.tourImages[0].image;
          console.log(this.tourImages);
          for(let i=0;i<it.length;i++)
          {
              this.iternary.push(this.tourInfo.iternary[it[i]]);
          }
          console.log(this.iternary);
      });
    //   let element = document.getElementsByClassName("nsm-content") as HTMLCollectionOf<HTMLElement>;
    //   console.log(element);
    // element[0].style.background = "#ebebeb";
  }

  signup()
  {
    this.ngxSmartModalService.closeAll();
    this.ngxSmartModalService.open("myModal2");
    let element = document.getElementsByClassName("nsm-content") as HTMLCollectionOf<HTMLElement>;
    console.log(element[0]);
  element[0].style.backgroundColor = "#ebebeb !important"; 
  }

  checkLoginUser()
  {
      console.log(this.LoginForm.value);
      this.tours.checkUser('wayzook/auth/login',this.LoginForm.value).subscribe(Response=>
        {
          console.log(Response);
          this.message = Response.message;
          this.snackBar();
        });
  }

  registerUser()
  {
    this.Register.value.role = "user";
    console.log(this.Register.value);
      this.tours.checkUser('wayzook/auth/signup',this.Register.value).subscribe(Response=>
        {
          console.log(Response);
          this.message = Response.message;
          this.snackBar();
        });
  }


  snackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  setImage(i)
  {
    this.image = this.tourImages[i].image;
  }

}
