import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToursService } from '../service/tours.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.css']
})
export class VisaComponent implements OnInit {

  Enquiry;

  constructor(private fb:FormBuilder,private tours:ToursService) { }

  ngOnInit() {
    this.Enquiry = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      name:['',Validators.required],
      desc:['',Validators.required]
    })
  }

  enquire()
  {
    document.getElementById("loading").style.display="block";
    let header = this.Enquiry.value;
    this.tours.checkUser('wayzook/userenquiry/add',header).subscribe(Response=>{
        console.log(Response);
        document.getElementById("loading").style.display="none";
        this.Enquiry.reset;
        this.snackBar();
    })
  }

  snackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }


}
