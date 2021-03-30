import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Title } from "./component/Title";
import { SigninArea } from "./component/SigninArea";
import { Provider } from "unstated";
import { CanvasArea } from "./component/CanvasArea";
import { TweetButtonArea } from "./component/TweetButtonArea";
import { TextFieldArea } from "./component/TextFieldArea";
import { Footer } from "./component/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      margin: "auto",
      maxWidth: 600,
      minHeight: "100vh",
      boxShadow: "0 0 5px ",
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Provider>
      <div className={classes.root}>
        <div className={classes.container}>
          <Title />
          <SigninArea />
          <TextFieldArea />
          <CanvasArea />
          <TweetButtonArea />
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default App;
