import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./state/user";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#00acee", contrastText: "#ffffff" },
  },
});

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
