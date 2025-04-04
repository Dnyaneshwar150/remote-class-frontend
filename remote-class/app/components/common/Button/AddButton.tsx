import { Grid } from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';




interface BackButtonProps {
    onClick?: () => void;
  }
  
  const AddButton: React.FC<BackButtonProps> = ({ onClick }) => {
    return (
      <Grid height={"4rem"} width={"4rem"} borderRadius={"50%"} onClick={onClick}   
      sx={{
        cursor: "pointer",
        transition: "0.3s",
        backgroundColor: "var(--black)",  
      }}
      > 
      <AddRoundedIcon  style={{fontSize:"4rem",color:"var(--primary-white)"}}/>
      </Grid>
    );
  };

  export default AddButton;