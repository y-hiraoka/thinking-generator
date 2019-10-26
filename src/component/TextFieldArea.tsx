import React from "react";
import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import { GlobalStateContainer } from "../state/GlobalState";
import { Subscribe } from "unstated";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		textFieldArea: {
			textAlign: "center",
			width: "100%",
			paddingTop: 20,
			paddingBottom: 20,
			paddingLeft: 50,
			paddingRight: 50,
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: "100%",
		},
	}));

export const TextFieldArea = () => {
	const classes = useStyles();

	const inputName = (container: GlobalStateContainer) =>
		async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			await container.setUserName(event.target.value);
		}

	const inputTweet = (container: GlobalStateContainer) =>
		async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			await container.setTweetText(event.target.value);
		}

	return (
		<Subscribe to={[GlobalStateContainer]}>
			{(container: GlobalStateContainer) => (
				<div className={classes.textFieldArea}>
					<TextField
						label="なまえ"
						className={classes.textField}
						margin="normal"
						onBlur={inputName(container)}
					/>
					<TextField
						label="ツイート"
						multiline
						className={classes.textField}
						margin="normal"
						onBlur={inputTweet(container)}
					/>
				</div>
			)}
		</Subscribe>
	);
}