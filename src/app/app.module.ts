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
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SearchResultComponent } from './search-result/search-result.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VisaComponent } from './visa/visa.component';
import { PassportComponent } from './passport/passport.component';
import { BookingComponent } from './booking/booking.component';
import { ProfileDirective } from './directive/profile.directive';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginDirective } from './directive/login.directive';

const appRoutes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'wayzook', component: LandingPageComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tour/:tourId', component: ProductDescriptionComponent },
  { path: 'domesticTour', component: DomesticComponent },
  {path:'searchResult/:tourName',component:SearchResultComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'visa',component:VisaComponent},
  {path:'insurance',component:PassportComponent},
  {path:'profile',component:ProfilePageComponent},
  {path:'register',component:RegistrationComponent},
  {path:'booking/:tour/:pid/:orderId',component:BookingComponent},
  { path: '',
    redirectTo: 'wayzook',
    pathMatch: 'full'
  },
  {path:'**',component:LandingPageComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AboutUsComponent,
    DomesticComponent,
    HomeComponent,
    ProductDescriptionComponent,
    SearchResultComponent,
    FooterComponent,
    ContactUsComponent,
    VisaComponent,
    PassportComponent,
    BookingComponent,
    ProfileDirective,
    ProfilePageComponent,
    LoginFormComponent,
    RegistrationComponent,
    LoginDirective
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
    AutocompleteLibModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
