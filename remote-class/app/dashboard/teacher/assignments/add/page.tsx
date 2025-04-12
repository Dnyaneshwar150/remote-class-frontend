"use client";

import { Grid } from "@mui/material";
import CrossButton from "@/app/components/common/Button/CrossButton";
import { CustomInputField } from "@/app/components/common/CustomInputField";
import CommonButton from "@/app/components/common/Button/CommonButton";
import { useState } from "react";

export default function AddAssignmentPage() {
  const [assignmentDetails, setAssignmentDetails] = useState({
    title: "",
    className: "",
    subject: "",
    instructions: "",
    document: "",
  });

  const handleChange = (field: keyof typeof assignmentDetails, value: string) => {
    setAssignmentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBackClick = () => {
    console.log("Back clicked");
  };

  const handleShareClick = () => {
    console.log("Shared Assignment", assignmentDetails);
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        backgroundColor: "var(--primary-white)",
        margin: 0,
        pt: "4rem",
        px: "2rem",
      }}
    >
      <Grid item alignSelf="flex-start">
        <CrossButton onClick={handleBackClick} />
      </Grid>

      <Grid
        container
        direction="column"
        gap="1rem"
        sx={{ pt: "2rem" }}
      >
        <Grid item>
          <Grid
            color="var(--black)"
            fontSize="2rem"
            fontWeight="var(--fontweight-bold)"
          >
            Assignment
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            justifyContent="center"
            fontSize="1.5rem"
            fontWeight="var(--fontweight-medium)"
          >
            Wireframe is still important for ideation.
          </Grid>
        </Grid>

        <Grid item >
          <CustomInputField
            label="Title"
            value={assignmentDetails.title}
            onChange={(value) => handleChange("title", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label="Select class"
            value={assignmentDetails.className}
            onChange={(value) => handleChange("className", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label="Subject Name"
            value={assignmentDetails.subject}
            onChange={(value) => handleChange("subject", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label="Instructions"
            value={assignmentDetails.instructions}
            onChange={(value) => handleChange("instructions", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label="Upload documents"
            value={assignmentDetails.document}
            onChange={(value) => handleChange("document", value)}
          />
        </Grid>

        <Grid item container justifyContent="center">
          <CommonButton
            label="Share"
            onClick={handleShareClick}
            sxStyles={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
