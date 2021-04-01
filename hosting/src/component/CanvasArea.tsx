import { makeStyles, createStyles } from "@material-ui/core";
import { useGeneratorContainer } from "../state/generator";

const useStyles = makeStyles(theme =>
  createStyles({
    canvas: {
      width: "100%",
      border: `1px solid ${theme.palette.grey[400]}`,
      borderRadius: "6px",
    },
  }),
);

const CanvasWidth = 870;
const CanvasHeight = 456;

export const CanvasArea = () => {
  const classes = useStyles();
  const canvasRef = useGeneratorContainer(c => c.canvasRef);

  return (
    <canvas
      className={classes.canvas}
      width={CanvasWidth}
      height={CanvasHeight}
      ref={canvasRef}
    />
  );
};
