export class ChartData {
	xAxis: string[];
	data: string[][];
	names?: string[];	// A name for the data set

	constructor() {
		this.xAxis = [];
		this.data = [];
	}
}