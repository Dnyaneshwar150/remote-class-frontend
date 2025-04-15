import { Autocomplete, Box, TextField } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";


interface CustomAutoCompleteProps {
    label: string; 
    options: string[]; 
    selectedOption: string | null; 
    onSelect: (value: string | null) => void; 
  }
  
 const CustomAutocomplete: React.FC<CustomAutoCompleteProps> = ({
    label,
    options,
    selectedOption,
    onSelect,
  }) => {
    return (
      <Autocomplete
        options={options}
        value={selectedOption || ""}
        onChange={(e, value) => onSelect(value || "")}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={label}
            variant="outlined"
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
                display: "none",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-input::placeholder": {
                color: "var(--black)",
                fontSize: "1.75rem",
                fontWeight: "var(--fontweight-medium)",
                opacity: 1,
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <Box sx={{ display: "flex", alignItems: "center", pl: 1 }}>
                  <SchoolIcon style={{ fontSize: "2.5rem"}} />
                  {params.InputProps.startAdornment}
                </Box>
              ),
            }}
          />
        )}
        fullWidth
      />
    );
  };

  export default CustomAutocomplete;
