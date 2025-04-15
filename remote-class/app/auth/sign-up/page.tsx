"use client";

import BackButton from "@/app/components/common/Button/BackButton";
import { Button, Grid } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PaymentIcon from "@mui/icons-material/Payment";
import LockIcon from "@mui/icons-material/Lock";
import CommonButton from "@/app/components/common/Button/CommonButton";
import CustomTextField from "@/app/components/common/CustomTextField";
import { useSignupMutation } from "@/app/services/api/apiSlice";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignupPayload } from "@/app/utils/models/api.interface";
import router from "next/router";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import CustomAutocomplete from "@/app/components/common/CustomAutocomplete";

export default function Home() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const goToLogin = () => {
    router.push("/auth/login");
  };
  return (
    <LayoutWrapper sx={{ backgroundColor: "var(--primary-white)" }}>
      <Grid
        container
        item
        justifySelf={"start"}
      >
        <BackButton onClick={handleBackClick} />
      </Grid>
      <Grid
        mt={"4.33rem"}
        container
        item
        fontSize={"3rem"}
        fontWeight={"var(--fontweight-extra-bold)"}
        color={"var(--black)"}
      >
        Teacher Sign up{" "}
      </Grid>
      <Grid
        mt={"1rem"}
        container
        item
        fontSize={"1.41rem"}
        fontWeight={"var(--fontweight-medium)"}
        color={"var(--black)"}
      >
        You have chance to create new{" "}
      </Grid>
      <Grid
        container
        item
        fontSize={"1.41rem"}
        fontWeight={"var(--fontweight-medium)"}
        color={"var(--black)"}
      >
        account if you really want to.
      </Grid>

      <SignupForm />
      <Grid container>
        <Grid
          item
          fontSize={"1.25rem"}
          fontWeight={"var(--fontweight-medium)"}
        >
          Already have account?{" "}
        </Grid>
        <Button
          variant='text'
          sx={{
            height: "1.3rem",
            textTransform: "none",
            color: "var(--redish-orange)",
            fontSize: "1.3rem",
            fontWeight: "var(--fontweight-medium)",
          }}
          onClick={goToLogin}
        >
          Go here
        </Button>
      </Grid>
    </LayoutWrapper>
  );
}

const SignupForm = () => {
  const [signup] = useSignupMutation();

  

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    collegeCode: "",
    department: "",
    password: "",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
  };
  
  const handleSignup = async (formData: SignupPayload) => {
    // Check for any empty fields
    const missingFields = Object.entries(formData)
      .filter(([value]) => !value.trim())
      .map(([key]) => key);
  
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(", ")}`);
      return;
    }
  
    try {
      const response = await signup(formData).unwrap();
  
      if (!response.success) {
        toast.error(response.message || "Signup failed ❌");
        return;
      }
  
      toast.success(response.message || "Signup successful 🎉");
      localStorage.setItem("authToken", response.data.token);
      router.push("/auth/login");
    } catch {
      toast.error("Signup failed. Please try again ❌");
    }
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      gap={"1rem"}
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
        label='Email address'
        icon={<MailOutlineIcon sx={{ fontSize: "2.5rem" }} />}
        value={formData.email}
        onChange={(value) => handleChange("email", value)}
      />
      <CustomTextField
        label='Phone No.'
        icon={<PhoneIphoneIcon sx={{ fontSize: "2.5rem" }} />}
        value={formData.phoneNumber}
        onChange={(value) => handleChange("phoneNumber", value)}
      />
      <CustomTextField
        label='Unique college code'
        icon={<PaymentIcon sx={{ fontSize: "2.5rem" }} />}
        value={formData.collegeCode}
        onChange={(value) => handleChange("collegeCode", value)}
      />
      <CustomAutocomplete
        label={"Select department"}
        options={[
          "Computer Scince",
          "Information Technology",
          "Electrical",
          "E & TC",
        ]}
        selectedOption={formData.department}
        onSelect={(value) => handleChange("department", value || "")}
      />
      {/* Todo:add autoComplete */}
      <CustomTextField
        type='password'
        label='Password'
        icon={<LockIcon sx={{ fontSize: "2.5rem" }} />}
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
      />

      <CommonButton
        label={"Sign up"}
        onClick={() => handleSignup(formData)}
        sxStyles={{
          backgroundColor: "var(--amber)",
          color: "var(--black)",
          border: "2px solid var(--black)",
          borderBottom: "4.5px solid var(--black)",
          borderRadius: "1.25rem",
        }}
      />
    </Grid>
  );
};

