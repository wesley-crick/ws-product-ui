import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Event, EventResponse } from "../objects/Event";
import { Stat, StatResponse } from "../objects/Stat";
import { POI } from "../objects/POI";

@Injectable({
	providedIn: 'root'
})
export class AppService {

	constructor(private http: HttpClient) {}

	/**
	 * Make a call to the route of the API to make sure it works.
	 */
	async testAPI() {

		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			"x-api-key": environment.apikey
		});

		let options = {
			headers: headers,
			withCredentials: true
		}

		try {
			await this.http.get(environment.url, options).toPromise();
		} catch (e) {
			console.log(e);
			
		}
	}

	async getEventsHourly(): Promise<Event[]> {

		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			"x-api-key": environment.apikey
		});

		let options = {
			headers: headers,
			withCredentials: true
		}

		let eventResponses: EventResponse[] = [];
		try {
			eventResponses = await this.http.get<EventResponse[]>(environment.url + "events/hourly", options).toPromise();
		} catch (e) {
			throw this.handleError(e);
		}

		return Event.fromJsonArray(eventResponses);
	}

	async getEventsDaily(): Promise<Event[]> {

		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			"x-api-key": environment.apikey
		});

		let options = {
			headers: headers,
			withCredentials: true
		}

		let eventResponses: EventResponse[] = [];
		try {
			eventResponses = await this.http.get<EventResponse[]>(environment.url + "events/daily", options).toPromise();
		} catch (e) {
			throw this.handleError(e);
		}

		return Event.fromJsonArray(eventResponses);
	}

	async getStatsHourly(): Promise<Stat[]> {

		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			"x-api-key": environment.apikey
		});

		let options = {
			headers: headers,
			withCredentials: true
		}

		let sr: StatResponse[] = [];
		try {
			sr = await this.http.get<StatResponse[]>(environment.url + "stats/hourly", options).toPromise();
		} catch (e) {
			throw this.handleError(e);
		}

		return Stat.fromJsonArray(sr);
	}
	
	async getStatsDaily(): Promise<Stat[]> {

		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			"x-api-key": environment.apikey
		});

		let options = {
			headers: headers,
			withCredentials: true
		}

		let sr: StatResponse[] = [];
		try {
			sr = await this.http.get<StatResponse[]>(environment.url + "stats/daily", options).toPromise();
		} catch (e) {
			throw this.handleError(e);
		}

		return Stat.fromJsonArray(sr);
	}

	async getPOIs(): Promise<POI[]> {
		let headers: HttpHeaders = new HttpHeaders({
			'Content-Type': 'application/json; charset=utf-8',
			"x-api-key": environment.apikey
		});

		let options = {
			headers: headers,
			withCredentials: true
		}

		try {
			return await this.http.get<POI[]>(environment.url + "poi", options).toPromise();
		} catch (e) {
			throw this.handleError(e);
		}
	}

	private handleError(e: any): string {
		if ( e instanceof HttpErrorResponse ) {
			let httpError: HttpErrorResponse = e;
			switch(e.status) {
				case 429:
					return "Too many request. Please try again later.";
				default:
					console.log(e);
					return "Server error. Please try again later.";
			}
		}
		console.log(e);
		return "Unknown error occured. Please try again later.";
	}
}