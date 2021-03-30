import React from "react";
import { makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import { GlobalStateContainer } from "../state/GlobalState";
import { Subscribe } from "unstated";
import firebase from "../firebase";

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
  }),
);

export const TextFieldArea = () => {
  const classes = useStyles();
  const {
    name,
    handleNameChange,
    tweet,
    handleTweetChange,
    reflectGlobalName,
    reflectGlobalTweet,
  } = useTextFieldAreaState();

  return (
    <Subscribe to={[GlobalStateContainer]}>
      {(container: GlobalStateContainer) => (
        <div className={classes.textFieldArea}>
          <TextField
            label="なまえ"
            value={name}
            className={classes.textField}
            margin="normal"
            onChange={handleNameChange}
            onBlur={reflectGlobalName(container)}
          />
          <TextField
            label="ツイート"
            value={tweet}
            multiline
            className={classes.textField}
            margin="normal"
            onChange={handleTweetChange}
            onBlur={reflectGlobalTweet(container)}
          />
        </div>
      )}
    </Subscribe>
  );
};

const useTextFieldAreaState = () => {
  const [name, setName] = React.useState("");
  const [tweet, setTweet] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTweetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(event.target.value);
  };

  const reflectGlobalName = (container: GlobalStateContainer) => async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.value !== "") {
      await container.setUserName(name);
    } else {
      const currentUser = firebase.auth().currentUser;
      if (currentUser && currentUser.displayName) {
        await container.setUserName(currentUser.displayName);
      } else {
        await container.setUserName(event.target.value);
      }
    }
  };

  const reflectGlobalTweet = (container: GlobalStateContainer) => async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    await container.setTweetText(tweet);
  };

  return {
    name,
    handleNameChange,
    tweet,
    handleTweetChange,
    reflectGlobalName,
    reflectGlobalTweet,
  };
};
