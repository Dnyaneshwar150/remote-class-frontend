"use client";

import PeepStanding from "@/app/components/icons/PeepStanding";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { useState } from "react";
import CustomTextField from "@/app/components/common/CustomTextField";
import CommonButton from "@/app/components/common/Button/CommonButton";
import { useStudentLoginMutation } from "@/app/services/api/apiSlice";
import { StudentLoginResponse } from "@/app/utils/models/api.interface";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/app/components/LayoutWrapper";



export default function Home ()   {

  const router = useRouter();

    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState({ rollNumber: "", dob: "" });

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
      };

      
      const [login] = useStudentLoginMutation();
      
         
      const handleLogIn = async () => {
        // Validate missing or empty fields
        const missingFields = Object.entries(formData)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => !value.trim())
          .map(([key]) => key);
    
        if (missingFields.length > 0) {
          toast.error(`Please fill in: ${missingFields.join(", ")}`);
          return;
        }
    
        try {
          const response: StudentLoginResponse = await login(formData).unwrap();
    
          if (response.success && response.data?.token) {
            toast.success("Login successful! 🎉");
            localStorage.setItem("authToken", response.data.token);
            setOpen(false);
            router.push("/dashboard/student");
          } else {
            toast.error(response.message || "Login failed. ❌");
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Login failed. Please try again. ❌";
          toast.error(errorMessage);
        }
      };

    return (
       
        <LayoutWrapper sx={{backgroundColor:"var(--redish-orange)"}}>
        <Grid item container justifyContent="center" alignContent="center">
          <PeepStanding />
        </Grid>
        <Grid container justifyContent="center" alignItems="center">
        <CommonButton label={"Sign in >"}       
            onClick={() => setOpen(true)}
 sxStyles={{backgroundColor:"var(--black)", color:"var(--primary-white)",}}/>
      </Grid>
  
        <Modal open={open} onClose={() => setOpen(false)} >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: "0",
              transform: "translateX(-50%)", 
              bgcolor: "var(--primary-white)",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
              width:"768px"
            }}
          >
            <Grid container justifyContent="space-between" alignItems="center" borderBottom="2px solid var(--black)">
              <Grid item fontSize="2rem" fontWeight="var(--fontweight-extra-bold)">
                Student Login
              </Grid>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Grid>
  
            <Grid container mt={"2rem"} gap="2rem" flexDirection="column" >
              <Grid item>
                <CustomTextField
                  label="Roll No"
                  icon={<MailOutlineIcon sx={{ fontSize: "2.5rem" }} />}
                  value={formData.rollNumber}
                  onChange={(value) => handleChange("rollNumber", value)}
                />
              </Grid>
  
              <Grid item>
                <CustomTextField
                  type="password"
                  label="Password"
                  icon={<LockIcon sx={{ fontSize: "2.5rem" }} />}
                  value={formData.dob}
                  onChange={(value) => handleChange("dob", value)}
                />
              </Grid>

              <Grid item container justifyContent={'center'}> <CommonButton label={"Sign in >"} onClick={handleLogIn} sxStyles={{backgroundColor:"var(--black)", color:"var(--primary-white)",}}/>
  </Grid>
            </Grid>
          </Box>
        </Modal>
        </LayoutWrapper>
       
    )
}