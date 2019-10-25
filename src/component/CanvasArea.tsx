import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import deattaBase from './deattaBase.jpeg';
import { Stage, Layer, Text, Rect, Image as ImageComponent } from "react-konva";
import Konva from "konva";
import { CanvasComponent } from "./CanvasComponent";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		canvasArea: {
			width: "100%",
			padding: "30px 20px",
			textAlign: "center",
		},
		canvas: {
			width: "100%"
		},
	}));

const CanvasWidth = 870;
const CanvasHeight = 456;

export const CanvasArea = () => {
	const classes = useStyles();
	const { userName, updateCanvas } = useCanvasAreaState();

	return (
		<div className={classes.canvasArea}>
			<CanvasComponent
				id="canvas"
				className={classes.canvas}
				width={CanvasWidth}
				height={CanvasHeight}
				updateCanvas={updateCanvas} />
		</div>
	);
}

const useCanvasAreaState = () => {
	const [userName, setUserName] = React.useState("");

	const updateCanvas = (context: CanvasRenderingContext2D) => {
		const image = new Image();
		image.src = deattaBase;

		image.onload = () => {
			console.log(`image size width:${image.width}, height:${image.height}`);
			console.log(`image size width:${context.canvas.width}, height:${context.canvas.height}`);

			context.drawImage(image, 0, 0);
		}
	}

	return {
		userName: userName,
		updateCanvas: updateCanvas,
	}
}