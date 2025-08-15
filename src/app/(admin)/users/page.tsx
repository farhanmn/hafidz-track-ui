import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import UserTable from "@/components/tables/UserTable";

export const metadata: Metadata = {
  title: "Hafidz Track",
  // other metadata
};

export default function Users() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="Users">
          <UserTable />
        </ComponentCard>
      </div>
    </div>
  );
}
