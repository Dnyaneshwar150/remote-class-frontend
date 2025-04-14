import { Button, Typography, Grid } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface UploadDocumentFieldProps {
  label: string;
  value: File | null;
  onChange: (value: File | null) => void;
}

const UploadDocumentField: React.FC<UploadDocumentFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onChange(file); // send the full file object, not just the name
    } else {
      alert("Please upload a valid PDF file.");
      onChange(null);
    }
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Typography fontWeight="bold">{label}</Typography>

      <Button
        variant="outlined"
        component="label"
        startIcon={<UploadFileIcon />}
      >
        Select PDF
        <input
          type="file"
          hidden
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </Button>

      {value && (
        <Typography mt={1} fontSize="0.9rem" color="text.secondary">
          Selected: {value.name}
        </Typography>
      )}
    </Grid>
  );
};

export default UploadDocumentField;