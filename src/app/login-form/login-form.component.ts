import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToursService } from '../service/tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private tours:ToursService,
    private router:Router) { }

  LoginForm;
  message;
  loginDone=false;

  ngOnInit() {
    this.LoginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
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
          this.message = "Login Successful !! You are ready to go.";
          this.loginDone = true;
          this.snackBar();
          let route = localStorage.getItem("previousRoute")
          localStorage.removeItem("previousRoute");
          this.router.navigate([route]);
        }
        else{
        this.message = Response.message;
        this.LoginForm.reset();
        this.snackBar();
      }
      });
  }

  snackBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){
       x.className = x.className.replace("show", "");
       }, 3000);
  }

}
