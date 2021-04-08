import { StylesProvider } from "@material-ui/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { Title } from "../component/Title";
import { UserProvider } from "../state/user";
import "../styles/globals.css";
import styles from "./_app.module.css";

const MyApp: React.VFC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>と思う〇〇であったジェネレーター</title>
        <meta
          name="description"
          content="「と思う〇〇であった」という画像をTwitterに投稿するサービスです。"
        />
      </Head>
      <StylesProvider injectFirst>
        <div className={styles.container}>
          <Title />
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </div>
      </StylesProvider>
    </>
  );
};

export default MyApp;
