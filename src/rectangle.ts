import {Point} from "./point";
import {Size} from "./size";

export class Rectangle {
	private _x : number;
	private _y : number;
	private _width : number;
	private _height : number;

	constructor(x : number, y : number, width : number, height : number) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
	}

	get location() {
		return new Point(this.x, this.y);
	}

	set location(value) {
		this.x = value.x
		this.y = value.y
	}

	get size() {
		return new Size(this.width, this.height);
	}

	set size(value) {
		this.width = value.width;
		this.height = value.height;
	}

	get x() {
		return this._x;
	}

	set x(value) {
		this._x = value;
	}

	get y() {
		return this._y;
	}

	set y(value) {
		this._y = value;
	}

	get width() {
		return this._width;
	}

	set width(value) {
		this._width = value;
	}

	get height() {
		return this._height;
	}

	set height(value) {
		this._height = value;
	}

	get left() {
		return this.x;
	}

	set left(value) {
		let right = this.right;
		if (value > right) {
			this._x = right;
			this._width = value - right;
		} else {
			this._width += this._x - value;
			this._x = value;
		}
	}

	get top() {
		return this._y;
	}

	set top(value) {
		let bottom = this.bottom;
		if (value > bottom) {
			this._y = bottom;
			this._height = value - bottom;
		} else {
			this._height += this._y - value;
			this._y = value;
		}
	}

	get right() {
		return this._x + this._width;
	}

	set right(value) {
		if (value < this._x) {
			this._width = this._x - value;
			this._x = value;
		} else {
			this._width = value - this._x;
		}
	}

	get bottom() {
		return this._y + this._height;
	}

	set bottom(value) {
		if (value < this._y) {
			this._height = this._y - value;
			this._y = value;
		} else {
			this._height = value - this._y;
		}
	}


	get leftTop() {
		return new Point(this.left, this.top);
	}

	set leftTop(value) {
		this.left = value.x;
		this.top = value.y;
	}

	get rightBottom() {
		return new Point(this.right, this.bottom);
	}

	set rightBottom(value) {
		this.right = value.x;
		this.bottom = value.y;
	}

	get leftBottom() {
		return new Point(this.left, this.bottom);
	}

	set leftBottom(value) {
		this.left = value.x;
		this.bottom = value.y;
	}

	get rightTop() {
		return new Point(this.right, this.top);
	}

	set rightTop(value) {
		this.right = value.x;
		this.top = value.y;
	}

	get center() {
		return new Point(this._x + this._width / 2, this._y + this._height / 2);
	}

	get isEmpty() {
		return this._height == 0 && this._width == 0 && this._x == 0 && this._y == 0;
	}

	/**
	 * Determines if the specified point is contained within the rectangular region defined by this
	 * @param x
	 * @param y
	 */
	contains(x : number, y : number) : boolean
	/**
	 * Determines if the specified point is contained within the rectangular region defined by this
	 * @param point
	 */
	contains(point : Point) : boolean
	/**
	 * Determines if the specified Rectangle is contained within the rectangular region defined by this
	 * @param rectangle
	 */
	contains(rectangle : Rectangle) : boolean
	contains(arg0 : Rectangle | Point | number, y? : number)
	{
		if (typeof (arg0) == 'number' && y != null) {
			return this.x <= arg0 && arg0 < this.x + this.width && this.y <= y && y < this.y + this.height;
		}
		if (arg0 instanceof Point) {
			return this.contains(arg0.x, arg0.y)
		}
		if (arg0 instanceof Rectangle) {
			return (this.x <= arg0.x) && (arg0.x + arg0.width <= this.x + this.width) &&
			       (this.y <= arg0.y) && (arg0.y + arg0.height <= this.y + this.height);
		}
	}

	/**
	 * Make a Rectangle eroded by the specified amount.
	 * @param width
	 * @param height
	 */
	erode(width : number, height : number) : void
	/**
	 * Make a Rectangle eroded by the specified amount.
	 * @param size
	 */
	erode(size : Size) : void
	erode(arg0 : Size | number, arg1? : number | undefined)
	{
		if (arg0 instanceof Size) {
			return this.erode(arg0.width, arg0.height)
		}
		if (arg1 == null) return
		this.x += arg0;
		this.y += arg1;

		this.width -= 2 * arg0;
		this.height -= 2 * arg1;
		return
	}

	/**
	 * Make a Rectangle inflated by the specified amount.
	 * @param _width
	 * @param _height
	 */
	inflate(_width : number, _height : number) : void
	/**
	 * Make a Rectangle inflated by the specified amount.
	 * @param size
	 */
	inflate(size : Size) : void
	inflate(arg0 : Size | number, arg1? : number | undefined)
	{
		if (arg0 instanceof Size) {
			return this.inflate(arg0.width, arg0.height)
		}
		if (arg1 == null) return
		this.x -= arg0;
		this.y -= arg1;

		this.width += 2 * arg0;
		this.height += 2 * arg1;
		return

	}

	/**
	 * Adjusts the location of this rectangle by the specified amount.
	 * @param x
	 * @param y
	 */
	offset(x : number, y : number) : void
	/**
	 * Adjusts the location of this rectangle by the specified amount.
	 * @param pos
	 */
	offset(pos : Point) : void
	offset(arg0 : Point | number, arg1? : number)
	{
		if (arg0 instanceof Point) {
			return this.offset(arg0.x, arg0.y)
		}
		if (arg1 == null) return
		this.x += arg0;
		this.y += arg1
	}

	/**
	 * Creates a Rectangle that represents the intersection between this Rectangle and rect.
	 * @param rect
	 */
	intersect(rect : Rectangle) {
		const result = Rectangle.intersect(rect, this);

		this.x = result.x;
		this.y = result.y;
		this.width = result.width;
		this.height = result.height;
	}

	get clone() {
		return new Rectangle(this.x, this.y, this.width, this.height);
	}


	/**
	 * Determines if this rectangle intersects with rect.
	 * @param {Rectangle} rect
	 */
	intersectsWith(rect : Rectangle) : boolean {
		return (rect.x < this.x + this.width) && (this.x < rect.x + rect.width) &&
		       (rect.y < this.y + this.height) && (this.y < rect.y + rect.height);
	}

	private static empty = new Rectangle(0, 0, 0, 0);

	static round(rect : Rectangle) {
		return new Rectangle(
			Number(rect.x.toFixed()),
			Number(rect.y.toFixed()),
			Number(rect.width.toFixed()),
			Number(rect.height.toFixed()),
		)
	}

	static inflate(rect : Rectangle, size : Size) : Rectangle {
		const ret = new Rectangle(rect.x, rect.y, rect.width, rect.height)
		ret.inflate(size)
		return ret;
	}

	/// <summary>
	/// Creates a rectangle that represents the intersection between a and b. If there is no intersection, an
	/// empty rectangle is returned.
	/// </summary>
	static intersect(a : Rectangle, b : Rectangle) : Rectangle
	{
		const x1 = Math.max(a.x, b.x);
		const x2 = Math.min(a.x + a.width, b.x + b.width);
		const y1 = Math.max(a.y, b.y);
		const y2 = Math.min(a.y + a.height, b.y + b.height);

		if (x2 >= x1 && y2 >= y1)
		{
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		}

		return Rectangle.empty;
	}

	static union(a : Rectangle, b : Rectangle) {
		const x1 = Math.min(a.x, b.x);
		const x2 = Math.max(a.x + a.width, b.x + b.width);
		const y1 = Math.min(a.y, b.y);
		const y2 = Math.max(a.y + a.height, b.y + b.height);

		return new Rectangle(x1, y1, x2 - x1, y2 - y1);
	}

	toString() {
		return `{{x=${this.x},y=${this.y},width=${this.width},height=${this.height}}}`;
	}
}
