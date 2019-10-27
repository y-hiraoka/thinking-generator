import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import deattaBase from './deattaBase.jpeg';
import { CanvasComponent } from "./CanvasComponent";
import { GlobalStateContainer } from "../state/GlobalState";
import { Subscribe } from "unstated";
import { fillTextAutoLine } from "../utils/canvas";

const useStyles = makeStyles(
	createStyles({
		canvasArea: {
			width: "100%",
			padding: "30px 20px",
			textAlign: "center",
		},
		canvas: {
			width: "100%",
			boxShadow: " 5px 10px 20px rgba(0,0,1,0.25)",
		},
	}));

const CanvasWidth = 870;
const CanvasHeight = 456;

export const CanvasArea = () => {
	const classes = useStyles();

	return (
		<Subscribe to={[GlobalStateContainer]}>
			{(container: GlobalStateContainer) => (
				<div className={classes.canvasArea}>
					<CanvasComponent
						id="canvas"
						className={classes.canvas}
						width={CanvasWidth}
						height={CanvasHeight}
						updateCanvas={updateCanvas(container)} />
				</div>
			)}
		</Subscribe>
	);
}

const updateCanvas = (container: GlobalStateContainer) =>
	(context: CanvasRenderingContext2D) => {
		const image = new Image();
		image.src = deattaBase;

		image.onload = () => {
			context.drawImage(image, 0, 0);

			if (!container.state.user) return;
			if (!container.state.user.photoURL) return;

			const iconImage = new Image();
			iconImage.crossOrigin = "Anonymous";
			iconImage.src = container.photoUrl200x200;
			iconImage.onload = () => {
				context.drawImage(iconImage, 135, 210);
			}

			context.font = "40px sans-serif";
			fillTextAutoLine(context,
				`と思う${container.state.userName}であった`,
				375, 240,
				460, 50);
		}
	}
