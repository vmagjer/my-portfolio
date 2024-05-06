import { IPiece, getPath } from "./BrokenGlass";
import Crack from "./Crack";

export default class SmallShard implements IPiece {
  edges: Crack[];
  constructor(cracks: Crack[]) {
    this.edges = cracks;
  }

  getPath(width: number, height: number): string {
    return getPath(this.edges, width, height);
  }
}