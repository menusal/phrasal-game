import { MAX_SCORE } from "../config";
import Counter from "./Counter";

export default function Timer({
    time,
    timeFrom,
  }: {
    time: number;
    timeFrom: number;
  }) {
    const points = Math.floor(MAX_SCORE / time) || 0;
    const pointsFrom = Math.floor(MAX_SCORE / timeFrom) || 0;
  
    return (
      <Counter
        from={isFinite(pointsFrom) ? pointsFrom : 0}
        to={isFinite(points) ? points : 0}
        duration={1}
        variant="h5"
      />
    );
  }