import { Typography } from "@material-ui/core";
import styles from "./Title.module.css";

export const Title: React.VFC = () => {
  return (
    <Typography className={styles.title} variant="h1">
      と思う〇〇であったジェネレーター
    </Typography>
  );
};
