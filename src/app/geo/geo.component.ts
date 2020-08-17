import { Component, OnInit } from '@angular/core';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Stat } from 'src/objects/Stat';
import { AppService } from '../app.service';
import { POI } from 'src/objects/POI';
import { DataTableItem } from 'src/objects/DataTableItem';

@Component({
  selector: 'geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getData();
  }

  /**
   * Get stats hourly and join randomly to POI's. 
   */
  async getData() {
    let stats: Stat[] = [];
    try {
      stats = await this.service.getStatsHourly();
    } catch (e) {
      // {TODO} Error handling
      return;
    }

    let poi: POI[] = [];
    try {
      poi = await this.service.getPOIs();
    } catch (e) {
      // {TODO} Error handling
      return;
    }

    const dataTableItems: DataTableItem[] = DataTableItem.buildDataTableItems(stats, poi);

    this.initMap(dataTableItems);
  }

  initMap(dataTableItems: DataTableItem[]) {
    const map: any = new (window as any).google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 46.6426, lng: -89.3871}
    });

    const markers = dataTableItems.map<any>((item) => {
      // Add a bit of randomness to the lat/lon to not have them all in one place
      const latAdd = (Math.random() * 10) / 10000;
      const lonAdd = (Math.random() * 10) / 10000;
      return new (window as any).google.maps.Marker({
        position: {
          lat: item.lat + latAdd,
          lng: item.lon + lonAdd
        },
        label: item.name
      });
    });

    var markerCluster = new (window as any).MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  }

}
