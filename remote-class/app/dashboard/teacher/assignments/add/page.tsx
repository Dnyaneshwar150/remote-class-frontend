"use client";

import { Grid } from "@mui/material";
import CrossButton from "@/app/components/common/Button/CrossButton";
import { CustomInputField } from "@/app/components/common/CustomInputField";
import CommonButton from "@/app/components/common/Button/CommonButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import UploadDocumentField from "@/app/components/UploadDocumentField";
import { useUploadAssignmentMutation } from "@/app/services/api/apiSlice";
import { toast } from "react-hot-toast";

export default function AddAssignmentPage() {
  const router = useRouter();

  const [uploadAssignment] = useUploadAssignmentMutation();


  const [assignmentDetails, setAssignmentDetails] = useState({
    title: "",
    className: "",
    subject: "",
    instructions: "",
    document: null as File | null, // ✅ accept File object
  });

  const handleChange = (
    field: keyof typeof assignmentDetails,
    value: string | File | null
  ) => {
    setAssignmentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleShareClick = async () => {
    if (
      !assignmentDetails.title ||
      !assignmentDetails.className ||
      !assignmentDetails.subject ||
      !assignmentDetails.document
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      await uploadAssignment({
        file: assignmentDetails.document,
        title: assignmentDetails.title,
        description: assignmentDetails.instructions,
        deadline: "2025-04-30", //TODO do this dynamic 
        year: assignmentDetails.className,
        division: assignmentDetails.subject,
      }).unwrap();
      router.back();
      toast.success("Assignment uploaded successfully!");
  
      setAssignmentDetails({
        title: "",
        className: "",
        subject: "",
        instructions: "",
        document: null,
      });
    } catch {
      toast.error("Failed to upload assignment.");
    }
  };

  return (
    <LayoutWrapper>
      <Grid
        item
        alignSelf='flex-start'
      >
        <CrossButton onClick={() => router.back()} />
      </Grid>

      <Grid
        container
        direction='column'
        gap='1rem'
        sx={{ pt: "2rem" }}
      >
        <Grid item>
          <Grid
            color='var(--black)'
            fontSize='2rem'
            fontWeight='var(--fontweight-bold)'
          >
            Assignment
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            justifyContent='center'
            fontSize='1.5rem'
            fontWeight='var(--fontweight-medium)'
          >
            Wireframe is still important for ideation.
          </Grid>
        </Grid>

        <Grid item>
          <CustomInputField
            label='Title'
            value={assignmentDetails.title}
            onChange={(value) => handleChange("title", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label='Select class'
            value={assignmentDetails.className}
            onChange={(value) => handleChange("className", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label='Subject Name'
            value={assignmentDetails.subject}
            onChange={(value) => handleChange("subject", value)}
          />
        </Grid>

        <Grid item>
          <CustomInputField
            label='Instructions'
            value={assignmentDetails.instructions}
            onChange={(value) => handleChange("instructions", value)}
          />
        </Grid>

        <Grid item>
        <UploadDocumentField
            label='Upload documents'
            value={assignmentDetails.document}
            onChange={(value) => handleChange("document", value)} // ✅ File object
          />
        </Grid>

        <Grid
          item
          container
          justifyContent='center'
        >
          <CommonButton
            label='Share'
            onClick={handleShareClick}
            sxStyles={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </LayoutWrapper>
  );
}
