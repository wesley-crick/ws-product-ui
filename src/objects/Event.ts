import {Moment} from "moment";
import * as moment from 'moment';
import { ChartData } from "./ChartData";

/**
 * Structure for the Event fields. Along with some utility functions.
 */
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

	/**
	 * Create an array of events from the api's response
	 * 
	 * @param arr 
	 */
	static fromJsonArray(arr: EventResponse[]): Event[] {
		return arr.map<Event>( er => new Event(er) );
	}

	/**
	 * Convert an Event Array into something the charts can use.
	 * 
	 * @param arr 
	 */
	static convertArrayToChart(arr: Event[]): ChartData {
		const cd: ChartData = new ChartData();
		const data = [];
		arr.forEach( (e) => {
			data.push(e.events);
			if ( e.hour ) {
				cd.xAxis.push(e.date.format("MMM DD, YYYY hh:00A"));
			} else {
				cd.xAxis.push(e.date.format("MMM DD, YYYY"));
			}
			
		} );

		cd.data = [data];

		return cd;
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