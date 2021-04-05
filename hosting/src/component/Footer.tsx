import { Link } from "@material-ui/core";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <Link href="https://twitter.com/stin_factory">stin_factory</Link>
    </div>
  );
};
