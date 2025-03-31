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

export default function Home ()   {
    const [open, setOpen] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev: typeof formData) => ({ ...prev, [field]: value }));
      };

      
      const [signup] = useStudentLoginMutation();
      
         
      const handleSignIn = () => {
        signup(formData); 
      }

    return (
        <Grid
        container
        height="100vh"
        sx={{
          backgroundColor: "var(--redish-orange)",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <Grid item container justifyContent="center" alignContent="center">
          <PeepStanding />
        </Grid>
  
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "var(--primary-white)",
              borderRadius: 2,
              boxShadow: 24,
              p: 3,
              width: "100%",
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
                  label="Email address"
                  icon={<MailOutlineIcon sx={{ fontSize: "2.5rem" }} />}
                  value={formData.email}
                  onChange={(value) => handleChange("email", value)}
                />
              </Grid>
  
              <Grid item>
                <CustomTextField
                  type="password"
                  label="Password"
                  icon={<LockIcon sx={{ fontSize: "2.5rem" }} />}
                  value={formData.password}
                  onChange={(value) => handleChange("password", value)}
                />
              </Grid>

              <Grid item> <CommonButton label={"Sign in >"} onClick={handleSignIn} sxStyles={{backgroundColor:"var(--amber)", color:"var(--black)",  border:"2px solid var(--black)" ,borderBottom:"4.5px solid var(--black)" ,borderRadius: "1.25rem" ,     
 }}/>
  </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>
    )
}