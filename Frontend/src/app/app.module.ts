import { NgModule } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
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
import { ReportComponent } from './report/report.component';
import { SafePipe } from './safe.pipe';
import { HistoricalChartComponent } from './historical-chart/historical-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ChallanComponent } from './challan/challan.component';
import { RegisterComponent } from './user-register/register.component'; 
import { LoginComponent } from './user-login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

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
    ReportComponent,
    PaymentComponent,
    SafePipe,
    HistoricalChartComponent,
    TransactionHistoryComponent,
    ChallanComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    FormsModule // FormsModule for template-driven forms, essential for ngModel
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()) // Setting up HttpClient with fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
