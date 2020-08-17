import {Moment} from "moment";
import { POI } from './POI';
import { Stat } from './Stat';

/**
 * The data that goes into the rows of the data table.
 */
export class DataTableItem {
	date: string;			
	impressions: number;
	clicks: number;
	revenue: number;
	name: string;
	lName: string;	//Lower case version of the name. Optimized for searching
	lat: number;
	lon: number;
	isHighlighted: boolean;	// If true it will add the isHighlighted CSS class to the row

	static buildDataTableItems(stats: Stat[], poi: POI[]): DataTableItem[] {
		return stats.map<DataTableItem>(
			(s) => {
			  const index = Math.floor(Math.random() * poi.length);
			  const p: POI = poi[index];
			  return {
				clicks: s.clicks,
				date: s.date.format("MMM DD, YYYY hh:00A"),
				impressions: s.impressions,
				lat: p.lat,
				lon: p.lon,
				name: p.name,
				lName: p.name.toLowerCase(),
				revenue: s.revenue,
				isHighlighted: false
			  }
			}
		);
	}
}