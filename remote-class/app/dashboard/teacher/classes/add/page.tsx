"use client";

import CustomTextField from "@/app/components/common/CustomTextField";
import { Grid } from "@mui/material";
import { useState } from "react";


export default function Home() {
    const [className, setClassName] = useState("");

    const handleChange = (value: string) => {
      setClassName(value);
    };
  
  
    return (
        <Grid
        container
        height="100vh"
        sx={{
          backgroundColor: "var(--primary-white)",
          margin: 0,
           pt:"4rem",
           px:"2rem",
        }}
      >
     <Grid color={"var(--black)"} fontSize={"3rem"} fontWeight="var(--fontweight-bold)" mb={"2rem"}>Add Classes</Grid>
     <Grid container>
     {/* <CustomTextField label="Class Name" value={className} onChange={handleChange} />
     <CustomTextField label="Class Name" value={className} onChange={handleChange} />
     <CustomTextField label="Class Name" value={className} onChange={handleChange} /> */}

      {/* add TextField here  */}

     </Grid>
      </Grid>
    )
}