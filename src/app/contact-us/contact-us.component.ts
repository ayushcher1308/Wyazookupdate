import { Component, OnInit } from '@angular/core';
import { ToursService } from '../service/tours.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private tours:ToursService,
    private fb:FormBuilder) { }
    enquiryForm;

  ngOnInit() {
    this.enquiryForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      fname:['',Validators.required],
      lname:['',Validators.required],
      desc:['',Validators.required]
    })
  }

  enquire()
  {
    document.getElementById("loading").style.display="block";
    let f = this.enquiryForm.value;
    console.log(this.enquiryForm.valid)
    let header={
      name:f.fname+f.lname,
      contact:f.contact,
      email:f.email,
      desc:f.desc
    };
    this.tours.checkUser("wayzook/userenquiry/add",header).subscribe(Response=>
      {
        console.log(Response);
        this.enquiryForm.reset();
        document.getElementById("loading").style.display="none";
        
        this.snackBar();
      })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  snackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }


}
