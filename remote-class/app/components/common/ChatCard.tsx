import { Grid, Paper } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";

const ChatCard: React.FC<{
  studentName: string;
  subLabel: string;
  allowStudent: boolean;
  onClick?: () => void;
}> = ({ studentName, subLabel, allowStudent, onClick }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "1.5rem",
        p: "1rem",
        width: "100%",
        backgroundColor: "var(--primary-white)",
        height: "6rem",
      }}
    >
      <Grid
        container
        alignItems='center'
        spacing={2}
        onClick={onClick}
        sx={{ cursor: "pointer" }}
      >
        <Grid item>
          <GroupsIcon
            style={{
              color: allowStudent ? "var(--cyan)" : "var(--disabled-grey)",
              fontSize: "3rem",
            }}
          />
        </Grid>
        <Grid item>
          <Grid
            color={"var(--black)"}
            fontWeight={"var(--fontweight-extra-bold)"}
            fontSize={"1.75rem"}
            className='ellipsis-text'
          >
            {studentName}
          </Grid>
          <Grid
            color={"var(--dark-grey)"}
            fontWeight={"var(--fontweight-bold)"}
            fontSize={"1rem"}
          >
            {subLabel}
          </Grid>
        </Grid>

        <Grid
          color={"var(--light-grey)"}
          fontWeight={"var(--fontweight-extra-bold)"}
          fontSize={"1.8rem"}
          ml={"auto"}
          mt={"1.5rem"}
        >
          0{Math.round(Math.random() * 9 + 1)}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChatCard;
