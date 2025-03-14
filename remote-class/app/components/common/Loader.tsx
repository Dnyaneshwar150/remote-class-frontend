import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} marginTop={"2rem"}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;