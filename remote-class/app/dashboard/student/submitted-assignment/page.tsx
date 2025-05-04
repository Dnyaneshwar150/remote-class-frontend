"use client";

import BackButton from "@/app/components/common/Button/BackButton";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { useGetStudentDashboardQuery } from "@/app/services/api/apiSlice";
import { useRouter } from "next/navigation";

import { Box, Grid, Typography } from "@mui/material";
import Loader from "@/app/components/common/Loader";

export default function Home() {
  const router = useRouter();

  const { data: studentDashboardData, isLoading: isStudentDashboardLoading } =
    useGetStudentDashboardQuery();

  const classColors = ["#ffffff", "#FFC107", "#00BCD4", "#4CAF50"];

  return (
    <LayoutWrapper>
      {isStudentDashboardLoading ? (
        <Loader />
      ) : (
        <>
          <Grid
            container
            item
            justifySelf={"start"}
            mb={"1rem"}
          >
            <BackButton onClick={() => router.back()} />
          </Grid>
          <Grid
            container
            flexDirection={"column"}
          >
            <Grid
              item
              fontSize={"3.6rem"}
              fontWeight={"var(--fontweight-extra-bold)"}
            >
              Your
            </Grid>
            <Grid
              item
              fontSize={"3.6rem"}
              fontWeight={"var(--fontweight-extra-bold)"}
              mb={"2.5rem"}
            >
              Submitted Assignments
            </Grid>

            <Grid
              container
              spacing={2}
            >
              {studentDashboardData.data.submittedAssignmentsList.map(
                (res, index) => (
                  <StudentAssignmentCard
                    key={index}
                    title={res.title}
                    id={res.assignmentId}
                    color={classColors[index % classColors.length]}
                  />
                ),
              )}
            </Grid>
          </Grid>
        </>
      )}
    </LayoutWrapper>
  );
}

const StudentAssignmentCard: React.FC<{
  title: string;
  id: string;
  color: string;
}> = ({ title, color }) => {
  return (
    <Grid
      item
      xs={6}
    >
      <Box
        p='1rem'
        border='2px solid var(--black)'
        borderRadius='1rem'
        bgcolor={color}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        minHeight='7rem'
        sx={{ boxSizing: "border-box" }}
      >
        <Typography fontWeight='bold'>{title}</Typography>
      </Box>
    </Grid>
  );
};
