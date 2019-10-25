import React from 'react';
import { makeStyles, createStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles(
	createStyles({
		title: {
			margin: 0,
			padding: 10,
			fontSize: 21,
			textAlign: "center",
			color: "rgba(0, 0, 0, 0.87)",
			["@media (max-width:360px)"]: {
				fontSize: 17,
			}
		}
	}),
);

export const Title = () => {
	const classes = useStyles();
	
	return (
		<Typography className={classes.title}>
			と思う〇〇であったジェネレーター
		</Typography>
	);
}