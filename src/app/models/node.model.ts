export class Node {
	private _x: number;
	private _y: number;
	private _isLive: boolean;
	private _neighbors: Node[] = [];

	constructor(x: number, y: number, isLive: boolean) {
		this._x = x;
		this._y = y;
		this._isLive = isLive;
	}

	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}
	get isLive() {
		return this._isLive;
	}
	set neightbors(neightbors: Node[]) {
		this._neighbors = neightbors;
	}

	public toggle() {
		this._isLive = !this._isLive;
	}

	hasToChange() {
		const nAlive = this.nAlive();
		if (this._isLive) {
			if (nAlive < 2 || nAlive > 3) return true;
		} else {
			if (nAlive === 3) return true;
		}
		return false;
	}

	private nAlive(): number {
		let n = 0;
		this._neighbors.forEach((node) => {
			if (node._isLive) n++;
		});
		return n;
	}

	toString(): string {
		return `(x: ${this._x}, y: ${this._y})`;
	}
}
