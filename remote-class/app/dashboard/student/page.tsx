"use client";

import { Grid, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import {
  useGetStudentDashboardQuery,
  useGetStudentGroupsQuery,
} from "@/app/services/api/apiSlice";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import Loader from "@/app/components/common/Loader";
import PersonIcon from "@mui/icons-material/Person";
import ChatCard from "@/app/components/common/ChatCard";
import StatsCard from "@/app/components/common/StatsCard";

export default function Home() {
  const { data: studentDashboardData, isLoading: isStudentDashboardLoading } =
    useGetStudentDashboardQuery();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  };

  const handleSubmittedAssignmentCardClick = () => {
    router.push(`/dashboard/student/submitted-assignment`);
  };

  const handlePendingAssingmentCardClick = () => {
    router.push(`/dashboard/student/pending-assignment`);
  };

  const handleResourcesCardClick = () => {
    router.push(`/dashboard/student/resources`);
  };
  const handleProfileClick = () => {
    router.push(`/dashboard/student/profile`);
  };

  const handleClassesClick = () => {
    router.push(`/dashboard/student/classes`);
  };
  return (
    <LayoutWrapper>
      {isStudentDashboardLoading ? (
        <Grid
          container
          justifyContent={"center"}
        >
          <Loader />
        </Grid>
      ) : studentDashboardData ? (
        <>
          <Grid
            container
            flexDirection={"column"}
          >
            <Grid
              item
              container
              alignItems='center'
              justifyContent='space-between'
              fontSize={"3.6rem"}
              fontWeight={"var(--fontweight-extra-bold)"}
            >
              <div>Welcome</div>
              <Grid item>
                <IconButton
                  onClick={handleProfileClick}
                  sx={{
                    color: "var(--black)",
                    border: "2px solid var(--black)",
                    borderRadius: "1rem",
                    padding: "0.5rem",
                    mr: "0.5rem",
                  }}
                >
                  <Tooltip
                    title='Profile'
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontSize: "1.25rem",
                          mt: "0.5rem",
                        },
                      },
                    }}
                  >
                    <PersonIcon sx={{ fontSize: "2.5rem" }} />
                  </Tooltip>
                </IconButton>
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: "var(--black)",
                    border: "2px solid var(--black)",
                    borderRadius: "1rem",
                    padding: "0.5rem",
                  }}
                >
                  <Tooltip
                    title='LogOut'
                    componentsProps={{
                      tooltip: {
                        sx: {
                          fontSize: "1.25rem",
                          mt: "0.5rem",
                        },
                      },
                    }}
                  >
                    <LogoutIcon sx={{ fontSize: "2.5rem" }} />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              item
              fontSize={"3.6rem"}
              fontWeight={"var(--fontweight-extra-bold)"}
            >
              {studentDashboardData.data.studentName}
            </Grid>
          </Grid>

          <Grid
            container
            gap={"1rem"}
            mt={2}
          >
            <StatsCard
              title='Your Classes'
              count={studentDashboardData.data.classCount} //TODO: add classes count
              bgColor='var(--amber)'
              onClick={handleClassesClick}
            />

            <StatsCard
              title='Total Assignments'
              count={studentDashboardData.data.totalAssignments}
              bgColor='var(--primary-blue)'
              onClick={handleResourcesCardClick}
            />
            <StatsCard
              title='Pending Assignment'
              count={studentDashboardData.data.pendingAssignments}
              bgColor='var(--redish-orange)'
              onClick={handlePendingAssingmentCardClick}
            />
            <StatsCard
              title='Submitted Assignment'
              count={studentDashboardData.data.submittedAssignments}
              bgColor='var(--amber)'
              onClick={handleSubmittedAssignmentCardClick}
            />
            <StatsCard
              title='Resources'
              count={studentDashboardData.data.resourcesAvailable}
              bgColor='var(--teal)'
              onClick={handleResourcesCardClick}
            />
          </Grid>

          <Grid
            container
            fontSize={"1.25rem"}
            fontWeight={"var(--fontweight-bold)"}
            mt={2}
          >
            Message
          </Grid>

          <Grid mt={"1rem"}></Grid>
          <StudentMessageComponent />
        </>
      ) : null}
    </LayoutWrapper>
  );
}

const StudentMessageComponent = () => {
  const router = useRouter();

  const { data: studentsGroups, isLoading: isStudentDataLoading } =
    useGetStudentGroupsQuery();

  const handleGroupChatClick = (groupId: number) => {
    router.push(`/dashboard/student/chat?groupId=${groupId}`);
  };

  return (
    <Grid
      container
      gap={"1rem"}
    >
      {isStudentDataLoading ? (
        <Loader />
      ) : (
        studentsGroups &&
        studentsGroups.data.map((chat) => (
          <ChatCard
            key={chat._id}
            studentName={chat.groupName}
            subLabel={`${chat.year}-${chat.division}`}
            allowStudent={chat.allowStudentToSend}
            onClick={() => handleGroupChatClick(chat.groupId)}
          />
        ))
      )}
    </Grid>
  );
};
