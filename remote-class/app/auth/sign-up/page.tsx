"use client";

import BackButton from '@/app/components/common/Button/BackButton';
import { Button, Grid } from "@mui/material";

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import PaymentIcon from '@mui/icons-material/Payment';
import LockIcon from '@mui/icons-material/Lock';
import CommonButton from '@/app/components/common/Button/CommonButton';
import CustomTextField from '@/app/components/common/CustomTextField';
import { useSignupMutation } from '@/app/services/api/apiSlice';
import { useState } from 'react';



export default function Home() {
    const handleBackClick = () => {
        console.log("Back button click")
    }
    return (
         <Grid  height="100vh" sx={{backgroundColor:"var(--primary-white)"}} py={"3rem"} px={"2rem"}>
            <Grid container item justifySelf={"start"}>
            <BackButton onClick={handleBackClick}/>
           </Grid>
          <Grid mt={"4.33rem"} container item fontSize={"3rem"} fontWeight={"var(--fontweight-extra-bold)"} color={"var(--black)"}>Teacher Sign up  </Grid> 
          <Grid mt={"1rem"} container item fontSize={"1.41rem"} fontWeight={"var(--fontweight-medium)"} color={"var(--black)"}>You have chance to create new  </Grid> 
          <Grid container item fontSize={"1.41rem"} fontWeight={"var(--fontweight-medium)"} color={"var(--black)"}>account if you really want to.</Grid> 

          <SignupForm />
          <Grid container >
            <Grid item fontSize={"1.25rem"} fontWeight={"var(--fontweight-medium)"}>Already have account? </Grid>
            <Button variant="text" 
             sx={{
         height: "1.3rem",
          textTransform: "none", 
          color: "var(--redish-orange)", 
           fontSize: "1.3rem", 
           fontWeight:"var(--fontweight-medium)",
          }}  >Go here</Button>
        </Grid>
        </Grid>
    );

}



  
  const SignupForm = () => {

    const [signup] = useSignupMutation();

   const handleSignup = async () => {
  signup(formData); // No need for try/catch 
    };

    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      college: "",
      classes: "",
      collegeCode: "",
      password: "",
    });

    console.log(formData)

    const handleChange = (field: keyof typeof formData, value: string) => {
      setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
    };

   

    return (
        <Grid container flexDirection={"column"} gap={"2rem"} py={"2rem"}>      
       <CustomTextField label="Full Name" icon={<PermIdentityIcon sx={{ fontSize: "2.5rem" }} />} value={formData.fullName} onChange={(value) => handleChange("fullName", value)} />
      <CustomTextField label="Email address" icon={<MailOutlineIcon sx={{ fontSize: "2.5rem" }} />} value={formData.email} onChange={(value) => handleChange("email", value)} />
      <CustomTextField label="Select college" icon={<SchoolIcon sx={{ fontSize: "2.5rem" }} />} value={formData.college} onChange={(value) => handleChange("college", value)} />
      <CustomTextField label="Select classes" icon={<ClassIcon sx={{ fontSize: "2.5rem" }} />} value={formData.classes} onChange={(value) => handleChange("classes", value)} />
      <CustomTextField label="Unique college code" icon={<PaymentIcon sx={{ fontSize: "2.5rem" }} />} value={formData.collegeCode} onChange={(value) => handleChange("collegeCode", value)} />
      <CustomTextField type="password" label="Password" icon={<LockIcon sx={{ fontSize: "2.5rem" }} />} value={formData.password} onChange={(value) => handleChange("password", value)} />

            <CommonButton label={"Sign up"} onClick={handleSignup} sxStyles={{backgroundColor:"var(--amber)", color:"var(--black)",  border:"2px solid var(--black)" ,borderBottom:"4.5px solid var(--black)" ,borderRadius: "1.25rem" ,     
 }}/>
       </Grid>
    )
}