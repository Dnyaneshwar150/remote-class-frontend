"use client";

import BackButton from "@/app/components/common/Button/BackButton";
import ClassCard from "@/app/components/common/ClassCard";
import Loader from "@/app/components/common/Loader";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { useGetClassesListStudentQuery } from "@/app/services/api/apiSlice";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { data: classesData, isLoading: isClassesListLoading } =
    useGetClassesListStudentQuery();

  const classColors = ["#ffffff", "#FFC107", "#00BCD4", "#4CAF50"]; // Add or modify colors

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
              Your Classes
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
              {classesData.data.count === 0 ? (
                <Grid fontSize={"2rem"}>No Classes Present</Grid>
              ) : (
                classesData.data.classes.map((classItem, index) => (
                  <ClassCard
                    key={classItem.id}
                    classId={classItem.id}
                    ClassName={classItem.name}
                    division={classItem.division}
                    year={classItem.year}
                    bgColor={classColors[index % classColors.length]}
                  />
                ))
              )}
            </Grid>
          </>
        )
      )}
    </LayoutWrapper>
  );
}
