import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Event } from "../../objects/Event";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private service: AppService){}

  ngOnInit() {
    this.getEventsDaily();
  }

  async getEventsDaily() {
    let arr: Event[];
    try {
      arr = await this.service.getEventsDaily();
    } catch(e) {

    }
    console.log(arr[0].date);
  }

}
