import { Component, OnInit, ViewChild } from "@angular/core";
import { Node } from "../models/node.model";
import { Grid } from "./../models/grid.model";
import { OptionsComponent } from "./../options/options.component";

@Component({
	selector: "app-grid",
	templateUrl: "./grid.component.html",
	styleUrls: ["./grid.component.css"],
})
export class GridComponent implements OnInit {
	@ViewChild("options") options!: OptionsComponent;
	grid: Grid;
	margin = 10;
	screenWidth = window.innerWidth - this.margin - 50;
	screenHeight = window.innerHeight - this.margin;
	nodeSize: number = 15;
	gridXSize: number = Math.floor(this.screenWidth / this.nodeSize);
	gridYSize: number = Math.floor(this.screenHeight / this.nodeSize);
	width: number = this.gridXSize * this.nodeSize;
	height: number = this.gridYSize * this.nodeSize;

	constructor() {
		this.grid = new Grid(this.gridXSize, this.gridYSize);
	}

	ngOnInit(): void {
		this.grid.makeArrow();
		this.grid.start();
	}

	toggle() {
		this.options.state = this.grid.toggleRun();
	}

	minus(n: number) {
		this.options.speed = this.grid.minus(n);
	}

	plus(n: number) {
		this.options.speed = this.grid.plus(n);
	}

	async toggleNode(node: Node) {
		node.toggle();
	}
}
