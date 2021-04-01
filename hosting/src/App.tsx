import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { Title } from "./component/Title";
import { GeneratorContainerProvider } from "./state/generator";
import { Redirect, Route, Switch } from "react-router";
import { PrivateRoute } from "./component/PrivateRoute";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    container: {
      margin: "auto",
      padding: "10px 30px",
      maxWidth: 600,
      minHeight: "100vh",
      display: "grid",
      gridTemplateRows: "auto 1fr",
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Title />
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <PrivateRoute path="/" exact>
            <GeneratorContainerProvider>
              <Home />
            </GeneratorContainerProvider>
          </PrivateRoute>
          <Route path="/*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
