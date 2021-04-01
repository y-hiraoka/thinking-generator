import { createStyles, makeStyles, Link } from "@material-ui/core";

const useStyles = makeStyles(
  createStyles({
    footer: {
      width: "100%",
      textAlign: "center",
    },
  }),
);

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      <Link href="https://twitter.com/stin_factory">stin_factory</Link>
    </div>
  );
};
