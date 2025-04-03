"use client";
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import CrossButton from "@/app/components/common/Button/CrossButton";
import RemoteClassLogo from "@/app/components/icons/RemoteClassLogo";
import { Button, Grid } from "@mui/material";
import CustomTextField from '@/app/components/common/CustomTextField';
import CommonButton from '@/app/components/common/Button/CommonButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/app/services/api/apiSlice';
import { toast } from "react-hot-toast";
import { LoginPayload, LoginResponse } from '@/app/utils/models/api.interface';



export default function Home() {

    const router = useRouter();
    // const [login, { isLoading, error }] = useLoginMutation();   //todo add toastify
    const [login] = useLoginMutation();   //todo add toastify
    

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    
    const handleCloseClick = () => {
        console.log("close button click ")   //TODo: handle back click
    }
    const handleCreateNew = () => {
        router.push("/auth/sign-up");
    }

    const handleTeacherSignIn = async (formData: LoginPayload) => {
      try {
        const response: LoginResponse = await login(formData).unwrap();
    
        if (!response.data?.token) {
          toast.error("Authentication failed. Please try again. ❌");
          return;
        }
    
        localStorage.setItem("authToken", response.data.token); // Prefer cookies in production
        toast.success("Login successful! 🎉");
        router.push("/dashboard/teacher");
      } catch (error) {
        toast.error(
          (error as { data?: { message?: string } })?.data?.message ||
            "Something went wrong. Please try again. ❌"
        );
      }
    };
    const handleStudentLogin = () => {
      router.push("/auth/login/student")
    }
    
    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
      };
  

    return (
    <Grid height="100vh" sx={{backgroundColor:"var(--primary-white)"}} py={"3rem"} px={"2rem"}>
         <Grid container item justifySelf={"start"}>
            <CrossButton onClick={handleCloseClick}/>
           </Grid>
           <Grid container justifyContent={"center"} mt={"3.5rem"}><RemoteClassLogo/></Grid>
           <Grid fontSize={"3rem"}fontWeight={"var(--fontweight-extra-bold)"} color={"var(--black)"} mt={"4rem"} textAlign={"center"}>Teacher Login</Grid>
          <Grid mt={"5rem"}><CustomTextField label={"Email address"} icon={<MailOutlineIcon  sx={{fontSize:"2.5rem"}}/> }  value={formData.email} onChange={(value) => handleChange("email", value)}/> </Grid>
           <Grid mt={"2rem"}><CustomTextField type={"password"} label={"Password"} icon={<LockIcon  sx={{fontSize:"2.5rem"}}/> } value={formData.password} onChange={(value) => handleChange("password", value)} /> </Grid>

          <Grid container pt={"4rem"} justifyContent={"center"}><CommonButton label={"Sign in >"} sxStyles={{width:"27.25rem"}}  onClick={() => handleTeacherSignIn(formData)}/> </Grid>
           
          <Grid container justifyContent={"center"} mt={"3rem"}>
            <Grid item fontSize={"1.25rem"} fontWeight={"var(--fontweight-medium)"}>You are new?</Grid>
            <Button variant="text" 
            onClick={handleCreateNew}
             sx={{
         height: "1.3rem",
          textTransform: "none", 
          color: "var(--redish-orange)", 
           fontSize: "1.3rem", 
           fontWeight:"var(--fontweight-medium)",
          }}  >Create new</Button>
        </Grid>
        <Grid container justifyContent={"center"} mt={"3rem"}>
            <Grid item fontSize={"1.25rem"} fontWeight={"var(--fontweight-medium)"}>You are Student?</Grid>
            <Button variant="text" 
            onClick={handleStudentLogin}
             sx={{
         height: "1.3rem",
          textTransform: "none", 
          color: "var(--redish-orange)", 
           fontSize: "1.3rem", 
           fontWeight:"var(--fontweight-medium)",
          }} >Go here</Button>
        </Grid>
        </Grid>
    );
}