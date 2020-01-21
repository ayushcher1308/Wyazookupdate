import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../Validator/password-validator';
import { ToursService } from '../service/tours.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb:FormBuilder,
    private tours:ToursService) { }

  Register;
  message;

  ngOnInit() {
    this.Register = this.fb.group({
      name: ['', [Validators.required,Validators.minLength(5)] ],
      password:['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]],
      confirmpassword:['',Validators.required],
      email:['', [Validators.required,Validators.email]],
        contact:['', [Validators.required,Validators.pattern(/^[6-9]\d{9}$/)] ]

   }, {
    validator: MustMatch('password', 'confirmpassword')
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
          {
            this.message = Response.msg;
            this.Register.reset();
          }
          document.getElementById("loader").style.display="none";
          this.snackBar();
        });
  }

  snackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
