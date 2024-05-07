import { Point } from "./Point";


export default class Edge {
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

  equals = (other: Edge): boolean => {
    if (this.start.equals(other.start) && this.end.equals(other.end)) return true;
    if (this.start.equals(other.end) && this.end.equals(other.start)) return true;
    return false;
  }
  clone = (): Edge => {
    return new Edge(this.start, this.end, this.controlPoint);
  }
}