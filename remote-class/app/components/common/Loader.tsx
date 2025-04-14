import { Box, CircularProgress } from "@mui/material";


const Loader: React.FC<{color?:string}> = ({ color}) => {
  return (
    <Box display="flex" justifyContent="center" marginTop="2rem">
      <CircularProgress sx={{ color: color ?? "var(--black)" }}  />
    </Box>
  );
};

export default Loader;
