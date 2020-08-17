/**
 * The data used when making the charts.
 */
export class ChartData {
	xAxis: string[];	// Labels for the x-axis
	data: string[][];	// Multi dimensional array of data points that go on the graph
	names?: string[];	// A name for the data set

	constructor() {
		this.xAxis = [];
		this.data = [];
	}
}