"use client";
import { Grid } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupIcon from "@mui/icons-material/Group";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useState } from "react";
import CustomTextField from "@/app/components/common/CustomTextField";
import CommonButton from "@/app/components/common/Button/CommonButton";
import { useCreateStudentMutation } from "@/app/services/api/apiSlice";
import { CreateStudentPayload } from "@/app/utils/models/api.interface";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import BackButton from "@/app/components/common/Button/BackButton";
import CustomAutocomplete from "@/app/components/common/CustomAutocomplete";

export default function Home() {
  const router = useRouter();

  const [createStudent, { isLoading }] = useCreateStudentMutation();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    rollNumber: "",
    dob: "",
    year: "",
    division: "",
  });

  const handleBackClick = () => {
    router.back();
  };

  const handleSubmit = async (formData: CreateStudentPayload) => {
    // Validate missing or empty fields
    const missingFields = Object.entries(formData)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => typeof value === 'string' && !value.trim()) 
      .map(([key]) => key);
  
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
  
    try {
      const response = await createStudent(formData).unwrap();
  
      if (!response.success) {
        toast.error(response.message || 'Failed to create student ❌');
        return;
      }
  
      toast.success(response.message || 'Student created successfully 🎉');
      router.push('/dashboard/teacher');
    } catch (error) {
      // Enhanced error handling
      const errorMessage = error instanceof Error ? error.message : 'Failed to create student. Please try again ❌';
      toast.error(errorMessage);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <LayoutWrapper
      sx={{
        backgroundColor: "var(--primary-white)",
        pt: "4rem",
        pl: "2rem",
      }}
    >
      <Grid
        container
        flexDirection={"column"}
      >
        <BackButton onClick={handleBackClick} />{" "}
        <Grid
          item
          fontSize={"3.6rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
          mt={"2rem"}
        >
          Create Student
        </Grid>
      </Grid>

      <Grid
        container
        flexDirection={"column"}
        gap={"2rem"}
        py={"2rem"}
      >
        <CustomTextField
          label='First Name'
          icon={<PermIdentityIcon sx={{ fontSize: "2.5rem" }} />}
          value={formData.firstname}
          onChange={(value) => handleChange("firstname", value)}
        />
        <CustomTextField
          label='Last Name'
          icon={<PermIdentityIcon sx={{ fontSize: "2.5rem" }} />}
          value={formData.lastname}
          onChange={(value) => handleChange("lastname", value)}
        />
        <CustomTextField
          label='Roll Number'
          icon={<CreditCardIcon sx={{ fontSize: "2.5rem" }} />}
          value={formData.rollNumber}
          onChange={(value) => handleChange("rollNumber", value)}
        />
        <CustomTextField
          label='Date of Birth'
          icon={<CalendarMonthIcon sx={{ fontSize: "2.5rem" }} />}
          value={formData.dob}
          onChange={(value) => handleChange("dob", value)}
        />
        <CustomAutocomplete
          label='Year'
          options={["FY", "SY", "TY", "BE"]}
          selectedOption={formData.year}
          onSelect={(value) => handleChange("year", value || "")}
        />
  
        <CustomTextField
          label='Division'
          icon={<GroupIcon sx={{ fontSize: "2.5rem" }} />}
          value={formData.division}
          onChange={(value) => handleChange("division", value)}
        />
      </Grid>

      <Grid
        item
        container
        justifyContent={"center"}
      >
        <CommonButton
          label={isLoading ? "Submitting..." : "Create Student >"}
          onClick={() => handleSubmit(formData)}
          sxStyles={{
            backgroundColor: "var(--black)",
            color: "var(--primary-white)",
          }}
        />{" "}
      </Grid>
    </LayoutWrapper>
  );
}
