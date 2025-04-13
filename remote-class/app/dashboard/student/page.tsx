"use client";

import { Grid } from "@mui/material";
import ClassIcon from '@mui/icons-material/Class';
import { useRouter } from "next/navigation";


export default function Home () {
  const studentId = 1234
    const router = useRouter();
  
  const handleClassCardClick = () => {
    router.push(`/dashboard/student/classes?studentId=${studentId}`);

  }

  const handleAssignmentsCardClick = () => {
    console.log("assingment card click")
  }

  const handleResourcesCardClick = () => {
    router.push(`/dashboard/student/resources?studentId=${studentId}`)
  }
    return (
        <Grid
        container
        height="100vh"
        sx={{
          backgroundColor: "var(--primary-white)",
          overflow: "hidden",
          margin: 0,
          pt:"4rem",
          pl:"2rem",
        }}
      > 

      <Grid container flexDirection={"column"} > <Grid item fontSize={"3.6rem"} fontWeight={"var(--fontweight-extra-bold)"}>Welcome</Grid>
      <Grid item fontSize={"3.6rem"} fontWeight={"var(--fontweight-extra-bold)"}>Mr.Santosh</Grid> 
      </Grid>

      <Grid container gap={"1rem"}>
        <StatsCard title="Your Classes" count={5} bgColor="var(--amber)" onClick={handleClassCardClick}/>
         <StatsCard title="Assignments" count={5} bgColor="var(--primary-blue)" onClick={handleAssignmentsCardClick}/>
         <StatsCard title="Resources" count={5} bgColor="var(--teal)" onClick={handleResourcesCardClick}/>
         </Grid>
     
     <Grid container flexDirection={"column"}  mt={"3rem"}> 
        <Grid item container justifyContent={"space-between"} pr={"2rem"}> 
            <Grid fontSize={"1.25rem"} fontWeight={"var(--fontweight-bold)"}>Message</Grid>          
            {/* <Grid fontSize={"1.25rem"} fontWeight={"var(--fontweight-bold)"} color={"var(--redish-orange)"}>see all</Grid> */}
        </Grid> 

        <ChatCard  studentName={"Archana Dube"} subLabel={"EJ5I"} count={12} />
        </Grid>
       
      </Grid>
    )
}

const StatsCard:React.FC<{title:string,
  count:number,
  bgColor:string,
  onClick: () => void;

}> = ({title,bgColor,count,onClick}) => {
    return(
        <Grid width={"12rem"} height={"17.5rem"} onClick={onClick} sx={{cursor:"pointer"}}>
  <Grid borderRadius={"1.3rem"} height={"13rem"} border={"2px solid var(--black)"} sx={{backgroundColor:bgColor}} container justifyContent={"center"} alignItems={"center"}>
   <ClassIcon style={{color:"var(--primary-white)", fontSize:"5rem"}}/>
  </Grid>
  <Grid color={"var(--black)"} fontWeight={"var(--fontweight-extra-bold)"} mt={"0.6rem"} fontSize={"1.5rem"}>{title}</Grid>
<Grid fontWeight={"var(--fontweight-bold)"}  color={"var(--light-grey)"} >Total- &nbsp;{count} </Grid>
</Grid>
    )
}

const ChatCard:React.FC<{studentName:string,count:number,subLabel:string}> = ({studentName,count,subLabel}) => {
    return (
       <Grid container pr={"2rem"} py={"1.33rem"} gap={"1rem"} alignItems={"center"}>
        <Grid item border={"2px solid var(--black)"} borderRadius={"50%"} height={"6rem"} width={"6rem"}> </Grid> 
        {/* TODO  add avtar here */}
        <Grid item> 
        <Grid color={"var(--black)"}  fontWeight={"var(--fontweight-extra-bold)"} fontSize={"1.75rem"} className="ellipsis-text">{studentName} </Grid>    
        <Grid color={"var(--dark-grey)"} fontWeight={"var(--fontweight-bold)"} fontSize={"1rem"}>{subLabel}</Grid>
         </Grid>

        <Grid color={"var(--light-grey)"}  fontWeight={"var(--fontweight-extra-bold)"} fontSize={"1.4rem"} ml={"auto"}>{count}</Grid>

         </Grid> 

    )
}

