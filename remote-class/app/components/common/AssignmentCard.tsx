import { Box, Grid, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download"; // Import the MUI download icon

interface AssignmentCardProps {
  title: string;
  className: string;
  color: string;
  description: string;
  downloadUrl: string;
  classes: string;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  className,
  classes,
  color,
  description,
  downloadUrl,
}) => {
  console.log(downloadUrl);
  return (
    <Grid
      item
      xs={6}
    >
      <Box
        p='1rem'
        border='2px solid var(--black)'
        borderRadius='1rem'
        bgcolor={color}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        minHeight='7rem'
        sx={{ boxSizing: "border-box" }}
      >
        <Typography fontWeight='bold'>{title}</Typography>
        <Typography>Divison:{className}</Typography>
        <Typography>{classes} </Typography>
        <Typography
          color='blue'
          fontWeight='bold'
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          component='a'
          href={`http://localhost:5000${downloadUrl}`} // Fix the URL by adding the protocol
          download
          target='_blank' // Open the link in a new tab
          rel='noopener noreferrer' // Recommended for security when using target="_blank"
        >
          <DownloadIcon sx={{ mr: 1 }} /> {/* MUI Download Icon with margin */}
          Download
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Grid>
  );
};
