export class Size {
	private _width : number;
	private _height : number;

	constructor(width : number, height : number) {
		this._width = width;
		this._height = height;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	set width(value) {
		this._width = value;
	}

	set height(value) {
		this._height = value;
	}

	get isEmpty() {
		return this._width == 0 && this._height == 0;
	}

	valueOf() {
		return this.width * this.height;
	}

	private apply(size : Size) {
		this.width = size.width;
		this.height = size.height;
	}

	add(size : Size) : void {
		this.apply(Size.add(this, size))
	}

	ceiling() : void {
		this.apply(Size.ceiling(this))
	}

	subtract(size : Size) : void {
		this.apply(Size.subtract(this, size))
	}

	multiply(multiplier : number) : void {
		this.apply(Size.multiply(this, multiplier));
	}

	static readonly empty : Size;

	static add(sz1 : Size, sz2 : Size) : Size {
		return new Size(sz1.width + sz2.width, sz1.height + sz2.height)
	}

	static ceiling(value : Size) : Size {
		return new Size(Number(value.width.toFixed()), Number(value.height.toFixed()))
	}

	static subtract(sz1 : Size, sz2 : Size) : Size {
		return new Size(sz1.width - sz2.width, sz1.height - sz2.height)
	}

	static round(size : Size) : Size {
		return new Size(Number(size.width.toFixed()), Number(size.height.toFixed()))
	}

	static multiply(size : Size, multiplier : number) : Size {
		return new Size(size.width * multiplier, size.height * multiplier)
	}

	toString() {
		return `{{width=${this.width},height=${this.height}}}`;
	}
}
