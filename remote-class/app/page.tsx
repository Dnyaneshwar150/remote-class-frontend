"use client";
import { Box, Grid, LinearProgress } from "@mui/material";
import CommonButton from "./components/common/Button/CommonButton";
import RemoteClassLogo from "./components/icons/RemoteClassLogo";
import React, { useEffect, useState } from "react";
import StudentOnBoardingIcon from "./components/icons/StudentOnBoardingIcon";
import OnBoardingIcon from "./components/icons/OnBoardingIcon";
import { useRouter } from "next/navigation";
import TeacherOnBoarding from "./components/icons/TeacherOnBoarding";
import LayoutWrapper from "./components/LayoutWrapper";
import Loader from "./components/common/Loader";

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

const LogoPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 7000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onNext]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false));
    return () => clearTimeout(timer);
  }, []);
  return (
    <LayoutWrapper sx={{ backgroundColor: "var(--primary-blue)", pb: "2rem" }}>
      {isLoading ? (
        <Loader color='var(--primary-white)' />
      ) : (
        <>
          <Grid
            item
            container
            justifyContent='center'
            flexGrow={1}
            textAlign='center'
            onClick={onNext}
          >
            <Grid
              container
              justifyContent='center'
              alignItems={"end"}
              pb={"1.3rem"}
            >
              <RemoteClassLogo />
            </Grid>
            <Grid
              fontWeight='var(--fontweight-bold)'
              fontSize='2.25rem'
              color='var(--primary-white)'
            >
              REMOTE CLASS
            </Grid>
          </Grid>
          <Grid
            item
            textAlign='center'
            color='var(--primary-white)'
            mt='auto'
          >
            <Grid
              fontSize='1.25rem'
              fontWeight='var(--fontweight-medium)'
            >
              Project by
            </Grid>
            <Grid
              fontSize='1.5rem'
              fontWeight='var(--fontweight-bold)'
            >
              Yogita Ilag
            </Grid>
            <Grid
              fontSize='1.5rem'
              fontWeight='var(--fontweight-bold)'
            >
              Shivam Telange
            </Grid>
            <Grid
              fontSize='1.5rem'
              fontWeight='var(--fontweight-bold)'
            >
              Sanika Deokar
            </Grid>

            <Grid
              mt={"3rem"}
              width='100%'
            >
              <LinearProgress
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  "& .MuiLinearProgress-bar": { backgroundColor: "white" },
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </LayoutWrapper>
  );
};

const StudentPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <LayoutWrapper sx={{ backgroundColor: "var(--primary-white)" }}>
      <Grid item>
        <Grid
          container
          justifyContent={"center"}
          py={"3rem"}
        >
          <StudentOnBoardingIcon />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent={"center"}
        color={"var(--black)"}
      >
        <Grid
          container
          justifyContent={"center"}
          fontSize={"3rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
        >
          We are for Students
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-medium)"}
        >
          Wireframe is still important for
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          textAlign={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-extra-medium)"}
        >
          ideation. It will help you to
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          textAlign={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-extra-medium)"}
        >
          quickly test idea.
        </Grid>
      </Grid>
      <Box flexGrow={1} />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"end"}
        bottom={"1.25rem"}
      >
        <CommonButton
          label={"Next"}
          onClick={onNext}
          sxStyles={{ width: "13rem" }}
        />
      </Grid>
    </LayoutWrapper>
  );
};

const TeacherPage: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
   
        <LayoutWrapper sx={{ backgroundColor: "var(--redish-orange)" }}>
          
        <Grid item>
        <Grid
          container
          justifyContent={"center"}
          py={"3rem"}
        >
          <TeacherOnBoarding />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent={"center"}
        color={"var(--primary-white)"}
      >
        <Grid
          container
          justifyContent={"center"}
          textAlign={"center"}
          fontSize={"3rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
        >
          We are for Teachers
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-medium)"}
        >
          Wireframe is still important for
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-extra-medium)"}
        >
          ideation.
        </Grid>
      </Grid>
      <Box flexGrow={1} />

      <Grid
        container
        justifyContent={"center"}
        alignItems={"end"}
      >
        <CommonButton
          label={"Get started"}
          onClick={onNext}
          sxStyles={{ px: "5rem" }}
        />
      </Grid>
           </LayoutWrapper>

      
  );
};

const SignupLoginPage: React.FC = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/auth/sign-up");
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
  
      <LayoutWrapper  sx={{ backgroundColor: "var(--primary-white)" }}>
      <Grid item>
        <Grid
          container
          justifyContent={"center"}
          py={"3rem"}
        >
          <OnBoardingIcon />
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent={"center"}
        color={"var(--black)"}
      >
        <Grid
          textAlign={"center"}
          fontSize={"3rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
        >
          Contra
        </Grid>
        <Grid
          container
          textAlign={"center"}
          fontSize={"3rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
          justifyContent={"center"}
        >
          {" "}
          wireframe kit
        </Grid>
        <Grid
          textAlign={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-medium)"}
        >
          Wireframe is still important for
        </Grid>
        <Grid
          textAlign={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-medium)"}
        >
          ideation. It will help you to
        </Grid>
        <Grid
          textAlign={"center"}
          fontSize={"1.75rem"}
          fontWeight={"var(--fontweight-extra-medium)"}
        >
          quickly test idea.
        </Grid>
      </Grid>
      <Box flexGrow={1} />

      <Grid
        container
        alignItems={"end"}
        justifyContent={"space-around"}
        px={"2rem"}
      >
        <CommonButton
          label={"Signup"}
          onClick={handleSignup}
          sxStyles={{
            backgroundColor: "var(--primary-white)",
            color: "var(--black)",
            width: "12rem",
            border: "2px solid var(--black)",
          }}
        />{" "}
        <CommonButton
          label={"Login"}
          onClick={handleLogin}
          sxStyles={{ width: "12rem" }}
        />{" "}
      </Grid>
      </LayoutWrapper>
      
  );
};

{
  /* <Typography variant="h1">this is Extra bold We are for Students </Typography>
<Typography variant="h2">this is  bold </Typography>
<Typography variant="h3">this is medium  </Typography>
<Typography variant="h4">this is regular </Typography>
<Typography variant="h5">this is light  </Typography>

<CommonButton label={"Get started"} sxStyles={{ width:"27.25rem"}} />
<CommonButton label={"Next"} />

 < StudentCard /> */
}
