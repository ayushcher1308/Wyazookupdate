import { Directive, ElementRef,Renderer2, AfterViewInit } from '@angular/core';
import { ToursService } from '../service/tours.service';

@Directive({
  selector: '[appProfile]'
})
export class ProfileDirective implements AfterViewInit {

  constructor(private elem: ElementRef,
    renderer:Renderer2,
    private tours:ToursService) {
    var disp;
    console.log(this.elem.nativeElement.children);
    if(localStorage.getItem("uid"))
    {
      
        disp = "block";
    }
    else
    {
      disp = "none";
    }
    renderer.setStyle(elem.nativeElement, 'display', disp);
    // elem.nativeElement.inner
 }

 ngAfterViewInit()
 {
   
  if(localStorage.getItem("uid"))
  {
    let id = localStorage.getItem("uid");
    this.tours.getTours('wayzook/users/findById?id='+id).subscribe(Response=>{
      this.elem.nativeElement.children[0].children[0].innerText = "Hi "+Response.name;
  })
   
} 
 }

}
