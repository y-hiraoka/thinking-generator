import { GetStaticProps } from "next";
import { Button } from "@material-ui/core";
import { Redirect } from "../component/Redirect";
import { signIn, useUser } from "../state/user";
import styles from "./signin.module.css";

const SignIn: React.VFC = () => {
  const user = useUser();

  if (user === undefined) return <div>loading...</div>;

  if (user !== null) return <Redirect to="/" />;

  return (
    <div className={styles.root}>
      <Button onClick={signIn} variant="contained" color="primary">
        Sign in
      </Button>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default SignIn;
