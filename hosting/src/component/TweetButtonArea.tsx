import { Button } from "@material-ui/core";
import TweetIcon from "@material-ui/icons/Twitter";
import { useGeneratorContainer } from "../state/generator";
import styles from "./TweetButtonArea.module.css";

export const TweetButtonArea = () => {
  const submitTweet = useGeneratorContainer(c => c.submitTweet);
  const disabled = useGeneratorContainer(
    c => c.inputData.name === "" || c.inputData.tweet === "",
  );

  return (
    <div className={styles.buttonArea}>
      <Button
        onClick={submitTweet}
        className={styles.tweetButton}
        disabled={disabled}>
        <TweetIcon />
        <span className={styles.buttonText}>ツイートする！</span>
      </Button>
    </div>
  );
};
