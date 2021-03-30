import React from "react";
import { Avatar, Button, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Subscribe } from "unstated";
import { GlobalStateContainer } from "../state/GlobalState";

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
      width: 60,
      height: 60,
    },
  }),
);

export function SigninArea() {
  const classes = useStyles();

  return (
    <Subscribe to={[GlobalStateContainer]}>
      {(container: GlobalStateContainer) => (
        <div className={classes.signinArea}>
          {container.state.user ? (
            <React.Fragment>
              <Avatar
                className={classes.avatar}
                alt="Avatar Icon"
                src={container.PhotoUrlbigger}
              />
              <Button onClick={container.logout} variant="outlined">
                Logout
              </Button>
            </React.Fragment>
          ) : (
            <Button onClick={container.login} variant="outlined">
              Login
            </Button>
          )}
        </div>
      )}
    </Subscribe>
  );
}
