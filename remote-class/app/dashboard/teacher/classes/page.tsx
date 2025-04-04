"use client";

import AddButton from "@/app/components/common/Button/AddButton";
import { Grid, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


export default function Home() {
    const searchParams = useSearchParams();
    const teacherId = searchParams.get("teacherId");
    console.log(teacherId)

    const router = useRouter();



    const classData = [
        { classCode: "EJ51", division: "Mars", timing: "12AM", count: 12, bgColor: "#ffffff" },
        { classCode: "EJ31", division: "Mars", timing: "12AM", count: 5, bgColor: "#FFC107" },
        { classCode: "EJ61", division: "USA", timing: "12AM", count: 10, bgColor: "#00BCD4" },
        { classCode: "EJ61", division: "USA", timing: "12AM", count: 10, bgColor: "#00BCD4" },
        { classCode: "EJ61", division: "USA", timing: "12AM", count: 10, bgColor: "#00BCD4" },
      ];

  const handleAddClasses = () =>{
    router.push(`/dashboard/teacher/classes/add?teacherId=${teacherId}`);

  }


    return (
        <Grid
        container
        height="100vh"
        sx={{
          backgroundColor: "var(--primary-white)",
          margin: 0,
           pt:"4rem",
           px:"2rem",
        }}
      > 
      <Grid color={"var(--black)"} fontSize={"3.6rem"} fontWeight="var(--fontweight-bold)" mb={"2rem"}>Classes</Grid>
      <Grid container justifyContent={"center"} alignItems="center" gap={"2rem"}  
       sx={{   
       maxHeight: "70vh",
      paddingRight: "0.5rem",
      overflowY: "auto",}}>
      {classData.map((classItem, index) => (
        <ClassCard key={index} {...classItem} />
      ))}
    </Grid>

    <Grid container justifyContent={"center"}>
    <AddButton onClick={handleAddClasses}/>
    </Grid>
      
      </Grid>
    )
}

interface ClassCardProps {
    classCode: string;
    division: string;
    timing: string;
    count: number;
    bgColor: string;
  }
  
  const ClassCard: React.FC<ClassCardProps> = ({ classCode, division, timing, count, bgColor }) => {
    return (
      <Grid container sx={{ 
          backgroundColor: bgColor, 
          borderRadius: "1.3rem", 
          padding: "2rem", 
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px solid var(--black)",
          borderBottom:"4.5px solid var(--black)",
          fontWeight:"var(--fontweight-extra-bold)",

        }}>
        <Grid item>
            <Grid fontSize={"1.75rem"}>{classCode}</Grid>
            <Grid fontSize={"1.08rem"}>{division}, {timing}</Grid>
          <Typography fontWeight="bold"></Typography>
          <Typography fontSize="0.9rem"></Typography>
        </Grid>
        <Grid fontSize={"3.6rem"}>{count}</Grid>
      </Grid>
    );
  };
  