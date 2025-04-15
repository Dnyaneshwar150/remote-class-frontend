import { InputAdornment, TextField } from "@mui/material";
import React, { ReactNode } from "react";

interface CustomTextFieldProps {
    label: string;
    icon: ReactNode;
    type?:string;
    value: string;
    onChange: (value: string) => void;
  }
 const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, icon , type ,value , onChange }) => {
    return (
      <TextField
        label={label}
        variant="outlined"
        placeholder={label}
        type={type && type}
        autoComplete="off"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
            InputProps={{
          startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "1.25rem",
            border: "2px solid var(--black)",
            fontSize: "1.75rem",
            fontWeight: "var(--fontweight-medium)",
          },
          "&:hover .MuiOutlinedInput-root": {
            borderColor: "var(--black)",
          },
          "& .MuiInputLabel-root": {
            display: "none", // completely remove label from layout
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none", // remove double outline border
          },
          "& .MuiOutlinedInput-input::placeholder": {
            color: "var(--black)",
            fontSize: "1.75rem",
            fontWeight: "var(--fontweight-medium)",
            opacity: 1,
          },
             
          }}
      />
    );
  };

  export default CustomTextField;