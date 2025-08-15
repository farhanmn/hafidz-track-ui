import HalaqahCalendar from "@/components/calendar/HalaqahCalendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hafidz Track",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Ziyadah" />
      <HalaqahCalendar />
    </div>
  );
}
