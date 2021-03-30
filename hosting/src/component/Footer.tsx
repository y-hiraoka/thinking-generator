import React from "react";
import { createStyles, makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles(
  createStyles({
    footer: {
      width: "100%",
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: "center",
    },
  }),
);

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <p>
        <Link href="https://twitter.com/stin_factory">stin_factory</Link>
      </p>
    </div>
  );
};
