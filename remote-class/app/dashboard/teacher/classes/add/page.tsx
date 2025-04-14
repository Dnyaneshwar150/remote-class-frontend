"use client";

import CommonButton from "@/app/components/common/Button/CommonButton";
import CrossButton from "@/app/components/common/Button/CrossButton";
import { CustomInputField } from "@/app/components/common/CustomInputField";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  const [classDetails, setClassDetails] = useState({
    name: "",
    year: "",
    division: ""
  });

  console.log(classDetails)

  const handleChange = (field: keyof typeof classDetails, value: string) => {
    setClassDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleShareClassesClick = () => {
    console.log("share classes cLick")
  }

  return (
    
     <LayoutWrapper>
     <Grid item alignSelf="flex-start">
      <CrossButton onClick={() => router.back()} />
    </Grid>
  
    <Grid
      container
      direction="column"
      gap="1rem"
      sx={{ pt: "2rem" }} // Smaller or zero if you like tighter spacing
    >
      <Grid item>
        <Grid
          color="var(--black)"
          fontSize="3rem"
          fontWeight="var(--fontweight-bold)"
        >
          Classes
        </Grid>
      </Grid>
  
      <Grid item>
        <Grid
          justifyContent="center"
          fontSize="1.75rem"
          fontWeight="var(--fontweight-medium)"
        >
          Wireframe is still important for ideation
        </Grid>
      </Grid>
  
      <Grid item>
        <CustomInputField
          label="Class Name"
          value={classDetails.name}
          onChange={(value) => handleChange("name", value)}
        />
      </Grid>
  
      <Grid item>
        <CustomInputField
          label="Year"
          value={classDetails.year}
          onChange={(value) => handleChange("year", value)}
        />
      </Grid>
  
      <Grid item>
        <CustomInputField
          label="Division"
          value={classDetails.division}
          onChange={(value) => handleChange("division", value)}
        />
      </Grid>
  
      <Grid item container justifyContent="center">
        <CommonButton
          label="Share"
          onClick={handleShareClassesClick}
          sxStyles={{ width: "27.25rem" }}
        />
      </Grid>
    </Grid>
     </LayoutWrapper>
    
  
  );
}
