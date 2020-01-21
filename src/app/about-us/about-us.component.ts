import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
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
