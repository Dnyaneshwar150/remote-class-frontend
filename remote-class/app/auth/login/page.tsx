"use client";
import LockIcon from '@mui/icons-material/Lock';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import CrossButton from "@/app/components/common/Button/CrossButton";
import RemoteClassLogo from "@/app/components/icons/RemoteClassLogo";
import { Button, Grid } from "@mui/material";
import CustomTextField from '@/app/components/common/CustomTextField';
import CommonButton from '@/app/components/common/Button/CommonButton';

export default function Home() {

    const handleCloseClick = () => {
        console.log("close button click ")
    }

    return (
    <Grid height="100vh" sx={{backgroundColor:"var(--primary-white)"}} py={"3rem"} px={"2rem"}>
         <Grid container item justifySelf={"start"}>
            <CrossButton onClick={handleCloseClick}/>
           </Grid>
           <Grid container justifyContent={"center"} mt={"3.5rem"}><RemoteClassLogo/></Grid>
           <Grid fontSize={"3rem"}fontWeight={"var(--fontweight-extra-bold)"} color={"var(--black)"} mt={"4rem"} textAlign={"center"}>Teacher Login</Grid>
          <Grid mt={"5rem"}><CustomTextField label={"Email address"} icon={<MailOutlineIcon  sx={{fontSize:"2.5rem"}}/> } /> </Grid>
           <Grid mt={"2rem"}><CustomTextField type={"password"} label={"Password"} icon={<LockIcon  sx={{fontSize:"2.5rem"}}/> } /> </Grid>

          <Grid container pt={"4rem"} justifyContent={"center"}><CommonButton label={"Sign in >"} sxStyles={{width:"27.25rem"}}/> </Grid>
           
          <Grid container justifyContent={"center"} mt={"3rem"}>
            <Grid item fontSize={"1.25rem"} fontWeight={"var(--fontweight-medium)"}>You are new?</Grid>
            <Button variant="text" 
             sx={{
         height: "1.3rem",
          textTransform: "none", 
          color: "var(--redish-orange)", 
           fontSize: "1.3rem", 
           fontWeight:"var(--fontweight-medium)",
          }}  >Create new</Button>
        </Grid>

           

        </Grid>
    );
}