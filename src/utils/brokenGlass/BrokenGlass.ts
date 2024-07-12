import BigShard from "./BigShard";
import Edge from "./Crack";
import { Point, getMidPoint, getNormal, normalize } from "./Point";
import SmallShard from "./SmallShard";

export class BrokenGlass {
  pieces: BigShard[];
  viewWidth: number;
  viewHeight: number;
  numberOfPieces: number;
  numSmallPieces: number;

  constructor(viewWidth: number, viewHeight: number, numberOfPieces: number, numSmallPieces: number) {
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.numberOfPieces = numberOfPieces;
    this.numSmallPieces = numSmallPieces;

    this.pieces = this.generatePieces();
  }

  generatePieces(): BigShard[] {
    const numTraverseCracks = this.numSmallPieces - 1;
    const numSmallShards = this.numSmallPieces;
    const numRadialCracks = this.numberOfPieces;
    const outerCircleRadius = Math.sqrt(this.viewWidth ** 2 + this.viewHeight ** 2) / 2;
    const center: Point = new Point(this.viewWidth / 2, this.viewHeight / 2)

    // ################### Crack Glass
    // generate points
    const maxPerturbation = 0.1 * outerCircleRadius;
    const points: Point[][] = [];
    for (let iRad = 0; iRad < numRadialCracks; iRad++) {
      const pointsOnRadialCrack = [];
      const angle = iRad * 2 * Math.PI / numRadialCracks;
      for (let iShard = 1; iShard <= numSmallShards; iShard++) {
        const radialProgress = (iShard / numSmallShards) ** 2;
        const x = center.x + Math.cos(angle) * outerCircleRadius * radialProgress;
        const y = center.y + Math.sin(angle) * outerCircleRadius * radialProgress;
        const newPoint = new Point(x, y);
        const perturbedPoint = perturbPoint(newPoint, maxPerturbation * radialProgress);
        // const boundedPoint = new Point(
        //   Math.max(0, Math.min(this.viewWidth, perturbedPoint.x)),
        //   Math.max(0, Math.min(this.viewHeight, perturbedPoint.y))
        // );
        pointsOnRadialCrack.push(perturbedPoint);
      }
      points.push(pointsOnRadialCrack);
    }
    // care - center point is not included in points

    // RADIAL CRACKS
    const maxRadialOffset = 0.04 * outerCircleRadius;
    const radialCracks: Edge[][] = [];
    for (let iRad = 0; iRad < numRadialCracks; iRad++) {
      const crack: Edge[] = [];
      let start = center.clone();
      for (let iShard = 0; iShard < numSmallShards; iShard++) {
        const end = points[iRad][iShard];
        const radialProgress = ((iShard + 1) / numSmallShards) ** 2;

        const midPoint = getMidPoint([start, end]);
        const normal = normalize(getNormal([start, end]));
        const offset = (Math.random() * maxRadialOffset * 2 - maxRadialOffset) * radialProgress;
        const controlPoint = new Point(
          midPoint.x + normal.x * offset,
          midPoint.y + normal.y * offset
        );

        crack.push(new Edge(start, end, controlPoint));
        start = end.clone();
      }
      radialCracks.push(crack);
    }

    // TRAVERSE CRACKS
    const maxTraverseOffset = 0.1 * outerCircleRadius;
    const traverseCracks: Edge[][] = [];
    for (let iRad = 0; iRad < numRadialCracks; iRad++) {
      const cracks: Edge[] = [];
      for (let iTrv = 0; iTrv < numTraverseCracks; iTrv++) {
        const iRadNext = (iRad + 1) % numRadialCracks;
        const radialProgress = ((iTrv + 1) / numTraverseCracks) ** 2;

        const start = points[iRad][iTrv];
        const end = points[iRadNext][iTrv];

        const midPoint = getMidPoint([start, end]);
        const normal = normalize(getNormal([start, end]));
        // const maxOffset = 10;
        const offset = (Math.random() * maxTraverseOffset * 2) * radialProgress;
        const controlPoint = new Point(
          midPoint.x + normal.x * offset,
          midPoint.y + normal.y * offset
        );

        cracks.push(new Edge(start, end, controlPoint));
      }
      traverseCracks.push(cracks);
    }

    // SMALL SHARDS
    const smallShards: SmallShard[][] = [];
    for (let iRad = 0; iRad < numRadialCracks; iRad++) {
      const smallShardsOnRadialCrack: SmallShard[] = [];
      for (let iShard = 0; iShard < numSmallShards; iShard++) {
        const cracks: Edge[] = [];
        const iRadNext = (iRad + 1) % numRadialCracks;
        const iShardPrev = iShard - 1;
        if (iShard === 0) {
          // center shards consist of 3 cracks
          const crack1 = radialCracks[iRad][iShard].clone();
          const crack2 = traverseCracks[iRad][iShard].clone();
          const crack3 = radialCracks[iRadNext][iShard].clone();
          crack3.ends.reverse();
          cracks.push(crack1);
          cracks.push(crack2);
          cracks.push(crack3);
        } else if (iShard === numSmallShards - 1) {
          const crack1 = radialCracks[iRad][iShard].clone();
          const crack3 = radialCracks[iRadNext][iShard].clone();

          cracks.push(crack1);

          const outermostPoint1 = crack1.end;
          const outermostPoint2 = crack3.end;
          const isEncompassingCorner = outermostPoint1.x - outermostPoint2.x !== 0 && outermostPoint1.y - outermostPoint2.y !== 0;
          const midPoint = getMidPoint([outermostPoint1, outermostPoint2]);
          if (isEncompassingCorner) {
            // if shard encompasses corner, add two straight cracks
            const cornerPoint = new Point(
              midPoint.x > center.x ? this.viewWidth : 0,
              midPoint.y > center.y ? this.viewHeight : 0
            );
            const midPoint1 = getMidPoint([outermostPoint1, cornerPoint]); // todo implement straight crack
            const midPoint2 = getMidPoint([cornerPoint, outermostPoint2]);
            const crack21 = new Edge(outermostPoint1, cornerPoint, midPoint1);
            const crack22 = new Edge(cornerPoint, outermostPoint2, midPoint2);
            cracks.push(crack21);
            cracks.push(crack22);
          } else {
            // otherwise add one straight crack
            const crack2 = new Edge(outermostPoint1, outermostPoint2, midPoint);
            cracks.push(crack2);
          }
          const crack4 = traverseCracks[iRad][iShardPrev].clone();
          crack3.ends.reverse();
          crack4.ends.reverse();
          cracks.push(crack3);
          cracks.push(crack4);
        } else {
          const crack1 = radialCracks[iRad][iShard].clone();
          const crack2 = traverseCracks[iRad][iShard].clone();
          const crack3 = radialCracks[iRadNext][iShard].clone();
          const crack4 = traverseCracks[iRad][iShardPrev].clone();
          crack3.ends.reverse();
          crack4.ends.reverse();
          cracks.push(crack1);
          cracks.push(crack2);
          cracks.push(crack3);
          cracks.push(crack4);
        }
        smallShardsOnRadialCrack.push(new SmallShard(cracks));
      }
      smallShards.push(smallShardsOnRadialCrack);
    }


    // ################### Assign shards to items

    // BIG SHARDS
    const pieces: BigShard[] = [];
    for (let i = 0; i < numRadialCracks; i++) {
      const shard: BigShard = new BigShard(smallShards[i]);
      pieces.push(shard);
    }


    return pieces;
  }

  

}

function perturbPoint(point: Point, maxOffset: number): Point {
  return new Point(
    point.x + Math.random() * maxOffset * 2 - maxOffset,
    point.y + Math.random() * maxOffset * 2 - maxOffset
  );
}
export interface IPiece {
  getPath(width: number, height: number): string;
}

export function getPath(edges: Edge[], width: number = 1, height: number = 1): string {
  const commands = []
  const firstEdge = edges[0];
  const start = firstEdge.start;
  commands.push(`M ${start.x * width} ${start.y * height} `);
  edges.forEach(edge => {
    commands.push(`Q ${edge.controlPoint.x * width} ${edge.controlPoint.y * height} ${edge.end.x * width} ${edge.end.y * height}`);
  })
  return `path("${commands.join('')} z")`
}