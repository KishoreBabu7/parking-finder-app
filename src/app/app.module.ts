import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { from } from 'rxjs';
import { ChallanComponent } from './challan/challan.component';
import { ParkingService } from './services/parking.service';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component'; 

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
    ReportComponent,
    ChallanComponent,
    PaymentComponent,
    TransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule // Add FormsModule here
  ],
  providers: [
    [ParkingService],
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
