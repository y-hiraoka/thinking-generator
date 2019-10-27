import React from 'react';
import { makeStyles, createStyles, Button } from "@material-ui/core"
import { Subscribe } from 'unstated';
import TweetIcon from "@material-ui/icons/Twitter";
import { GlobalStateContainer } from '../state/GlobalState';
import firebase from "../firebase";

const useStyles = makeStyles(
	createStyles({
		buttonArea: {
			width: "100%",
			paddingTop: 20,
			paddingBottom: 20,
			paddingLeft: 50,
			paddingRight: 50,
			textAlign: "center"
		},
		tweetButton: {
			backgroundColor: "#00acee",
			color: "#fff",
			width: "100%",
			height: 50,
			fontSize: "1.2rem",
			"&:hover": {
				backgroundColor: "#0078a6",
			},
		},
		buttonText: {
			marginLeft: 10,
		}
	})
);

export const TweetButtonArea = () => {
	const classes = useStyles();

	const handleClick = (container: GlobalStateContainer) => async () => {
		const currentUser = firebase.auth().currentUser;
		if (!currentUser) return;

		const storageRef = firebase.storage().ref();
		const createRef = storageRef.child(`ogp-images/${currentUser.uid}.jpg`);
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;

		const imagedata = canvas.toDataURL("image/jpeg").split(",")[1];
		await createRef.putString(imagedata, "base64").then(snapshot => {
			const tweeturl = `http://twitter.com/share`
				+ `?url=${container.ogpUrl}`
				+ `&text=${container.state.tweetText}%0a%0a`

			window.open(tweeturl, "_blank");
		})
	}

	return (
		<Subscribe to={[GlobalStateContainer]}>
			{(container: GlobalStateContainer) => (
				<div className={classes.buttonArea}>
					<Button
						onClick={handleClick(container)}
						className={classes.tweetButton}
						disabled={container.state.user === null}>
						<TweetIcon />
						<span className={classes.buttonText}>ツイートする！</span>
					</Button>
				</div>
			)}
		</Subscribe>
	)
}
