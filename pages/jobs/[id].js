import React from "react";
import { useRouter } from "next/router";
import { JobDetails } from "../../components/JobDetails";
import { Layout } from "../../components/Layout";

export default function JobDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <JobDetails id={id} />
    </Layout>
  );
}
