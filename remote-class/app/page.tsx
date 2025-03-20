"use client";
import {Grid } from "@mui/material";
import CommonButton from "./components/common/Button/CommonButton";
import RemoteClassLogo from "./components/icons/RemoteClassLogo";
import React, { useState } from "react";
import StudentOnBoardingIcon from "./components/icons/StudentOnBoardingIcon";
import OnBoardingIcon from "./components/icons/OnBoardingIcon";
import { useRouter } from "next/navigation";
import TeacherOnBoarding from "./components/icons/TeacherOnBoarding";


export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <>
      {currentPage === 1 && <LogoPage onNext={handleNext} />}
      {currentPage === 2 && <StudentPage onNext={handleNext} />}
      {currentPage === 3 && <TeacherPage onNext={handleNext} />}
      {currentPage === 4 && <SignupLoginPage />}
    </>
  );
}


const LogoPage:React.FC<{onNext: ()=> void}> = ({onNext}) => {
  return (
    <Grid container 
    height="100vh" 
    sx={{backgroundColor:"var(--primary-blue)"}} 
      pb={"4rem"} flexDirection={"column"}
      alignItems={"center"}  
    >

    <Grid  container   justifyContent={"center"} item mt={"25rem"} onClick={onNext}>
     <Grid container justifyContent={"center"} pb={"1.3rem"} ><RemoteClassLogo /></Grid>
    <Grid fontWeight={"var(--fontweight-bold)"} fontSize={"2.25rem"} color={"var(--primary-white)"} textAlign={"center"}>REMOTE CLASS</Grid>
    </Grid>

    <Grid item   justifyContent={"center"}  color={"var(--primary-white)"} textAlign={"center"} mt={"auto"}>
     <Grid fontSize={"1.25rem"} fontWeight={"var(--fontweight-medium)"}>Project by &nbsp;</Grid>
    <Grid  fontSize={"1.5rem"} fontWeight={"var(--fontweight-bold)"}>Yogita Ilag &nbsp;</Grid>
    <Grid  fontSize={"1.5rem"} fontWeight={"var(--fontweight-bold)"}>Shivam Telange &nbsp;</Grid>
    <Grid  fontSize={"1.5rem"} fontWeight={"var(--fontweight-bold)"}>Sanika Deokar</Grid>  
    </Grid>
</Grid>
  )
}

const StudentPage:React.FC<{onNext: ()=> void}>= ({onNext}) => {
  return (
    <Grid container justifyContent="center" height="100vh" sx={{backgroundColor:"var(--primary-white)"}} pb={"3rem"}>
    <Grid item >
     <Grid container justifyContent={"center"} py={"3rem"}><StudentOnBoardingIcon/></Grid>
    </Grid>
    <Grid item container justifyContent={"center"} color={"var(--black)"} >
     <Grid container textAlign={"center"} fontSize={"3rem"} fontWeight={"var(--fontweight-extra-bold)"}>We are for Students</Grid>
     <Grid container justifyContent={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-medium)"}>Wireframe is still important for</Grid>
     <Grid container justifyContent={"center"}  textAlign={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-extra-medium)"}>ideation. It will help you to</Grid>
     <Grid  container justifyContent={"center"} textAlign={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-extra-medium)"}>quickly test idea.</Grid>
    </Grid>
    <Grid container justifyContent={"center"} alignItems={"end"}><CommonButton label={"Next"} onClick={onNext} sxStyles={{width:"13rem"}}/></Grid>
   </Grid>
  )
}

const TeacherPage:React.FC<{onNext: ()=> void}> = ({onNext}) => {
  return (
    <Grid container justifyContent="center" height="100vh" sx={{backgroundColor:"var(--redish-orange)"}} pb={"3rem"}>
    <Grid item >
     <Grid container justifyContent={"center"} py={"3rem"}><TeacherOnBoarding/></Grid>
    </Grid>
    <Grid item container justifyContent={"center"} color={"var(--primary-white)"} >
     <Grid  container justifyContent={"center"} textAlign={"center"} fontSize={"3rem"} fontWeight={"var(--fontweight-extra-bold)"}>We are for Teachers</Grid>
     <Grid  container justifyContent={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-medium)"}>Wireframe is still important for</Grid>
     <Grid  container  justifyContent={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-extra-medium)"}>ideation.</Grid>
    </Grid>
    <Grid container justifyContent={"center"} alignItems={"end"}><CommonButton label={"Get started"}
     onClick={onNext}  
     sxStyles={{px:"5rem"}}/></Grid>
   </Grid>
  )
}

const SignupLoginPage:React.FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/auth/sign-up");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return(
    <Grid container justifyContent="center" height="100vh" sx={{backgroundColor:"var(--primary-white)"}} pb={"3rem"}>
    <Grid item >
     <Grid container justifyContent={"center"} py={"3rem"}><OnBoardingIcon/></Grid>
    </Grid>
    <Grid item container justifyContent={"center"} color={"var(--black)"} >
     <Grid textAlign={"center"} fontSize={"3rem"} fontWeight={"var(--fontweight-extra-bold)"}>Contra</Grid>
     <Grid container textAlign={"center"} fontSize={"3rem"} fontWeight={"var(--fontweight-extra-bold)"} justifyContent={"center"}> wireframe kit</Grid>
     <Grid textAlign={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-medium)"}>Wireframe is still important for</Grid>
     <Grid textAlign={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-medium)"}>ideation. It will help you to</Grid>
     <Grid textAlign={"center"} fontSize={"1.75rem"} fontWeight={"var(--fontweight-extra-medium)"}>quickly test idea.</Grid>
    </Grid>
    <Grid container alignItems={"end"} justifyContent={"space-around"} px={"2rem"}>
      <CommonButton label={"Signup"}
     onClick={handleSignup}  
     sxStyles={{backgroundColor:"var(--primary-white)", color:"var(--black)", width: "12rem", border:"2px solid var(--black)" }}
    /> <CommonButton label={"Login"}
    onClick={handleLogin} 
    sxStyles={{width: "12rem"}} 
   /> </Grid>
   </Grid>
  )
} 

{/* <Typography variant="h1">this is Extra bold We are for Students </Typography>
<Typography variant="h2">this is  bold </Typography>
<Typography variant="h3">this is medium  </Typography>
<Typography variant="h4">this is regular </Typography>
<Typography variant="h5">this is light  </Typography>

<CommonButton label={"Get started"} sxStyles={{ width:"27.25rem"}} />
<CommonButton label={"Next"} />

 < StudentCard /> */}
