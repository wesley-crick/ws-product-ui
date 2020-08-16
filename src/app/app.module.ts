import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component/app.component';
import { EventsChartComponent } from './events-chart/events-chart.component';
import { StatsChartComponent } from './stats-chart/stats-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsChartComponent,
    StatsChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
