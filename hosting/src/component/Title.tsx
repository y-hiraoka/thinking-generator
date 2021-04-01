import { makeStyles, createStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(
  createStyles({
    title: {
      fontSize: 21,
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(0, 0, 0, 0.87)",
      "@media (max-width:360px)": {
        fontSize: 17,
      },
    },
  }),
);

export const Title: React.VFC = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.title} variant="h1">
      と思う〇〇であったジェネレーター
    </Typography>
  );
};
