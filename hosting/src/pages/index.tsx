import { SigninArea } from "../component/SigninArea";
import { CanvasArea } from "../component/CanvasArea";
import { TweetButtonArea } from "../component/TweetButtonArea";
import { TextFieldArea } from "../component/TextFieldArea";
import { Footer } from "../component/Footer";
import { GeneratorContainerProvider } from "../state/generator";
import { AuthRequired } from "../component/AuthRequired";
import styles from "./index.module.css";
import { GetStaticProps } from "next";

const Home: React.VFC = () => {
  return (
    <AuthRequired>
      <GeneratorContainerProvider>
        <div className={styles.root}>
          <SigninArea />
          <TextFieldArea />
          <CanvasArea />
          <TweetButtonArea />
          <Footer />
        </div>
      </GeneratorContainerProvider>
    </AuthRequired>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
