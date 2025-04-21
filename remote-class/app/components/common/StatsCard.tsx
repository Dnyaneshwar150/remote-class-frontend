import { Grid } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ClassIcon from "@mui/icons-material/Class";

const StatsCard: React.FC<{
  title: string;
  count: number;
  bgColor: string;
  onClick: () => void;
  studenCard?: boolean;
}> = ({ title, bgColor, count, onClick, studenCard }) => {
  return (
    <Grid
      width={"12rem"}
      height={"17.5rem"}
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    >
      <Grid
        borderRadius={"1.3rem"}
        height={"13rem"}
        border={"2px solid var(--black)"}
        sx={{ backgroundColor: bgColor }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        {studenCard ? (
          <PersonAddAlt1Icon
            style={{ color: "var(--dark-grey)", fontSize: "5rem" }}
          />
        ) : (
          <ClassIcon
            style={{ color: "var(--primary-white)", fontSize: "5rem" }}
          />
        )}
      </Grid>
      <Grid
        color={"var(--black)"}
        fontWeight={"var(--fontweight-extra-bold)"}
        mt={"0.6rem"}
        fontSize={"1.5rem"}
      >
        {title}
      </Grid>
      <Grid
        fontWeight={"var(--fontweight-bold)"}
        color={"var(--light-grey)"}
      >
        Total- &nbsp;{count}{" "}
      </Grid>
    </Grid>
  );
};

export default StatsCard;
