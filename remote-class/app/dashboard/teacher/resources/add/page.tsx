"use client";

import { Grid } from "@mui/material";
import CrossButton from "@/app/components/common/Button/CrossButton";
import { CustomInputField } from "@/app/components/common/CustomInputField";
import CommonButton from "@/app/components/common/Button/CommonButton";
import { useState } from "react";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { useRouter } from "next/navigation";
import UploadDocumentField from "@/app/components/UploadDocumentField";
import { toast } from "react-hot-toast";
import { useAddResourceMutation } from "@/app/services/api/apiSlice";
import CustomAutocomplete from "@/app/components/common/CustomAutocomplete";



export default function AddAssignmentPage() {
  const router = useRouter(); 
  const [addResource] = useAddResourceMutation();
   
  const [resourceDetails, setResourceDetails] = useState({
    title: "",
    className: "",
    subject: "",
    document: null as File | null, 
  });

  const handleShareClick = async () => {
    if (!resourceDetails.title || !resourceDetails.className || !resourceDetails.document) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await addResource({
        title: resourceDetails.title,
        year: resourceDetails.className,
        subject: resourceDetails.subject,
        file: resourceDetails.document,
      }).unwrap();

      toast.success("Resource shared successfully!");
      router.push(`/dashboard/teacher/resources`);

      setResourceDetails({
        title: "",
        className: "",
        subject: "",
        document: null,
      });
      router.back();
    } catch  {
      toast.error("Failed to share resource.");
    }
  };

  const handleChange = (
    field: keyof typeof resourceDetails,
    value: string | File | null
  ) => {
    setResourceDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
  <LayoutWrapper>
  <Grid item alignSelf="flex-start">
        <CrossButton onClick={()=>router.back()} />
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
            Resources
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
            value={resourceDetails.title}
            onChange={(value) => handleChange("title", value)}
          />
        </Grid>

        <Grid item>
        <CustomAutocomplete
                  label='ClassName'
                  options={["FY", "SY", "TY", "BE"]}
                  selectedOption={resourceDetails.className}
                  onSelect={(value) => handleChange("className", value || "")}
                  isIconDisabled
                />
        </Grid>

        <Grid item>
          <CustomInputField
            label="Subject Name"
            value={resourceDetails.subject}
            onChange={(value) => handleChange("subject", value)}
          />
        </Grid>
        <Grid item>
        <UploadDocumentField
            label='Upload documents'
            value={resourceDetails.document}
            onChange={(value) => handleChange("document", value)} // ✅ File object
          />
        </Grid>

        <Grid item container justifyContent="center">
          <CommonButton
          label={"Share Resource"}
            onClick={handleShareClick}
            sxStyles={{ width: "100%" }}
          />
        </Grid>
      </Grid>
  </LayoutWrapper>
      
  );
}
