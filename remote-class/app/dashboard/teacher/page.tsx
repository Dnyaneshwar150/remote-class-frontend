"use client";

import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  Switch,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import {
  useCreateChatGroupMutation,
  useGetTeacherDashboardQuery,
  useGetTeacherGroupsQuery,
} from "@/app/services/api/apiSlice";
import Loader from "@/app/components/common/Loader";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import CustomAutocomplete from "@/app/components/common/CustomAutocomplete";
import CommonButton from "@/app/components/common/Button/CommonButton";
import { toast } from "react-hot-toast";
import ChatCard from "@/app/components/common/ChatCard";
import StatsCard from "@/app/components/common/StatsCard";

export default function Home() {
  const { data: teacherDashboardData, isLoading: isDashboardDataLoading } =
    useGetTeacherDashboardQuery();
  const teacherId = teacherDashboardData?.data.teacherId;
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth/login");
  };
  const [createGroup] = useCreateChatGroupMutation();
  const [showModal, setShowModal] = useState(false);

  const [groupFormData, setGroupFormData] = useState<{
    year: string;
    division: string;
    allowStudentToSend: boolean;
  }>({
    year: "",
    division: "",
    allowStudentToSend: false,
  });
  const handleChange = (
    field: keyof typeof groupFormData,
    value: string | boolean,
  ) => {
    setGroupFormData((prev: typeof groupFormData) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreateGroupClick = async () => {
    if (!groupFormData.year || !groupFormData.division) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const result = await createGroup(groupFormData).unwrap();
      toast.success(`Group created: ${result.data.groupName}`);
    } catch {
      toast.error("Error creating group. Please try again.");
    }
    setShowModal(false);
  };
  const handleClassCardClick = () => {
    router.push(`/dashboard/teacher/classes?teacherId=${teacherId}`);
  };

  const handleAssignmentsCardClick = () => {
    router.push(`/dashboard/teacher/resources?teacherId=${teacherId}`);
  };

  const handleResourcesCardClick = () => {
    router.push(`/dashboard/teacher/resources?teacherId=${teacherId}`);
  };

  const handleStudentCreate = () => {
    router.push(`/dashboard/teacher/student?teacherId=${teacherId}`);
  };
  const handleProfileClick = () => {
    router.push(`/dashboard/teacher/profile?teacherId=${teacherId}`);
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
        <Loader />
      ) : (
        teacherDashboardData && (
          <>
            <Grid
              container
              flexDirection={"column"}
            >
              {" "}
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
                {teacherDashboardData.data.teacherName}
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
                onClick={handleClassCardClick}
              />
              <StatsCard
                title='Assignments'
                count={teacherDashboardData.data.assignmentCount}
                bgColor='var(--primary-blue)'
                onClick={handleAssignmentsCardClick}
              />
              <StatsCard
                title='Resources'
                count={teacherDashboardData.data.resourceCount}
                bgColor='var(--teal)'
                onClick={handleResourcesCardClick}
              />
              <StatsCard
                title='Create Student'
                count={teacherDashboardData.data.classCount} //Todo add studentcount
                bgColor='var(--white)'
                onClick={handleStudentCreate}
                studenCard
              />
            </Grid>
            <Grid
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
                  item
                  fontSize={"1.25rem"}
                  fontWeight={"var(--fontweight-bold)"}
                >
                  Message
                </Grid>

                <Grid
                  item
                  sx={{ cursor: "pointer" }}
                >
                  <Tooltip title='Create Group'>
                    <IconButton onClick={() => setShowModal(true)}>
                      <GroupAddIcon
                        fontSize='large'
                        style={{ color: "var(--redish-orange)" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>

              <TeachersMessageComponent />
            </Grid>
          </>
        )
      )}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "0",
            transform: "translateX(-50%)",
            bgcolor: "var(--primary-white)",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            width: "768px",
          }}
        >
          <Grid
            color={"var(--black)"}
            fontWeight={"var(--fontweight-extra-bold)"}
            fontSize={"1.5rem"}
            mb={"2rem"}
          >
            Create Group For the messages{" "}
          </Grid>
          <Grid
            container
            gap={"2rem"}
          >
            <Grid
              item
              width={"100%"}
            >
              <CustomAutocomplete
                label='Year'
                options={["FY", "SY", "TY", "BE"]}
                selectedOption={groupFormData.year}
                onSelect={(value) => handleChange("year", value)}
                isIconDisabled
              />
            </Grid>
            <Grid
              item
              width={"100%"}
            >
              <CustomAutocomplete
                label='Division'
                options={["A", "B", "C", "D", "E"]}
                selectedOption={groupFormData.division}
                onSelect={(value) => handleChange("division", value)}
                isIconDisabled
              />
            </Grid>

            <Grid
              item
              width={"100%"}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={groupFormData.allowStudentToSend}
                    onChange={(e) =>
                      handleChange("allowStudentToSend", e.target.checked)
                    }
                    inputProps={{
                      "aria-label": "Allow student to send messages",
                    }}
                  />
                }
                label='Would you like to allow messages from the student?'
              />
            </Grid>

            <Grid item>
              <CommonButton
                label='Create Group'
                onClick={handleCreateGroupClick}
                sxStyles={{ width: "27.25rem" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </LayoutWrapper>
  );
}

const TeachersMessageComponent = () => {
  const router = useRouter();

  const { data: teacherGroups, isLoading: isTeachersDataLoading } =
    useGetTeacherGroupsQuery();
  const handleGroupChatClick = (groupId: number) => {
    router.push(`/dashboard/teacher/chat?groupId=${groupId}`);
  };
  return (
    <Grid
      container
      gap={"1rem"}
    >
      {isTeachersDataLoading ? (
        <Loader />
      ) : (
        teacherGroups &&
        teacherGroups.map((chat) => (
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
