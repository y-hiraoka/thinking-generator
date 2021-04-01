import { makeStyles, createStyles } from "@material-ui/core";
import { SigninArea } from "../component/SigninArea";
import { CanvasArea } from "../component/CanvasArea";
import { TweetButtonArea } from "../component/TweetButtonArea";
import { TextFieldArea } from "../component/TextFieldArea";
import { Footer } from "../component/Footer";

const useStyles = makeStyles(
  createStyles({
    root: {
      minHeight: "100%",
      display: "grid",
      gridTemplateRows: "80px auto 1fr auto 80px",
      gap: "30px",
    },
  }),
);

export const Home: React.VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SigninArea />
      <TextFieldArea />
      <CanvasArea />
      <TweetButtonArea />
      <Footer />
    </div>
  );
};
