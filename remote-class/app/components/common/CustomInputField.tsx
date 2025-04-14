import { TextField } from "@mui/material";

export const CustomInputField: React.FC<{
    label: string;
    value?: string;
    onChange: (value: string) => void;
  }> = ({label,value , onChange}) => {
    return (
      <TextField
      variant="outlined"
      placeholder={label}
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        sx: {
          borderRadius: "1.25rem",
          fontSize: "1.75rem",
          fontWeight: "var(--fontweight-medium)",
          color: "var(--black)",
        },
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
    )
  } 
