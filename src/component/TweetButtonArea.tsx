import React from 'react';
import { makeStyles, createStyles, Theme, Button } from "@material-ui/core"
import { Subscribe } from 'unstated';
import TweetIcon from "@material-ui/icons/Twitter";
import { GlobalStateContainer } from '../state/GlobalState';

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

	return (
		<Subscribe to={[GlobalStateContainer]}>
			{(container: GlobalStateContainer) => (
				<div className={classes.buttonArea}>
					<Button
						href={`http://twitter.com/share?url=https://thinking-generator.firebaseapp.com&text=${container.state.tweetText}&via=stin_factory&hashtags=と思うあなたであったジェネレーター`}
						className={classes.tweetButton}
						target="_blank"
						disabled={container.state.user === null}
						onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { }}>
						<TweetIcon />
						<span className={classes.buttonText}>Tweetする！</span>
					</Button>
				</div>
			)}
		</Subscribe>
	)
}