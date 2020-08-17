import {Moment} from "moment";
import { POI } from './POI';
import { Stat } from './Stat';

export class DataTableItem {
	date: string;
	impressions: number;
	clicks: number;
	revenue: number;
	name: string;
	lat: number;
	lon: number;
	isHighlighted: boolean;

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
				revenue: s.revenue,
				isHighlighted: false
			  }
			}
		);
	}
}