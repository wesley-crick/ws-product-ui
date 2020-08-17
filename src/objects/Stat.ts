import {Moment} from "moment";
import * as moment from 'moment';
import { ChartData } from './ChartData';

export class Stat {
	date: Moment;
	hour?: number;
	impressions: number;
	clicks: number;
	revenue: number;

	constructor(json: StatResponse) {
		this.date = moment(json.date);
		this.hour = json.hour;
		this.impressions = json.impressions;
		this.clicks = json.clicks;
		this.revenue = json.revenue;

		// If an hour exists, set that in the date
		if ( this.hour ) {
			this.date.set("hour", this.hour);
		}
	}

	static fromJsonArray(arr: StatResponse[]): Stat[] {
		return arr.map<Stat>( sr => new Stat(sr) );
	}

	static convertArrayToChart(arr: Stat[]): ChartData {
		const cd: ChartData = new ChartData();

		const impressionsArr = [];
		const clicksArr = [];
		const revenueArr = [];

		arr.forEach( (s) => {
			impressionsArr.push(s.impressions);
			clicksArr.push(s.clicks);
			revenueArr.push(s.revenue);

			if ( s.hour ) {
				cd.xAxis.push(s.date.format("MMM DD, YYYY hh:00A"));
			} else {
				cd.xAxis.push(s.date.format("MMM DD, YYYY"));
			}
			
		} );

		cd.names = ["Impressions", "Clicks", "Revenue"];
		cd.data = [impressionsArr, clicksArr, revenueArr];

		return cd;
	}

}

/**
 * Response from the server for /stats endpoints
 */
export class StatResponse {
	date: string;
	hour?: number;
	impressions: number;
	clicks: number;
	revenue: number;
}