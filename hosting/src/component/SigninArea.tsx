import { Avatar, Button } from "@material-ui/core";
import { signOut, usePhotoURLBigger } from "../state/user";
import styles from "./SigninArea.module.css";

export const SigninArea: React.VFC = () => {
  const photoURL = usePhotoURLBigger();

  return (
    <div className={styles.signinArea}>
      <Avatar className={styles.avatar} alt="Avatar Icon" src={photoURL} />
      <Button onClick={signOut} variant="outlined">
        Logout
      </Button>
    </div>
  );
};
