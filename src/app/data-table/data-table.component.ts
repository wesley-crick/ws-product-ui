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

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    $.fn['dataTable'].ext.search.push((settings, data, dataIndex) => {
      const searchText: string = $("input[type='search']").val().toString().toLowerCase().trim();

      // If found in the search, highlight the row
      if (this.dataTableItems[dataIndex].name.toLowerCase().indexOf(searchText) > -1 && searchText != "") {
        this.dataTableItems[dataIndex].isHighlighted = true;
      } else {
        this.dataTableItems[dataIndex].isHighlighted = false;
      }

      // Always returns true so all data is visible
      return true;
    });

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

    this.dataTableItems = DataTableItem.buildDataTableItems(stats, poi);

    // Render the table
    this.dtTrigger.next();
  }

}
