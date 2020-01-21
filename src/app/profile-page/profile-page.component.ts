import { Component, OnInit } from '@angular/core';
import { ToursService } from '../service/tours.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private tours:ToursService,
    private router:Router) { }
  Users;

  ngOnInit() {
    document.getElementById("loader").style.display = "block";
    let uid = localStorage.getItem("uid");
    this.tours.getTours('wayzook/users/findById?id='+uid).subscribe(Response=>{
        this.Users = Response;
        document.getElementById("loader").style.display = "none";
    })
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
