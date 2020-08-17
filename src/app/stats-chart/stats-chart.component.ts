import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { AppService } from '../app.service';
import { Stat } from '../../objects/Stat';
import { ChartData } from '../../objects/ChartData';

@Component({
  selector: 'stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.css']
})
export class StatsChartComponent implements OnInit {

  statsDailyChartOptions: EChartOption;
  statsHourlyChartOptions: EChartOption;

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getStatsDaily();
    this.getStatsHourly();
  }

  async getStatsDaily() {
    let stats: Stat[];
    try {
      stats = await this.service.getStatsDaily();
    } catch(e) {
      // {TODO} Error logic
      return;
    }

    const cd: ChartData = Stat.convertArrayToChart(stats);

    const series: EChartOption.Series[] = cd.data.map<EChartOption.Series>(
     (d, index) => {
      return {
        name: cd.names[index],
        data: d,
        type: index == 0 ? "line" : "bar",
        yAxisIndex: index == 0 ? 0 : 1
      }
     }
    );
    
    this.statsDailyChartOptions = {
      legend: {
        data: cd.names
      },
      xAxis: {  // Labels for x axis
        type: "category",
        data: cd.xAxis,
      },
      yAxis: [
        {
          type: "value",
          name: "Impressions"
        },{
          type: "value",
          name: "Clicks / Revenue"
        }
      ],
      series: series,
      tooltip: {},
      title: {
        text: "Daily"
      },
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,
          filterMode: 'empty',
        },
      ]
    };
  }

  async getStatsHourly() {
    let stats: Stat[];
    try {
      stats = await this.service.getStatsHourly();
    } catch(e) {
      // {TODO} Error logic
      return;
    }

    const cd: ChartData = Stat.convertArrayToChart(stats);

    const series: EChartOption.Series[] = cd.data.map<EChartOption.Series>(
     (d, index) => {
      return {
        name: cd.names[index],
        data: d,
        type: index == 0 ? "line" : "bar",
        yAxisIndex: index == 0 ? 0 : 1
      }
     }
    );
    
    this.statsHourlyChartOptions = {
      legend: {
        data: cd.names
      },
      xAxis: {  // Labels for x axis
        type: "category",
        data: cd.xAxis,
      },
      yAxis: [
        {
          type: "value",
          name: "Impressions"
        },{
          type: "value",
          name: "Clicks / Revenue"
        }
      ],
      series: series,
      tooltip: {},
      title: {
        text: "Hourly"
      },
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: 0,
          filterMode: 'empty',
        },
        {
          type: 'slider',
          xAxisIndex: 0,
          filterMode: 'empty',
        },
      ]
    };
  }

}
