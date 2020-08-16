import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from "../objects/Event";
import { Stat } from "../objects/Stat";

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

		try {
			return await this.http.get<Event[]>(environment.url + "events/hourly", options).toPromise();
		} catch (e) {
			console.log(e);
		}
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

		try {
			return await this.http.get<Event[]>(environment.url + "events/daily", options).toPromise();
		} catch (e) {
			console.log(e);
		}
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

		try {
			return await this.http.get<Stat[]>(environment.url + "stats/hourly", options).toPromise();
		} catch (e) {
			console.log(e);
		}
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

		try {
			return await this.http.get<Stat[]>(environment.url + "stats/daily", options).toPromise();
		} catch (e) {
			console.log(e);
		}
	}
}