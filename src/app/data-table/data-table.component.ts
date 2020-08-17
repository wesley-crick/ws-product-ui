import { Component, OnInit, ViewChild } from '@angular/core';
import { Stat } from 'src/objects/Stat';
import { AppService } from '../app.service';
import { POI } from 'src/objects/POI';
import { DataTableItem } from "../../objects/DataTableItem";
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  dataTableItems: DataTableItem[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  error: string = "";

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
      searching: false
    };

    this.getData();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  /**
   * Get stats hourly and join randomly to POI's. 
   */
  async getData() {
    let stats: Stat[] = [];
    try {
      stats = await this.service.getStatsHourly();
    } catch (e) {
      this.error = e;
      return;
    }

    let poi: POI[] = [];
    try {
      poi = await this.service.getPOIs();
    } catch (e) {
      this.error = e;
      return;
    }

    this.dataTableItems = DataTableItem.buildDataTableItems(stats, poi);

    // Render the table
    this.dtTrigger.next();
  }

  /**
   * Linked to the keyup event of the search box. Will highlight the found rows.
   * 
   * @param evt 
   */
  onSearchKeyUp(evt: KeyboardEvent) {
    let search: string = (evt.target as any).value;
    search = search.toLowerCase().trim();

    this.dataTableItems.forEach( (item) => {
      if ( item.name.toLowerCase().indexOf(search) > -1 && search != "" ) {
        item.isHighlighted = true;
      } else {
        item.isHighlighted = false;
      }
    });
  }

}
