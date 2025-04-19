"use client";

import CommonButton from "@/app/components/common/Button/CommonButton";
import CrossButton from "@/app/components/common/Button/CrossButton";
import { CustomInputField } from "@/app/components/common/CustomInputField";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomAutocomplete from "@/app/components/common/CustomAutocomplete";
import { useCreateClassMutation } from "@/app/services/api/apiSlice";
import { toast } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [createClass] = useCreateClassMutation();

  const [classDetails, setClassDetails] = useState({
    name: "",
    year: "",
    division: "",
  });

  const handleChange = (field: keyof typeof classDetails, value: string) => {
    setClassDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleShareClassesClick = async () => {
    const missingFields = Object.entries(classDetails)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }

    try {
      const response = await createClass(classDetails).unwrap();

      if (response.success) {
        toast.success("Class created successfully! 🎉");
        setClassDetails({ name: "", year: "", division: "" });
        router.push("/dashboard/teacher/classes");
      } else {
        toast.error(response.message || "Failed to create class. ❌");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create class. Please try again. ❌";
      toast.error(errorMessage);
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
        sx={{ pt: "2rem" }} // Smaller or zero if you like tighter spacing
      >
        <Grid item>
          <Grid
            color='var(--black)'
            fontSize='3rem'
            fontWeight='var(--fontweight-bold)'
          >
            Classes
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            justifyContent='center'
            fontSize='1.75rem'
            fontWeight='var(--fontweight-medium)'
          >
            Wireframe is still important for ideation
          </Grid>
        </Grid>

        <Grid item>
          <CustomInputField
            label='Class Name'
            value={classDetails.name}
            onChange={(value) => handleChange("name", value)}
          />
        </Grid>

        <Grid item>
          <CustomAutocomplete
            label='Year'
            options={["FY", "SY", "TY", "BE"]}
            selectedOption={classDetails.year}
            onSelect={(value) => handleChange("year", value || "")}
          />
        </Grid>

        <Grid item>
          <CustomAutocomplete
            label='Division'
            options={["A", "B", "C", "D", "E"]}
            selectedOption={classDetails.division}
            onSelect={(value) => handleChange("division", value || "")}
            isIconDisabled
          />
        </Grid>

        <Grid
          item
          container
          justifyContent='center'
        >
          <CommonButton
            label='Share'
            onClick={handleShareClassesClick}
            sxStyles={{ width: "27.25rem" }}
          />
        </Grid>
      </Grid>
    </LayoutWrapper>
  );
}
