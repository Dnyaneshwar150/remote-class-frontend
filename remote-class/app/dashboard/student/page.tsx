"use client";

import { Grid, IconButton } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { useGetStudentDashboardQuery } from "@/app/services/api/apiSlice";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import Loader from "@/app/components/common/Loader";

export default function Home() {
  const { data: studentDashboardData, isLoading: isStudentDashboardLoading } =
    useGetStudentDashboardQuery();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  };

 const handleSubmittedAssignmentCardClick = () => {
  console.log("pending assignment")
 }

 const handlePendingAssingmentCardClick = () => {
  console.log("pending assignment")
 }


  const handleResourcesCardClick = () => {
    router.push(`/dashboard/student/resources`);
  };
  return (
    <LayoutWrapper>
      {
        isStudentDashboardLoading ? (
          <Grid container justifyContent={"center"}> <Loader/> </Grid>
        ):studentDashboardData && (
          <>
          <Grid
            container
            flexDirection={"column"}
          >
            {" "}
            <Grid
      item
      container
      alignItems="center"
      justifyContent="space-between"
      fontSize={"3.6rem"}
      fontWeight={"var(--fontweight-extra-bold)"}
    >
      <div>Welcome</div>
      <IconButton
        onClick={handleLogout}
        sx={{
          color: "var(--black)",
          border: "2px solid var(--black)",
          borderRadius: "1rem",
          padding: "0.5rem",
        }}
      >
        <LogoutIcon sx={{ fontSize: "2.5rem" }} />
      </IconButton>
    </Grid>
            <Grid
              item
              fontSize={"3.6rem"}
              fontWeight={"var(--fontweight-extra-bold)"}
            >
              Mr.{studentDashboardData.data.studentName}
            </Grid>
          </Grid>
            <Grid
              container
              gap={"1rem"}
            >
                <StatsCard
                  title='Total Assignments'
                  count={studentDashboardData.data.totalAssignments}
                  bgColor='var(--amber)'
                  onClick={handleResourcesCardClick} />
                <StatsCard
                  title='Pending Assignment'
                  count={studentDashboardData.data.submittedAssignments}
                  bgColor='var(--redish-orange)'
                  onClick={handlePendingAssingmentCardClick} />
                <StatsCard
                  title='Submitted Assignment'
                  count={studentDashboardData.data.submittedAssignments}
                  bgColor='var(--teal)'
                  onClick={handleSubmittedAssignmentCardClick} />
                <StatsCard
                  title='Resources'
                  count={studentDashboardData.data.resourcesAvailable}
                  bgColor='var(--primary-blue)'
                  onClick={handleResourcesCardClick} />
              </Grid><Grid
                container
                flexDirection={"column"}
                mt={"3rem"}
              >
                <Grid
                  item
                  container
                  justifyContent={"space-between"}
                  pr={"2rem"}
                >
                  <Grid
                    fontSize={"1.25rem"}
                    fontWeight={"var(--fontweight-bold)"}
                  >
                    Message
                  </Grid>
                  {/* <Grid fontSize={"1.25rem"} fontWeight={"var(--fontweight-bold)"} color={"var(--redish-orange)"}>see all</Grid> */}
                </Grid>

                <ChatCard
                  studentName={"Archana Dube"}
                  subLabel={"EJ5I"}
                  count={12} />
              </Grid></>
        )
      }
     
    </LayoutWrapper>
  );
}

const StatsCard: React.FC<{
  title: string;
  count: number;
  bgColor: string;
  onClick: () => void;
}> = ({ title, bgColor, count, onClick }) => {
  return (
    <Grid
      width={"12rem"}
      height={"17.5rem"}
      onClick={onClick}
      sx={{ cursor: "pointer" }}
    >
      <Grid
        borderRadius={"1.3rem"}
        height={"13rem"}
        border={"2px solid var(--black)"}
        sx={{ backgroundColor: bgColor }}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <ClassIcon
          style={{ color: "var(--primary-white)", fontSize: "5rem" }}
        />
      </Grid>
      <Grid
        color={"var(--black)"}
        fontWeight={"var(--fontweight-extra-bold)"}
        mt={"0.6rem"}
        fontSize={"1.5rem"}
      >
        {title}
      </Grid>
      <Grid
        fontWeight={"var(--fontweight-bold)"}
        color={"var(--light-grey)"}
      >
        Total- &nbsp;{count}{" "}
      </Grid>
    </Grid>
  );
};

const ChatCard: React.FC<{
  studentName: string;
  count: number;
  subLabel: string;
}> = ({ studentName, count, subLabel }) => {
  return (
    <Grid
      container
      pr={"2rem"}
      py={"1.33rem"}
      gap={"1rem"}
      alignItems={"center"}
    >
      <Grid
        item
        border={"2px solid var(--black)"}
        borderRadius={"50%"}
        height={"6rem"}
        width={"6rem"}
      >
        {" "}
      </Grid>
      {/* TODO  add avtar here */}
      <Grid item>
        <Grid
          color={"var(--black)"}
          fontWeight={"var(--fontweight-extra-bold)"}
          fontSize={"1.75rem"}
          className='ellipsis-text'
        >
          {studentName}{" "}
        </Grid>
        <Grid
          color={"var(--dark-grey)"}
          fontWeight={"var(--fontweight-bold)"}
          fontSize={"1rem"}
        >
          {subLabel}
        </Grid>
      </Grid>

      <Grid
        color={"var(--light-grey)"}
        fontWeight={"var(--fontweight-extra-bold)"}
        fontSize={"1.4rem"}
        ml={"auto"}
      >
        {count}
      </Grid>
    </Grid>
  );
};
