import { Grid, GridProps } from "@mui/material";

const LayoutWrapper: React.FC<
  {
    children: React.ReactNode;
  } & GridProps
> = ({ children, sx, ...props }) => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        maxWidth: "768px", // iPad width
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--primary-white)",
        margin: "0 auto",
        paddingTop: "4rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        overflow: "hidden",
        ...sx, // merge any custom styles passed
      }}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default LayoutWrapper;
