import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-options",
	templateUrl: "./options.component.html",
	styleUrls: ["./options.component.css"],
})
export class OptionsComponent {
	@Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();
	@Output() plusEvent: EventEmitter<number> = new EventEmitter();
	@Output() minusEvent: EventEmitter<number> = new EventEmitter();

	speed = 100;
	state = true;

	startStop() {
		this.toggleEvent.emit(true);
	}

	minus(n: number) {
		this.minusEvent.emit(n);
	}

	plus(n: number) {
		this.plusEvent.emit(n);
	}
}
