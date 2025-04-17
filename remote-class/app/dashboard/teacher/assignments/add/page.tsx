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
import CustomAutocomplete from "@/app/components/common/CustomAutocomplete";

export default function AddAssignmentPage() {
  const router = useRouter();

  const [uploadAssignment] = useUploadAssignmentMutation();


  const [assignmentDetails, setAssignmentDetails] = useState({
    title: "",
    year: "",
    instructions: "",
    deadline:"",
    document: null as File | null,
    division:"",
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
      !assignmentDetails.year ||
      !assignmentDetails.division ||
      !assignmentDetails.document ||
      !assignmentDetails.instructions || 
      !assignmentDetails.deadline 
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      await uploadAssignment({
        title: assignmentDetails.title,
        year: assignmentDetails.year,
        description: assignmentDetails.instructions,
        deadline: assignmentDetails.deadline, 
        division: assignmentDetails.division,
        file: assignmentDetails.document,

      }).unwrap();
      router.back();
      toast.success("Assignment uploaded successfully!");
  
      setAssignmentDetails({
        title: "",
        year: "",
        instructions: "",
        document: null,
        deadline:"",
        division:"",
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
        <CustomAutocomplete
                  label='Year'
                  options={["FY", "SY", "TY", "BE"]}
                  selectedOption={assignmentDetails.year}
                  onSelect={(value) => handleChange("year", value || "")}
                  isIconDisabled
                />
        </Grid>

        <Grid item>
        <CustomAutocomplete
                  label='Division'
                  options={["A", "B", "C", "D","E"]}
                  selectedOption={assignmentDetails.division}
                  onSelect={(value) => handleChange("division", value || "")}
                  isIconDisabled
                />
        </Grid>
        
        <Grid item>
        <CustomInputField
            label='Deadline'
            value={assignmentDetails.deadline}
            onChange={(value) => handleChange("deadline", value)}
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
