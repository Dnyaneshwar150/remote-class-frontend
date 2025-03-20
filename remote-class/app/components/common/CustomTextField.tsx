import { InputAdornment, TextField } from "@mui/material";

interface CustomTextFieldProps {
    label: string;
    icon: JSX.Element;
    type?:string;
  }
 const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, icon , type }) => {
    return (
      <TextField
        label={label}
        variant="outlined"
        placeholder={label}
        type={type && type}
        fullWidth
        InputProps={{
          startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        }}
        sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "1.25rem", 
              border: "2px solid var(--black)", 
            },
            "&.Mui-focused": {
                borderWidth: "3px", 
                borderColor: "var(--black)", 
              },
              "&:hover": {
                borderColor: "var(--black)",
              },
            "& .MuiInputLabel-root": {
              fontSize: "0",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--black)", 
            },

            "& .MuiOutlinedInput-input::placeholder": {
                color: "var(--black)", 
                fontSize: "1.75rem", 
                fontWeight: "var(--fontweight-medium)", 
                opacity: 1, 
              },

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", 
              },
              "& .MuiOutlinedInput-input:focus": {
                fontSize: "1.75rem", 
                fontWeight: "var(--fontweight-medium)", 
              },
             
          }}
      />
    );
  };

  export default CustomTextField;