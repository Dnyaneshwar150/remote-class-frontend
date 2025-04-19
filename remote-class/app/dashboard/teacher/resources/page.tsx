"use client";

import { Grid, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter, useSearchParams } from "next/navigation";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import {
  useGetTeacherAssignmentQuery,
  useGetTeacherResourcesQuery,
} from "@/app/services/api/apiSlice";
import Loader from "@/app/components/common/Loader";
import BackButton from "@/app/components/common/Button/BackButton";
import { AssignmentCard } from "@/app/components/common/AssignmentCard";
import { ResourceCard } from "@/app/components/common/ResourceCard";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teacherId = searchParams.get("teacherId");
  const { data: resourcesData, isLoading: isResourcesDataLoading } =
    useGetTeacherResourcesQuery();
  const { data: assignmentData, isLoading: assignmentDataLoading } =
    useGetTeacherAssignmentQuery();
  const classColors = ["#ffffff", "#FFC107", "#00BCD4", "#4CAF50"];

  const [tabIndex, setTabIndex] = useState(1);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleAddClick = () => {
    if (tabIndex === 0) {
      router.push(`/dashboard/teacher/assignments/add?teacherId=${teacherId}`);
    } else {
      router.push(`/dashboard/teacher/resources/add?teacherId=${teacherId}`);
    }
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
            {"You Haven't Uplaoded any assignment"}{" "}
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
      ) : resourcesData.data.length === 0 ? (
        <Grid
          fontSize={"1.6rem"}
          fontWeight={"var(--fontweight-extra-bold)"}
          color={"var(--black)"}
        >
          {"You Haven't Uplaoded any resource"}{" "}
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
        >
          {resourcesData?.data.map((res, index) => (
            <ResourceCard
              key={index}
              title={res.title}
              className={res.subject}
              color={classColors[index % classColors.length]}
              downloadUrl={res.fileUrl}
            />
          ))}
        </Grid>
      )}

      {/* Floating Add Button */}
      <Box
        position='absolute'
        bottom='1.5rem'
        left='50%'
        onClick={handleAddClick}
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
    </LayoutWrapper>
  );
}
