import { Button, SxProps } from "@mui/material";

const CommonButton:React.FC<{
    id?:string;
    label:string;
    onClick?: () => void; 
     disabled?: boolean;
    sxStyles?: SxProps;
}> = ({id,label,onClick,disabled,sxStyles}) => {
    return(
        <Button
        id={id}
        disabled={disabled}
        variant="outlined"
        onClick={onClick}
        sx={{
          fontSize:"1.75rem",
          fontWeight:"var(--fontweight-extra-bold)",
          color:"var(--primary-white)",
          backgroundColor:"var(--black)",
          borderRadius:"0.75rem",
          textTransform: "none",
          py:"1.33rem",
          height:"4.5rem",
          "&:hover": {
            backgroundColor: "transparent",
            color: "var(--black)",
            border: "0.5px solid var(--black)",
          },
          ...sxStyles,

        }}
      >
     {label}    
  </Button>
    )
}


export default CommonButton;
     