import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookingHomeComponent } from './booking-home/booking-home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const appRoutes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'booking', component: BookingHomeComponent },
  { path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    AppComponent,
    BookingHomeComponent,
    LandingPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
