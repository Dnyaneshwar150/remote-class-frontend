"use client";

import { Grid, Typography, Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { useRouter, useSearchParams } from "next/navigation";


const assignments = [
    { title: "Assignment 1", className: "Class A", color: "#FACC15" },
    { title: "Assignment 2", className: "Class B", color: "#ffffff" },
    { title: "Assignment 3", className: "Class C", color: "#F87171" },
  ];
  
  const resources = [
    { title: "Resource 1", className: "Class A", color: "#FACC15", downloadUrl: "/downloads/resource1.pdf" },
    { title: "Resource 2", className: "Class B", color: "#ffffff", downloadUrl: "/downloads/resource2.pdf" },
    { title: "Resource 3", className: "Class C", color: "#F87171", downloadUrl: "/downloads/resource3.pdf" },
    { title: "Resource 4", className: "Class D", color: "#2dd4bf", downloadUrl: "/downloads/resource4.pdf" },
    { title: "Resource 5", className: "Class E", color: "#ffffff", downloadUrl: "/downloads/resource5.pdf" },
  ];

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
        const teacherId = searchParams.get("teacherId");

    const [tabIndex, setTabIndex] = useState(1); 
    console.log(tabIndex);
    
    
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
    <Grid
      container
      direction="column"
      height="100vh"
      sx={{
        backgroundColor: "var(--primary-white)",
        padding: "2rem",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Grid container flexDirection={"column"} > <Grid item fontSize={"3.6rem"} fontWeight={"var(--fontweight-extra-bold)"}>Your</Grid>
      <Grid item fontSize={"3.6rem"} fontWeight={"var(--fontweight-extra-bold)"}>{tabIndex === 0 ? 'Assignments' : 'Resources'}</Grid> 
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
          label="Assignments"
          sx={{
            px: "1.5rem",
            py: "0.5rem",
            minHeight: "unset",
            borderRadius: "2rem",
            fontWeight: "bold",
            backgroundColor: tabIndex === 0 ? "var(--primary-blue)" : "transparent",
            color: tabIndex === 0 ? "var(--primary-white) !important" : "var(--black)",
            textTransform: "none",
          }}
        />
        <Tab
          label="Resources"
          sx={{
            px: "1.5rem",
            py: "0.5rem",
            minHeight: "unset",
            borderRadius: "2rem",
            fontWeight: "bold",
            backgroundColor: tabIndex === 1 ? "var(--primary-blue)" : "transparent",
            color: tabIndex === 1 ? "var(--primary-white) !important" : "var(--black)",
            textTransform: "none",
          }}
        />
      </Tabs>

      {/* Resource Cards */}
      {tabIndex === 0 ? (
  <Grid container spacing={2}>
    {assignments.map((res, index) => (
      <AssignmentCard
        key={index}
        title={res.title}
        className={res.className}
        color={res.color}
      />
    ))}
  </Grid>
) : (
  <Grid container spacing={2}>
    {resources.map((res, index) => (
      <ResourceCard
        key={index}
        title={res.title}
        className={res.className}
        color={res.color}
        downloadUrl={res.downloadUrl}
      />
    ))}
  </Grid>
)}
    

      {/* Floating Add Button */}
      <Box
      position="absolute"
      bottom="1.5rem"
      left="50%"
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
    </Grid>
  );
}

interface AssignmentCardProps {
    title: string;
    className: string;
    color: string;
  }
  
  const AssignmentCard: React.FC<AssignmentCardProps> = ({ title, className, color }) => {
    return (
      <Grid item xs={6}>
        <Box
          p="1rem"
          border="2px solid var(--black)"
          borderRadius="1rem"
          bgcolor={color}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="7rem"
          sx={{ boxSizing: "border-box" }}
        >
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{className}</Typography>
        </Box>
      </Grid>
    );
  };

  interface ResourceCardProps {
    title: string;
    className: string;
    color: string;
    downloadUrl: string;
  }
  
  const ResourceCard: React.FC<ResourceCardProps> = ({ title, className, color, downloadUrl }) => {
    return (
      <Grid item xs={6}>
        <Box
          p="1rem"
          border="2px solid var(--black)"
          borderRadius="1rem"
          bgcolor={color}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          minHeight="7rem"
          sx={{ boxSizing: "border-box" }}
        >
          <Typography fontWeight="bold">{title}</Typography>
          <Typography>{className}</Typography>
          <Typography
            color="blue"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
            component="a"
            href={downloadUrl}
            download
          >
            Download
          </Typography>
        </Box>
      </Grid>
    );
  };