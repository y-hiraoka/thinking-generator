import { useGeneratorContainer } from "../state/generator";
import styles from "./CanvasArea.module.css";

const CanvasWidth = 870;
const CanvasHeight = 456;

export const CanvasArea = () => {
  const canvasRef = useGeneratorContainer(c => c.canvasRef);

  return (
    <canvas
      className={styles.canvas}
      width={CanvasWidth}
      height={CanvasHeight}
      ref={canvasRef}
    />
  );
};
