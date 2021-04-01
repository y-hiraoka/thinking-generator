import { Avatar, Button, makeStyles, createStyles } from "@material-ui/core";
import { signOut, usePhotoURLBigger } from "../state/user";

const useStyles = makeStyles(
  createStyles({
    signinArea: {
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

export const SigninArea: React.VFC = () => {
  const classes = useStyles();
  const photoURL = usePhotoURLBigger();

  return (
    <div className={classes.signinArea}>
      <Avatar className={classes.avatar} alt="Avatar Icon" src={photoURL} />
      <Button onClick={signOut} variant="outlined">
        Logout
      </Button>
    </div>
  );
};
