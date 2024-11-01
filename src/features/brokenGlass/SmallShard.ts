import { IPiece, getPath } from "./BrokenGlass";
import Edge from "./Crack";

export default class SmallShard implements IPiece {
  edges: Edge[];
  constructor(cracks: Edge[]) {
    this.edges = cracks;
  }

  getPath(width: number, height: number): string {
    return getPath(this.edges, width, height);
  }
}