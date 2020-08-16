import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Event } from "../../objects/Event";

import { EChartOption } from "echarts";

import {Moment} from "moment";
import * as moment from 'moment';
import { ChartData } from 'src/objects/ChartData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  eventsDailyChartOptions: EChartOption;
  eventsHourlyChartOptions: EChartOption;

  constructor(private service: AppService){}

  ngOnInit() {
    this.getEventsDaily();
    this.getEventsHourly();
  }

  async getEventsDaily() {
    let events: Event[];
    try {
      events = await this.service.getEventsDaily();
    } catch(e) {
      // {TODO} Error logic
      return;
    }

    const data: ChartData = Event.convertArrayToChart(events);

    this.eventsDailyChartOptions = {
      xAxis: {  // Labels for x axis
        data: data.xAxis,
      },
      yAxis: {},
      series: [
        {
          data: data.yAxis,
          type: "bar"
        }
      ],
      tooltip: {},
      title: {
        text: "Events Daily"
      }
    };
  }

  async getEventsHourly() {
    let events: Event[];
    try {
      events = await this.service.getEventsHourly();
    } catch(e) {
      // {TODO} Error logic
      return;
    }

    const data: ChartData = Event.convertArrayToChart(events);

    this.eventsHourlyChartOptions = {
      xAxis: {  // Labels for x axis
        data: data.xAxis,
      },
      yAxis: {},
      series: [
        {
          data: data.yAxis,
          type: "bar"
        }
      ],
      tooltip: {},
      title: {
        text: "Events Hourly"
      },
      dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'empty',
        },
      ]
    };
  }

}
