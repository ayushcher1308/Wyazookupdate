import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToursService } from '../service/tours.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../Validator/password-validator';
import { WindowRefService } from '../service/window-ref.service';
// import  {Razorpay} from 'razorpay';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
  providers: [WindowRefService]
})
export class ProductDescriptionComponent implements OnInit,AfterViewInit  {


  
message;

  constructor(private route:ActivatedRoute,
    private tours:ToursService,
    public ngxSmartModalService: NgxSmartModalService,
    private fb: FormBuilder,
    private router:Router,
    private winRef:WindowRefService) { }
  tourId;
  tourInfo;
  image;
  tourImages = [];
  iternary = [];
  Register: FormGroup;
  LoginForm: FormGroup;
  applyCoupon:FormGroup;
  inclusion;
  exclusion;
  UserDetail;
  price;
  couponMessage="";
  orderId;

  ngAfterViewInit() {
    
    // this.textarea.nativeElement.focus();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  ngOnInit() {
    // this.scrollToElement(top);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.Register = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(5)] ],
      password:['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]],
      confirmpassword:['',Validators.required],
      email:['', [Validators.required,Validators.email]],
        contact:['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)] ]

   }, {
    validator: MustMatch('password', 'confirmpassword')
});

this.LoginForm = this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',Validators.required]
});

this.applyCoupon = this.fb.group({
  coupon:['',Validators.required],
})
this.tourId = this.route.snapshot.paramMap.get('tourId');
    console.log(this.tourId);


    this.tours.getTours('wayzook/tours/findById?id='+this.tourId).subscribe(Response=>
      {
          this.tourInfo = Response;
          console.log(this.tourInfo);
          
          if(this.tourInfo.inclusion)
          this.inclusion = this.tourInfo.inclusion.split('\n').map((item: string) => item.trim());
          if(this.tourInfo.exclusion)
          this.exclusion = this.tourInfo.exclusion.split('\n').map((item: string) => item.trim());;
          let a = Object.keys(this.tourInfo.destImages);
          for(let i=0;i<3;i++)
          {
            if(this.tourInfo.destImages[a[i]])
            {
              this.tourImages.push(this.tourInfo.destImages[a[i]]);
            }
          }
          this.image = this.tourImages[0].image;
          console.log(this.tourImages);
          if(this.tourInfo.iternary)
          {
            let it = Object.keys(this.tourInfo.iternary);
          for(let i=0;i<it.length;i++)
          {
              this.iternary.push(this.tourInfo.iternary[it[i]]);
              let desc = this.tourInfo.iternary[it[i]].ld.split('\n');
              this.tourInfo.iternary[it[i]].desc = desc;
          }
        }
          console.log(this.iternary);
          this.price = this.tourInfo.cost;
          document.getElementById("loading").style.display="none";
      });
    //   let element = document.getElementsByClassName("nsm-content") as HTMLCollectionOf<HTMLElement>;
    //   console.log(element);
    // element[0].style.background = "#ebebeb";
  }

  signup()
  {
    this.ngxSmartModalService.closeAll();
    this.ngxSmartModalService.open("myModal2");
    (document.getElementsByClassName("nsm-content")[0] as HTMLElement).style.backgroundColor = '#ededed';
  }

  checkLoginUser()
  {
    document.getElementById("loader").style.display="block";
      console.log(this.LoginForm.value);
      
      this.tours.checkUser('wayzook/auth/login',this.LoginForm.value).subscribe(Response=>
        {
          console.log(Response);
          document.getElementById("loader").style.display = "none";
          if(Response.uid)
          {
            localStorage.setItem("uid",Response.uid);
            localStorage.setItem("token",Response.token);
            this.ngxSmartModalService.closeAll();
            this.message = "Login Successful !! Now you can enquire about this amazing trip.";
            this.snackBar();
          }
          else{
          this.message = Response.message;
          this.LoginForm.reset();
          this.snackBar();
        }
        });
  }

  registerUser()
  {
    document.getElementById("loader").style.display="block";
    this.Register.value.role = "user";
    
    console.log(this.Register.value);
      this.tours.checkUser('wayzook/auth/signup',this.Register.value).subscribe(Response=>
        {
          console.log(Response);
          if(Response.message)
          this.message = Response.message;
          if(Response.msg)
          this.message = Response.msg;
          document.getElementById("loader").style.display="none";
          this.ngxSmartModalService.closeAll();
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

  enquireNow()
  {
    let header = {uid:localStorage.getItem("uid"),
                  tourId:this.tourId};
    if(localStorage.getItem("uid"))
    {
      document.getElementById("loading").style.display="block";
      let uid = localStorage.getItem("uid");
        // this.tours.checkUser('wayzook/enquiry/add',header).subscribe(Response=>{
        //   console.log(Response);
        //   this.message = "Your enquiry has been submitted successfully. We will contact you shortly";
   
        // });

        this.tours.getTours('wayzook/users/findById?id='+uid).subscribe(Response=>{
              this.UserDetail={
                name:Response.name,
                contact:Response.contact,
                email:Response.email
              };
              
              this.createOrder();
        //        document.getElementById("loading").style.display="none";
        // this.makePayment();
        })

        
      
    
    }
    else
    {
      this.ngxSmartModalService.open("myModal");
      (document.getElementsByClassName("nsm-content")[0] as HTMLElement).style.backgroundColor = '#ededed'
    }
  }

  paymentResponseHander(response) {
    console.log(response);
    let pid = response.razorpay_payment_id;
    this.router.navigate(['booking',this.tourId,pid,this.orderId]);
    }

    createOrder()
    {
      
      let header = {
        "amount":this.price*100,
        "currency":"INR",
        "tourid":this.tourId,
        "userid":localStorage.getItem("uid")
      }

      console.log(header);
      this.tours.checkUser("wayzook/bookings/orders/createOrder",header).subscribe(Response=>{
        console.log(Response);
        this.orderId = Response.order.id;
        document.getElementById("loading").style.display="none";
        this.makePayment();
      })

    }

  makePayment()
  {
    var options = {
      "key": "rzp_test_zA10L8ub6qSVEi",
      "order_id": this.orderId,
      "amount":this.price*100, // 2000 paise = INR 20
      "name": " Wayzook Holiday Planner Pvt. Ltd.",
      "description": this.tourInfo.destName,
      "payment_capture": 1,
      "handler": this.paymentResponseHander.bind(this),
      "prefill": {
          "name":  this.UserDetail.name,
          "email": this.UserDetail.email,
          "contact": this.UserDetail.contact,
     
      },
      "notes": { "test":"test" },
      "theme": {
          "color": "#f26a3e"
      },
  };

  let rzp = new this.winRef.nativeWindow.Razorpay(options);
  console.log(options);
  rzp.open();

  }  

  coupon()
  {
      var text = this.applyCoupon.value.coupon;
      if(text == this.tourInfo.discountName)
      {
        var discP = parseInt(this.tourInfo.discountPercent)/100;
        var tDisc; 
        if(discP * this.price<this.tourInfo.discountMax)
        {
          tDisc = discP * this.price;
          this.price = this.price - tDisc;
        }
        else
        {
          tDisc = this.tourInfo.discountMax;
          this.price = this.price - tDisc;
        }
        this.couponMessage="** Yaay got an instant discount of ₹"+tDisc;
      }
      else
      {
        this.price = this.tourInfo.cost;
          this.couponMessage = "** Coupon not applicable";
      }
  }

  clearField()
  {
    this.applyCoupon.reset();
    this.price = this.tourInfo.cost;
    this.couponMessage = "";
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
