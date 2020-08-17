import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxEchartsModule } from 'ngx-echarts';
import { DataTablesModule } from 'angular-datatables';


import { AppComponent } from './app.component/app.component';
import { EventsChartComponent } from './events-chart/events-chart.component';
import { StatsChartComponent } from './stats-chart/stats-chart.component';
import { DataTableComponent } from './data-table/data-table.component';
import { GeoComponent } from './geo/geo.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsChartComponent,
    StatsChartComponent,
    DataTableComponent,
    GeoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
