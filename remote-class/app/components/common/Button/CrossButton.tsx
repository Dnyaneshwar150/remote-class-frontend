import React from "react";
import { Grid} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface CrossButtonProps {
  onClick?: () => void;
}

const CrossButton: React.FC<CrossButtonProps> = ({ onClick }) => {
  return (
    <Grid container height={"4rem"} width={"4rem"} border={"2px solid var(--black)"} borderRadius={"50%"} onClick={onClick} alignContent={"center"} justifyContent={"center"}
    sx={{
      cursor: "pointer",
      transition: "0.3s",
      backgroundColor: "var(--primary-white)",
      boxShadow: "1px 3.5px 1px var(--black), -2px -2px 8px var(--primary-white)",

    }}
    > 
     <CloseIcon sx={{fontSize:"3.5rem"}} />
    </Grid>
  );
};

export default CrossButton;