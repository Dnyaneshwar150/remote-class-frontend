"use client";

import { Grid, IconButton } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { useGetTeacherDashboardQuery } from "@/app/services/api/apiSlice";
import Loader from "@/app/components/common/Loader";

export default function Home() {

  const {data:teacherDashboardData, isLoading: isDashboardDataLoading} =useGetTeacherDashboardQuery();
  console.log(teacherDashboardData)
  const teacherId = teacherDashboardData?.data.teacherId;
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  };

  const handleClassCardClick = () => {
    router.push(`/dashboard/teacher/classes?teacherId=${teacherId}`);
  };

  const handleAssignmentsCardClick = () => {
    router.push(`/dashboard/teacher/resources?teacherId=${teacherId}`);
  };

  const handleResourcesCardClick = () => {
    router.push(`/dashboard/teacher/resources?teacherId=${teacherId}`);
    console.log("resources click");
  };

  const handleStudentCreate = () => {
    router.push(`/dashboard/teacher/student?teacherId=${teacherId}`);
  };

  return (
    <LayoutWrapper
      sx={{
        backgroundColor: "var(--primary-white)",
        pt: "4rem",
        pl: "2rem",
      }}
    >
      {isDashboardDataLoading ? (
      <Loader/>
      ): teacherDashboardData && (
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
              Mr.{teacherDashboardData.data.teacherName}
            </Grid>
          </Grid>
          <Grid
            container
            gap={"1rem"}
          >
              <StatsCard
                title='Your Classes'
                count={teacherDashboardData.data.classCount}
                bgColor='var(--amber)'
                onClick={handleClassCardClick} />
              <StatsCard
                title='Assignments'
                count={teacherDashboardData.data.assignmentCount}
                bgColor='var(--primary-blue)'
                onClick={handleAssignmentsCardClick} />
              <StatsCard
                title='Resources'
                count={teacherDashboardData.data.resourceCount}
                bgColor='var(--teal)'
                onClick={handleResourcesCardClick} />
              <StatsCard
                title='Create Student' 
                count={teacherDashboardData.data.classCount} //Todo add studentcount
                bgColor='var(--white)'
                onClick={handleStudentCreate}
                studenCard />
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
                <Grid
                  fontSize={"1.25rem"}
                  fontWeight={"var(--fontweight-bold)"}
                  color={"var(--redish-orange)"}
                >
                  see all
                </Grid>
              </Grid>

              <ChatCard
                studentName={"Archana Dube"}
                subLabel={"EJ5I"}
                count={12} />
            </Grid></>
      )}
      
    </LayoutWrapper>
  );
}

const StatsCard: React.FC<{
  title: string;
  count: number;
  bgColor: string;
  onClick: () => void;
  studenCard?: boolean;
}> = ({ title, bgColor, count, onClick, studenCard }) => {
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
        {studenCard ? (
          <PersonAddAlt1Icon
            style={{ color: "var(--dark-grey)", fontSize: "5rem" }}
          />
        ) : (
          <ClassIcon
            style={{ color: "var(--primary-white)", fontSize: "5rem" }}
          />
        )}
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
