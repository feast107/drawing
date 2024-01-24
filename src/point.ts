export class Point {
	private _x : number;
	private _y : number;

	constructor(x : number, y : number) {
		this._x = x;
		this._y = y;
	}

	get x() {
		return this._x;
	}

	get y() {
		return this._y;
	}

	set x(value) {
		this._x = value;
	}

	set y(value) {
		this._y = value;
	}

	get isEmpty() {
		return this._x == 0 && this._y == 0;
	}

	distanceTo(x : number, y : number) : number
	distanceTo(another : Point) : number
	distanceTo(arg0 : Point | number, arg1? : number)
	{
		if (arg0 instanceof Point) {
			return this.distanceTo(arg0.x, arg0.y);
		}
		if (arg1 == null) return;
		let xd = this.x - arg0;
		let yd = this.y - arg1;
		return Math.sqrt(xd * xd + yd * yd);
	}

	/**
	 * Translates this Point by the specified amount.
	 * @param dx
	 * @param dy
	 */
	offset(dx : number, dy : number) : void
	/**
	 * Translates this Point by the specified amount.
	 * @param p
	 */
	offset(p : Point) : void
	offset(arg0 : Point | number, arg1? : number) : void
	{
		if (arg0 instanceof Point) {
			return this.offset(arg0.x, arg0.y)
		}
		if (arg1 == null) return;
		this.x += arg0
		this.y += arg1
	}

	toString() {
		return `{{x=${this.x},y=${this.y}}}`
	}
}
