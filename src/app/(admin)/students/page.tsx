import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import StudentTable from "@/components/tables/StudentTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hafidz Track",
  // other metadata
};

export default function Students() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Students" />
      <div className="space-y-6">
        <ComponentCard title="Students">
          <StudentTable />
        </ComponentCard>
      </div>
    </div>
  );
}
