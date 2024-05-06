import { IPiece, getPath } from "./BrokenGlass";
import Crack from "./Crack";
import { Point } from "./Point";
import SmallShard from "./SmallShard";

export default class BigShard implements IPiece {
  pieces: SmallShard[];
  perimiter: Crack[];
  center: Point;
  constructor(pieces: SmallShard[]) {
    this.pieces = pieces;

    this.perimiter = this.getPerimiter();

    this.center = getCenterOfMass(Array.from(new Set(this.perimiter.map(edge => edge.ends).flat())),
      {
        minX: 0,
        maxX: 1,
        minY: 0,
        maxY: 1
      });
  }

  getPerimiter(): Crack[] {
    // get all edges that only appear once
    const allCracks: Crack[] = this.pieces.map(p => p.edges).flat();
    const sharedEdges: Set<Crack> = new Set();
    const visited: Crack[] = [];
    let perimiter: Crack[] = [];

    allCracks.forEach(edge => {
      if (visited.some(c => c.equals(edge))) {
        sharedEdges.add(edge);
        perimiter = perimiter.filter(c => !c.equals(edge));
      } else {
        visited.push(edge);
        perimiter.push(edge);
      }
    });


    const sortedPerimiter = [];
    let prev = perimiter[0];
    sortedPerimiter.push(prev);
    for (let i = 1; i < perimiter.length; i++) {
      const curr = perimiter.find(edge => edge.start.equals(prev.end));
      if (curr === undefined) {
        throw new Error("Could not find next edge");
      }
      sortedPerimiter.push(curr);
      prev = curr;
    }
    return sortedPerimiter;
  }

  getPath(width: number, height: number): string {
    return getPath(this.perimiter, width, height);
  }
}


function getCenterOfMass(
  points: Point[],
  bounds: {
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
  }): Point {
  let Mx = 0;
  let My = 0;
  let A = 0;
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const x1 = Math.max(bounds.minX, Math.min(bounds.maxX, p1.x));
    const y1 = Math.max(bounds.minY, Math.min(bounds.maxY, p1.y));
    const x2 = Math.max(bounds.minX, Math.min(bounds.maxX, p2.x));
    const y2 = Math.max(bounds.minY, Math.min(bounds.maxY, p2.y));
    const crossProduct = (x1 * y2 - x2 * y1);
    A += crossProduct;
    Mx += (x1 + x2) * crossProduct;
    My += (y1 + y2) * crossProduct;
  }
  A /= 2;
  Mx /= 6 * A;
  My /= 6 * A;
  return new Point(Mx, My);
}