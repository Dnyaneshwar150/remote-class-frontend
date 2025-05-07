import { Grid, IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface ClassCardProps {
  ClassName: string;
  classId: string;
  division: string;
  year: string;
  bgColor: string;
  onDelete?: (classId: string) => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  ClassName,
  classId,
  division,
  year,
  bgColor,
  onDelete,
}) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: bgColor,
        borderRadius: "1.3rem",
        padding: "2rem",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid var(--black)",
        borderBottom: "4.5px solid var(--black)",
        fontWeight: "var(--fontweight-extra-bold)",
      }}
    >
      <Grid item>
        <Grid fontSize={"1.75rem"}>{ClassName}</Grid>
        <Grid fontSize={"1.08rem"}>
          Division: {division} Year: {year}
        </Grid>
        <Typography fontWeight='bold'></Typography>
        <Typography fontSize='0.9rem'></Typography>
      </Grid>
      {onDelete && (
        <Grid item>
          <IconButton
            onClick={() => onDelete(classId)}
            sx={{ cursor: "pointer" }}
          >
            <DeleteOutlineIcon />{" "}
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default ClassCard;
