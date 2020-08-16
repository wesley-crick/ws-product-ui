import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

import { Event } from "../../objects/Event";
import { ChartData } from '../../objects/ChartData';
import { AppService } from '../app.service';

@Component({
  selector: 'events-chart',
  templateUrl: './events-chart.component.html',
  styleUrls: ['./events-chart.component.css']
})
export class EventsChartComponent implements OnInit {

  eventsDailyChartOptions: EChartOption;
  eventsHourlyChartOptions: EChartOption;

  constructor(private service: AppService) { }

  ngOnInit(): void {
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
