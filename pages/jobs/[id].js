import React from "react";
import { useRouter } from "next/router";
import { JobDetails } from "../../components/JobDetails";

export default function JobDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  return <JobDetails id={id} />;
}
