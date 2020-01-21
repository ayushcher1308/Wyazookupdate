import { Directive, ElementRef,Renderer2, AfterViewInit } from '@angular/core';
import { ToursService } from '../service/tours.service';

@Directive({
  selector: '[appLogin]'
})
export class LoginDirective {

  constructor(private elem: ElementRef,
    renderer:Renderer2,
    private tours:ToursService) {
    var disp;
    console.log(this.elem.nativeElement.children);
    if(localStorage.getItem("uid"))
    {
      
        disp = "none";
    }
    else
    {
      disp = "block";
    }
    renderer.setStyle(elem.nativeElement, 'display', disp);
    // elem.nativeElement.inner
 }



}
