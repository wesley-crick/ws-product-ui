import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
}