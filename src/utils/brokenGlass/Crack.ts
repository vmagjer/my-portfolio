import { Point } from "./Point";


export default class Crack {
  ends: Point[];
  controlPoint: Point;

  constructor(start: Point, end: Point, controlPoint: Point) {
    this.ends = [start, end];
    this.controlPoint = controlPoint;
  }

  get start(): Point {
    return this.ends[0];
  }

  get end(): Point {
    return this.ends[1];
  }

  equals = (other: Crack): boolean => {
    return this.start.equals(other.start) && this.end.equals(other.end)
      || this.start.equals(other.end) && this.end.equals(other.start);
  }
  clone = (): Crack => {
    return new Crack(this.start, this.end, this.controlPoint);
  }
}