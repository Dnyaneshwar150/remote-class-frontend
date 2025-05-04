"use client";

import BackButton from "@/app/components/common/Button/BackButton";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import {
  useGetStudentDashboardQuery,
  useUploadAssignmentStudentMutation,
} from "@/app/services/api/apiSlice";
import { useRouter } from "next/navigation";
import UploadIcon from "@mui/icons-material/Upload";

import { Box, Grid, Typography } from "@mui/material";
import Loader from "@/app/components/common/Loader";
import { useRef } from "react";
import toast from "react-hot-toast";

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
            >
              Pending Assignments
            </Grid>

            <Grid
              container
              spacing={2}
            >
              {studentDashboardData.data.pendingAssignmentsList.map(
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
}> = ({ title, id, color }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadAssignmentStudent] = useUploadAssignmentStudentMutation();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadAssignmentStudent({ id, file }).unwrap();
        toast.success(result.message || "Uploaded successfully");
      } catch {
        toast.error("Upload failed");
      }
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

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

        <Typography
          color='blue'
          fontWeight='bold'
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          onClick={handleUploadClick}
        >
          <UploadIcon sx={{ mr: 1 }} />
          Upload
        </Typography>

        <input
          type='file'
          accept='*'
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Box>
    </Grid>
  );
};
