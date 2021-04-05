import { TextField } from "@material-ui/core";
import { useGeneratorContainer } from "../state/generator";
import styles from "./TextFieldArea.module.css";

export const TextFieldArea = () => {
  const dispatch = useGeneratorContainer(c => c.dispatch);
  const userName = useGeneratorContainer(c => c.inputData.name);
  const tweet = useGeneratorContainer(c => c.inputData.tweet);

  return (
    <div>
      <TextField
        label="なまえ"
        value={userName}
        className={styles.textField}
        margin="normal"
        onChange={e => dispatch({ type: "setName", name: e.target.value })}
      />
      <TextField
        label="ツイート"
        value={tweet}
        multiline
        className={styles.textField}
        margin="normal"
        onChange={e => dispatch({ type: "setTweet", tweet: e.target.value })}
      />
    </div>
  );
};
