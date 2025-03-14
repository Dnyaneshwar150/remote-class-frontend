import React from "react";
import { Grid} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <Grid container height={"4rem"} width={"4rem"} border={"2px solid var(--black)"} borderRadius={"50%"} onClick={onClick} alignContent={"center"} justifyContent={"center"}
    
    sx={{
      cursor: "pointer",
      transition: "0.3s",
      backgroundColor: "var(--primary-white)",
      boxShadow: "1px 3.5px 1px var(--black), -2px -2px 8px var(--primary-white)",

    }}
    > 
     <ChevronLeftIcon sx={{fontSize:"3.5rem"}} />
    </Grid>
  );
};

export default BackButton;