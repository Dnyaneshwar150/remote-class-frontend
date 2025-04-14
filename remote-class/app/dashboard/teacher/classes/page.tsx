"use client";

import AddIcon from '@mui/icons-material/Add';
import BackButton from "@/app/components/common/Button/BackButton";
import Loader from "@/app/components/common/Loader";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { useGetClassesQuery } from "@/app/services/api/apiSlice";
import { Box, Grid, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const router = useRouter();

  const { data: classesData, isLoading: isClassesListLoading } =
    useGetClassesQuery();
  console.log(classesData?.data);

  const classColors = ["#ffffff", "#FFC107", "#00BCD4", "#4CAF50"]; // Add or modify colors

  const handleAddClasses = () => {
    router.push(`/dashboard/teacher/classes/add?teacherId=${teacherId}`);
  };

  return (
    <LayoutWrapper>
      {isClassesListLoading ? (
        <Loader />
      ) : (
        classesData && (
          <>
            <BackButton onClick={() => router.back()} />
            <Grid
              color={"var(--black)"}
              fontSize={"3.6rem"}
              fontWeight='var(--fontweight-bold)'
              my={"2rem"}
            >
              Classes
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              alignItems='center'
              gap={"1rem"}
              sx={{
                maxHeight: "70vh",
                paddingRight: "0.5rem",
                overflowY: "auto",
              }}
            >
              {classesData.data.map((classItem, index) => (
                <ClassCard
                  key={`classItem.name-${index}`}
                  ClassName={classItem.name}
                  division={classItem.division}
                  year={classItem.year}
                  bgColor={classColors[index % classColors.length]} // ← Cycles through colors
                />
              ))}
            </Grid>
            <Box
      position="absolute"
      bottom="1.5rem"
      left="50%"
      onClick={handleAddClasses}
      sx={{
        transform: "translateX(-50%)",
        backgroundColor: "var(--black)",
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <AddIcon sx={{ color: "white", fontSize: "2rem" }} />
    </Box>
          </>
        )
      )}
    </LayoutWrapper>
  );
}

interface ClassCardProps {
  ClassName: string;
  division: string;
  year: string;
  bgColor: string;
}

const ClassCard: React.FC<ClassCardProps> = ({
  ClassName,
  division,
  year,
  bgColor,
}) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: bgColor,
        borderRadius: "1.3rem",
        padding: "2rem",
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid var(--black)",
        borderBottom: "4.5px solid var(--black)",
        fontWeight: "var(--fontweight-extra-bold)",
      }}
    >
      <Grid item>
        <Grid fontSize={"1.75rem"}>{ClassName}</Grid>
        <Grid fontSize={"1.08rem"}>
        Division: {division}  Year: {year}
        </Grid>
        <Typography fontWeight='bold'></Typography>
        <Typography fontSize='0.9rem'></Typography>
      </Grid>
      {/* <Grid fontSize={"3.6rem"}>{count? 0}</Grid> */}
    </Grid>
  );
};
