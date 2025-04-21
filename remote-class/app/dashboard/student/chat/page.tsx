"use client";
import BackButton from "@/app/components/common/Button/BackButton";
import Loader from "@/app/components/common/Loader";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import toast from "react-hot-toast";

import {
  useGetGroupInfoQuery,
  useGetGroupMessagesQuery,
  useSendStudentMessageMutation,
} from "@/app/services/api/apiSlice";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function Home() {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const groupId = searchParams[1];
  const { data: groupData, isLoading: isGroupDataLoading } =
    useGetGroupInfoQuery(Number(groupId));

  return (
    <LayoutWrapper>
      {isGroupDataLoading ? (
        <Loader />
      ) : (
        groupData && (
          <>
            <Grid
              container
              sx={{
                height: "5rem",
                borderBottom: "1px solid var(--light-grey)",
              }}
            >
              <Grid item>
                <BackButton onClick={() => router.back()} />
              </Grid>
              <Grid
                item
                sx={{
                  fontWeight: "var(--fontweight-extra-bold)",
                  fontSize: "3rem",
                  textAlign: "center",
                  ml: "13rem",
                }}
              >
                {groupData.data.year + "-" + groupData.data.division}
              </Grid>
            </Grid>
            <ChatSection
              groupId={Number(groupId)}
              isStudentallowed={groupData.data.allowStudentToSend}
            />
          </>
        )
      )}
    </LayoutWrapper>
  );
}

interface ChatCardProps {
  message: string;
  senderName: string;
  senderRole: string;
  time: string; // in ISO format
}

const ChatCard: React.FC<ChatCardProps> = ({
  message,
  senderName,
  senderRole,
  time,
}) => {
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bgColor = senderRole === "student" ? "var(--teal)" : "var(--amber)";

  return (
    <Box
      display='flex'
      alignItems='flex-start'
      gap={1}
      mb={2}
    >
      <Avatar sx={{ bgcolor: bgColor }}>{senderName[0]}</Avatar>

      <Box>
        <Paper
          elevation={2}
          sx={{
            bgcolor: bgColor,
            color: "var(--black)",
            px: "1.5rem",
            py: "1.5rem",
            borderRadius: "1.3rem",
            maxWidth: 400,
            display: "inline-block",
            border: "3px solid var(--black)",
          }}
        >
          <Typography
            variant='caption'
            color='text.secondary'
          >
            {senderName}
          </Typography>
          <Grid
            sx={{
              fontWeight: "var(--fontweight-bold)",
              fontSize: "1rem",
            }}
          >
            {message.length > 40 ? `${message.slice(0, 40)}...` : message}
          </Grid>
          <Typography
            variant='caption'
            color='text.secondary'
            mt={0.5}
          >
            {formattedTime}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

const ChatSection: React.FC<{ groupId: number; isStudentallowed: boolean }> = ({
  groupId,
  isStudentallowed,
}) => {
  const { data: groupData, isLoading: isGroupDataLoading } =
    useGetGroupMessagesQuery(groupId);

  const [sendMessage] = useSendStudentMessageMutation();

  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error("Cannot send an empty message.");
      return;
    }

    try {
      const response = await sendMessage({ groupId, message }).unwrap();
      toast.success(response.message);
      setMessage("");
    } catch {
      toast.error("Failed to send message");
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100vh'
    >
      {/* Chat Messages */}
      <Box
        flexGrow={1}
        overflow='auto'
        padding='1rem'
      >
        {isGroupDataLoading ? (
          <Loader />
        ) : groupData ? (
          <Grid
            container
            direction='column'
            spacing={2}
            mt='2rem'
          >
            {groupData.data
              .slice()
              .reverse()
              .map((chat) => (
                <Grid
                  item
                  key={chat._id}
                >
                  <Box
                    display='flex'
                    justifyContent={
                      chat.senderRole === "student" ? "flex-end" : "flex-start"
                    }
                  >
                    <ChatCard
                      message={chat.message}
                      senderName={chat.senderName}
                      senderRole={chat.senderRole}
                      time={chat.createdAt}
                    />
                  </Box>
                </Grid>
              ))}
          </Grid>
        ) : null}
      </Box>

      {/* Input Field */}
      {isStudentallowed && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "2rem",
            border: "1px solid black",
            paddingLeft: "1rem",
            paddingRight: "0.5rem",
            margin: "1rem",
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          <InputBase
            placeholder='Type your message...'
            fullWidth
            sx={{ fontWeight: "bold" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <IconButton
            color='primary'
            onClick={handleSend}
          >
            <SendIcon />
          </IconButton>
        </Paper>
      )}
    </Box>
  );
};
