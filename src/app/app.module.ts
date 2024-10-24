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
import { UserComponent } from './user/user.component';
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
    PaymentComponent,
    SafePipe,
    HistoricalChartComponent,
    TransactionHistoryComponent,
    ChallanComponent
    // UserDashboardComponent removed as per your request
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    HttpClientModule,
    AppRoutingModule,
    HighchartsChartModule,
    FormsModule // Keep FormsModule here
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
