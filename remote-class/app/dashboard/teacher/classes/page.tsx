"use client";

import AddIcon from "@mui/icons-material/Add";
import BackButton from "@/app/components/common/Button/BackButton";
import Loader from "@/app/components/common/Loader";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import {
  useDeleteClassMutation,
  useGetClassesQuery,
} from "@/app/services/api/apiSlice";
import { Box, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ClassCard from "@/app/components/common/ClassCard";

export default function Home() {
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const router = useRouter();

  const { data: classesData, isLoading: isClassesListLoading } =
    useGetClassesQuery();
  const [deleteClass] = useDeleteClassMutation();

  const classColors = ["#ffffff", "#FFC107", "#00BCD4", "#4CAF50"]; // Add or modify colors

  const handleAddClasses = () => {
    router.push(`/dashboard/teacher/classes/add?teacherId=${teacherId}`);
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      await deleteClass(classId);
      toast.success("Class deleted successfully!");
    } catch {
      toast.error("Failed to delete class.");
    }
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
                  key={classItem._id}
                  classId={classItem._id}
                  ClassName={classItem.name}
                  division={classItem.division}
                  year={classItem.year}
                  bgColor={classColors[index % classColors.length]}
                  onDelete={handleDeleteClass}
                />
              ))}
            </Grid>
            <Box
              position='absolute'
              bottom='1.5rem'
              left='50%'
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
