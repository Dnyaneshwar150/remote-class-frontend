"use client";

import { Grid, Typography, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import {
  useGetStudentAssignmentQuery,
  useGetStudentResourcesQuery,
} from "@/app/services/api/apiSlice";
import Loader from "@/app/components/common/Loader";
import BackButton from "@/app/components/common/Button/BackButton";
import DownloadIcon from "@mui/icons-material/Download"; // Import the MUI download icon
import { ResourceCard } from "@/app/components/common/ResourceCard";

export default function Home() {
  const router = useRouter();
  const { data: resourcesData, isLoading: isResourcesDataLoading } =
    useGetStudentResourcesQuery();
  const { data: assignmentData, isLoading: assignmentDataLoading } =
    useGetStudentAssignmentQuery();
  const classColors = ["#ffffff", "#FFC107", "#00BCD4", "#4CAF50"];

  const [tabIndex, setTabIndex] = useState(1);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <LayoutWrapper>
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
        {" "}
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
          {tabIndex === 0 ? "Assignments" : "Resources"}
        </Grid>
      </Grid>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{
          mb: "2rem",
          width: "fit-content",
          border: "2px solid var(--black)",
          borderRadius: "2rem",
          minHeight: "unset",
        }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        <Tab
          label='Assignments'
          sx={{
            px: "1.5rem",
            py: "0.5rem",
            minHeight: "unset",
            borderRadius: "2rem",
            fontWeight: "bold",
            backgroundColor:
              tabIndex === 0 ? "var(--primary-blue)" : "transparent",
            color:
              tabIndex === 0
                ? "var(--primary-white) !important"
                : "var(--black)",
            textTransform: "none",
          }}
        />
        <Tab
          label='Resources'
          sx={{
            px: "1.5rem",
            py: "0.5rem",
            minHeight: "unset",
            borderRadius: "2rem",
            fontWeight: "bold",
            backgroundColor:
              tabIndex === 1 ? "var(--primary-blue)" : "transparent",
            color:
              tabIndex === 1
                ? "var(--primary-white) !important"
                : "var(--black)",
            textTransform: "none",
          }}
        />
      </Tabs>

      {/* Resource Cards */}
      {tabIndex === 0 ? (
        assignmentDataLoading ? (
          <Grid
            container
            justifyContent={"center"}
          >
            <Loader />
          </Grid>
        ) : assignmentData.data.length === 0 ? (
          <Grid
            fontSize={"1.6rem"}
            fontWeight={"var(--fontweight-extra-bold)"}
            color={"var(--black)"}
          >
            {"Teacher Haven't Uplaoded any assignment"}{" "}
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
          >
            {assignmentData?.data?.map((res, index) => (
              <AssignmentCard
                key={index}
                title={res.title}
                className={res.division}
                color={classColors[index % classColors.length]}
                description={res.description}
                downloadUrl={res.fileUrl}
                classes={res.year}
              />
            ))}
          </Grid>
        )
      ) : isResourcesDataLoading ? (
        <Grid container>
          <Loader />
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
        >
          {resourcesData &&
            resourcesData.data.map((res, index) => {
              return (
                <ResourceCard
                  key={`${res.year}-${res.subject}-${index}`}
                  title={res.title}
                  className={res.subject}
                  color={classColors[index % classColors.length]}
                  downloadUrl={res.fileUrl}
                />
              );
            })}
        </Grid>
      )}
    </LayoutWrapper>
  );
}

interface AssignmentCardProps {
  title: string;
  className: string;
  color: string;
  description: string;
  downloadUrl: string;
  classes: string;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title,
  className,
  classes,
  color,
  description,
  downloadUrl,
}) => {
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
        <Typography>Divison:{className}</Typography>
        <Typography>{classes} </Typography>
        <Typography
          color='blue'
          fontWeight='bold'
          sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          component='a'
          href={`http://localhost:5000${downloadUrl}`} // Fix the URL by adding the protocol
          download
          target='_blank' // Open the link in a new tab
          rel='noopener noreferrer' // Recommended for security when using target="_blank"
        >
          <DownloadIcon sx={{ mr: 1 }} /> {/* MUI Download Icon with margin */}
          Download
        </Typography>
        <Typography>{description}</Typography>
      </Box>
    </Grid>
  );
};
