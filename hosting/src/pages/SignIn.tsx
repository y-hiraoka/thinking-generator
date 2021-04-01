import { Button, createStyles, makeStyles } from "@material-ui/core";
import { Redirect } from "react-router";
import { signIn, useIsAlreadySignedIn } from "../state/user";

const useStyles = makeStyles(
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }),
);

export const SignIn: React.VFC = () => {
  const classes = useStyles();
  const alreadySignedIn = useIsAlreadySignedIn();

  if (alreadySignedIn) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      <Button onClick={signIn} variant="contained" color="primary">
        Sign in
      </Button>
    </div>
  );
};
