import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ParkingComponent } from './parking/parking.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ContactComponent } from './contact/contact.component';
import { UserComponent } from './user/user.component';
import { ReportComponent } from './report/report.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ParkingComponent,
    AboutComponent,
    AdminComponent,
    ContactComponent,
    UserComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule, 
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
