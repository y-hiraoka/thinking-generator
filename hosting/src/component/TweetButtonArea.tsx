import { makeStyles, createStyles, Button } from "@material-ui/core";
import TweetIcon from "@material-ui/icons/Twitter";
import { useGeneratorContainer } from "../state/generator";

const useStyles = makeStyles(
  createStyles({
    buttonArea: {
      width: "100%",
      textAlign: "center",
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
    },
  }),
);

export const TweetButtonArea = () => {
  const classes = useStyles();
  const submitTweet = useGeneratorContainer(c => c.submitTweet);
  const disabled = useGeneratorContainer(
    c => c.inputData.name === "" || c.inputData.tweet === "",
  );

  return (
    <div className={classes.buttonArea}>
      <Button
        onClick={submitTweet}
        className={classes.tweetButton}
        disabled={disabled}>
        <TweetIcon />
        <span className={classes.buttonText}>ツイートする！</span>
      </Button>
    </div>
  );
};
