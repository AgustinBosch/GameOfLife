import { Node } from "./node.model";
export class Grid {
	private _gird: Node[][];
	private _nodes_x: number;
	private _nodes_y: number;
	private _run: boolean = true;
	private _speed: number = 1;

	constructor(nodes_x: number, nodes_y: number) {
		this._nodes_x = nodes_x;
		this._nodes_y = nodes_y;
		this._gird = this._init();
		this.getAllNeighbors();
	}

	get nodes(): Node[][] {
		return this._gird;
	}

	private _init(): Node[][] {
		let g: Node[][] = [];
		for (let i = 0; i < this._nodes_y; i++) {
			g[i] = [];
			for (let j = 0; j < this._nodes_x; j++) {
				g[i][j] = new Node(j, i, false);
			}
		}
		return g;
	}

	private getAllNeighbors(): void {
		for (let i = 0; i < this._gird.length; i++) {
			for (let j = 0; j < this._gird[i].length; j++) {
				this._gird[i][j].neightbors = this.neighborsOf(
					this._gird[i][j]
				);
			}
		}
	}

	private delay(ms: number): Promise<any> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public async start(): Promise<void> {
		while (this._run) {
			this.nextState();
			await this.delay(this._speed);
		}
	}

	public toggleRun(): boolean {
		if (this._run) {
			this._run = false;
		} else if (!this._run) {
			this._run = true;
			this.start();
		}
		return this._run;
	}

	minus(n: number): number {
		if (this._speed > n) {
			this._speed -= n;
		} else {
			this._speed = 10;
		}
		return this._speed;
	}
	plus(n: number): number {
		this._speed += n;
		return this._speed;
	}

	public makeArrow(): void {
		this._gird[0][1].toggle();
		this._gird[1][2].toggle();
		this._gird[2][0].toggle();
		this._gird[2][1].toggle();
		this._gird[2][2].toggle();
	}

	private allChanges(): Node[] {
		const changes = [];
		let n;
		for (let i = 0; i < this._gird.length; i++) {
			for (let j = 0; j < this._gird[i].length; j++) {
				n = this._gird[i][j];
				if (n.hasToChange()) changes.push(n);
			}
		}
		return changes;
	}

	private nextState(): void {
		this.allChanges().forEach((n) => n.toggle());
	}

	private neighborsOf(node: Node): Node[] {
		const n: Node[] = [];
		const { x, y } = node;

		const rows = this._gird.length;
		const cols = this._gird[0].length;

		const mnY = (y - 1 + rows) % rows;
		const mnX = (x - 1 + cols) % cols;
		const mxY = (y + 1) % rows;
		const mxX = (x + 1) % cols;

		n.push(this._gird[mnY][mnX]);
		n.push(this._gird[mnY][x]);
		n.push(this._gird[mnY][mxX]);

		n.push(this._gird[y][mnX]);
		n.push(this._gird[y][mxX]);

		n.push(this._gird[mxY][mnX]);
		n.push(this._gird[mxY][x]);
		n.push(this._gird[mxY][mxX]);
		return n;
	}

	private neighborsAlive(node: Node): number {
		const { x, y } = node;
		const rows = this._gird.length;
		const cols = this._gird[0].length;
		const mnY = (y - 1 + rows) % rows;
		const mnX = (x - 1 + cols) % cols;
		const mxY = (y + 1) % rows;
		const mxX = (x + 1) % cols;
		let nAlive = 0;
		if (this._gird[mnY][mnX].isLive) ++nAlive;
		if (this._gird[mnY][x].isLive) ++nAlive;
		if (this._gird[mnY][mxX].isLive) ++nAlive;
		if (this._gird[y][mnX].isLive) ++nAlive;
		if (this._gird[y][mxX].isLive) ++nAlive;
		if (this._gird[mxY][mnX].isLive) ++nAlive;
		if (this._gird[mxY][x].isLive) ++nAlive;
		if (this._gird[mxY][mxX].isLive) ++nAlive;
		return nAlive;
	}

	toString(): string {
		return this._gird.join("\n");
	}
}
