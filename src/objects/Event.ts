import {Moment} from "moment";
import * as moment from 'moment';
import { ChartData } from "./ChartData";

export class Event {
	date: Moment;
	events: string;
	hour?: number;

	constructor(json: EventResponse) {
		this.date = moment(json.date);
		this.events = json.events;
		this.hour = json.hour;

		// If an hour exists, set that in the date
		if ( this.hour ) {
			this.date.set("hour", this.hour);
		}
	}

	static fromJsonArray(arr: EventResponse[]): Event[] {
		return arr.map<Event>( er => new Event(er) );
	}

	static convertArrayToChart(arr: Event[]): ChartData {
		const data: ChartData = new ChartData();

		arr.forEach( (e) => {
			data.yAxis.push(e.events);
			if ( e.hour ) {
				data.xAxis.push(e.date.format("MMM DD, YYYY hh:00A"));
			} else {
				data.xAxis.push(e.date.format("MMM DD, YYYY"));
			}
			
		} );

		return data;
	}
}

/**
 * Response from the server for /events endpoints
 */
export class EventResponse {
	date: string;
	events: string;
	hour?: number;
}