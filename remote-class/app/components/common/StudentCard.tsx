import { Button, Grid } from "@mui/material";
import React from "react";
import AvatarIcon from "../icons/AvtarIcon";

const StudentCard = () => {
  return (
    <Grid
      container
      border={"2px solid var(--black)"}
      borderRadius={"1rem"}
      width={"27.25rem"}
      px={"1.33rem"}
      py={"0.5rem"}
      justifyContent={"space-between"}
    >
      <Grid item>
        <AvatarIcon />
      </Grid>
      <Grid
        item
        alignContent={"center"}
      >
        <Grid
          container
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
          className='ellipsis-text'
          flexWrap={"nowrap"}
          maxWidth={"9.75rem"}
        >
          Billolksfdssfsdfdsfhdoihs
        </Grid>
        <Grid
          fontSize={"1.08rem"}
          fontWeight={"var(--fontweight-medium)"}
        >
          EJ5I
        </Grid>
      </Grid>
      <Grid
        item
        alignContent={"center"}
      >
        <DeleteButton />{" "}
      </Grid>
    </Grid>
  );
};

export default StudentCard;

const DeleteButton: React.FC = () => {
  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
    >
      <Button
        variant='contained'
        sx={{
          backgroundColor: "var(--amber)",
          color: "var(--black)",
          fontWeight: "bold",
          borderRadius: "12px",
          padding: "8px 16px",
          boxShadow: "0px 4px 0px var(--black)",
          "&:hover": {
            backgroundColor: "var(--hover-amber)",
          },
        }}
      >
        Delete
      </Button>
    </Grid>
  );
};
