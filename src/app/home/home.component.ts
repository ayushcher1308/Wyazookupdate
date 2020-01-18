import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../service/window-ref.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [WindowRefService]
})
export class HomeComponent implements OnInit {

  constructor(private winRef:WindowRefService) { }

 

  ngOnInit() {
  }

    initPay()
      {
        var options = {
          "key": "rzp_live_iRd4rldb3lCttf",
          "amount":100, // 2000 paise = INR 20
          "name": " Wayzook Holiday Planner Pvt. Ltd.",
          "description": "Manali trip",
         
          "handler": this.paymentResponseHander.bind(this),
          "prefill": {
              "name":  "ayush",
              "email": "ayush@gmail.com",
              "contact": "9898989898",
         
          },
          "notes": {  },
          "theme": {
              "color": "blue"
          }
      };

      let rzp = new this.winRef.nativeWindow.Razorpay(options);
      rzp.open();
      
      }
  
      
      paid()
      {
        console.log()
      }
   
      paymentResponseHander(response) {
        console.log(response);
        }



}
