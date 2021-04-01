import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import { useGeneratorContainer } from "../state/generator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textFieldArea: {
      width: "100%",
    },
    textField: {
      width: "100%",
    },
  }),
);

export const TextFieldArea = () => {
  const classes = useStyles();
  const dispatch = useGeneratorContainer(c => c.dispatch);
  const userName = useGeneratorContainer(c => c.inputData.name);
  const tweet = useGeneratorContainer(c => c.inputData.tweet);

  return (
    <div className={classes.textFieldArea}>
      <TextField
        label="なまえ"
        value={userName}
        className={classes.textField}
        margin="normal"
        onChange={e => dispatch({ type: "setName", name: e.target.value })}
      />
      <TextField
        label="ツイート"
        value={tweet}
        multiline
        className={classes.textField}
        margin="normal"
        onChange={e => dispatch({ type: "setTweet", tweet: e.target.value })}
      />
    </div>
  );
};
