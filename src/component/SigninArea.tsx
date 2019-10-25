import React from "react";
import { Avatar, Button, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Subscribe } from "unstated";
import { UserContainer } from "../state/UserState";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		signinArea: {
			paddingTop: 20,
			paddingBottom: 20,
			textAlign: "center",
		},
		avatar: {
			margin: "auto",
			marginBottom: 20,
		}
	}));

export function SigninArea() {
	const classes = useStyles();

	return (
		<Subscribe to={[UserContainer]}>
			{(container: UserContainer) => (
				<div className={classes.signinArea}>
					{container.state.user ?
						<React.Fragment>
							<Avatar
								sizes="100"
								className={classes.avatar}
								alt="Avatar Icon"
								src={container.state.user.photoURL
									? container.state.user.photoURL
									: undefined} />
							<Button
								onClick={container.logout}
								variant="outlined">
								Logout
							</Button>
						</React.Fragment>
						:
						<Button
							onClick={container.login}
							variant="outlined">
							Login
						</Button>
					}
				</div>
			)}
		</Subscribe>
	);
}
