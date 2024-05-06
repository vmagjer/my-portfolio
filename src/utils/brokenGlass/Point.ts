export function getNormal(points: Point[]): Point {
  const normal = {
    x: points[1].y - points[0].y,
    y: points[0].x - points[1].x
  };
  const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
  const normalized = {
    x: normal.x / length,
    y: normal.y / length
  };
  return new Point(normalized.x, normalized.y);
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