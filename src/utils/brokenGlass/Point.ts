
export function normalize(p: Point): Point {
  const length = Math.sqrt(p.x ** 2 + p.y ** 2)
  return new Point(
    p.x / length,
    p.y / length,
  )
}

export function getNormal(points: Point[]): Point {
  return new Point(
    points[1].y - points[0].y,
    points[0].x - points[1].x
  );
}

export function getMidPoint(points: Point[]): Point {
  return new Point(
    points.reduce((acc, p) => acc + p.x, 0) / points.length,
    points.reduce((acc, p) => acc + p.y, 0) / points.length
  );
}

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  equals = (other: Point): boolean => {
    return this.x === other.x && this.y === other.y;
  }
  clone = (): Point => {
    return new Point(this.x, this.y);
  }
}