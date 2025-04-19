"use client";

import TeacherProfileIcon from "@/app/components/icons/TeacherProfileIcon";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { Grid } from "@mui/material";
import BackButton from "@/app/components/common/Button/BackButton";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/common/Loader";
import { useGetStudentProfileQuery } from "@/app/services/api/apiSlice";

export default function Home() {
  const router = useRouter();
  const { data: StudentInfo, isLoading: loadingStudent } =
    useGetStudentProfileQuery();

  return (
    <LayoutWrapper sx={{ p: "2rem" }}>
      {loadingStudent ? (
        <Loader />
      ) : (
        StudentInfo && (
          <>
            <BackButton onClick={() => router.back()} />
            <Grid
              container
              sx={{
                borderBottom: "1px solid var(--light-grey)",
                gap: "5rem",
                py: "2rem",
              }}
            >
              <Grid
                item
                sx={{
                  backgroundColor: "var(--card-amber)",
                  height: "10rem",
                  width: "100%",
                  borderRadius: "1.5rem",
                  position: "relative",
                }}
              >
                <Grid
                  sx={{
                    position: "absolute",
                    bottom: "-20%",
                    left: "40%",
                  }}
                >
                  <TeacherProfileIcon
                    height={100}
                    width={100}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                sx={{
                  width: "100%",
                }}
                textAlign={"center"}
                color={"var(--black)"}
                fontWeight={"var(--fontweight-extra-bold)"}
                fontSize={"2.5rem"}
              >
                {StudentInfo.firstname + " " + StudentInfo.lastname}
                <Grid
                  item
                  sx={{
                    width: "100%",
                  }}
                  textAlign={"center"}
                  color={"var(--light-grey)"}
                  fontWeight={"var(--fontweight-light)"}
                  fontSize={"2rem"}
                >
                  {StudentInfo.rollNumber}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              gap={"2rem"}
              mt={"2rem"}
            >
              <LabelValueField
                label={"Year"}
                value={StudentInfo.year}
              />
              <LabelValueField
                label={"Division"}
                value={StudentInfo.division}
              />
              <LabelValueField
                label={"Password"}
                value={StudentInfo.dob}
              />
              <LabelValueField
                label={"Role"}
                value={"Student"}
              />
            </Grid>
          </>
        )
      )}
    </LayoutWrapper>
  );
}

const LabelValueField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => {
  return (
    <Grid
      container
      gap={"2rem"}
      justifyContent={"start"}
    >
      <Grid
        textAlign={"center"}
        color={"var(--light-grey)"}
        fontWeight={"var(--fontweight-bold)"}
        fontSize={"1.5rem"}
      >
        {label}:
      </Grid>
      <Grid
        textAlign={"center"}
        color={"var(--black)"}
        fontWeight={"var(--fontweight-bold)"}
        fontSize={"1.5rem"}
      >
        {value}
      </Grid>
    </Grid>
  );
};
