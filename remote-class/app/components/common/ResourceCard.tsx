import { Box, Grid, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download"; // Import the MUI download icon

interface ResourceCardProps {
  title: string;
  className: string;
  color: string;
  downloadUrl: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  className,
  color,
  downloadUrl,
}) => {
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
        <Typography>{className}</Typography>

        {/* Add the download link with the MUI download icon */}
        <Typography
          color='blue'
          fontWeight='bold'
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          component='a'
          href={`http://localhost:5000${downloadUrl}`}
          download
          target='_blank'
          rel='noopener noreferrer'
        >
          <DownloadIcon sx={{ mr: 1 }} />
          Download
        </Typography>
      </Box>
    </Grid>
  );
};
