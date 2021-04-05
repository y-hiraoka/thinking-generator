import { StylesProvider } from "@material-ui/styles";
import { AppProps } from "next/app";
import { Title } from "../component/Title";
import { UserProvider } from "../state/user";
import "../styles/globals.css";
import styles from "./_app.module.css";

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StylesProvider injectFirst>
      <div className={styles.container}>
        <Title />
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </div>
    </StylesProvider>
  );
};

export default MyApp;
