import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DomesticComponent } from './tourPackages/domestic/domestic.component';
import { HomeComponent } from './home/home.component';
import { NgxCarouselModule } from 'ngx-carousel';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import 'hammerjs';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'wayzook', component: LandingPageComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tour', component: ProductDescriptionComponent },
  { path: 'domesticTour', component: DomesticComponent },
  { path: '',
    redirectTo: 'wayzook',
    pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AboutUsComponent,
    DomesticComponent,
    HomeComponent,
    ProductDescriptionComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false,scrollPositionRestoration: 'enabled' } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxCarouselModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
