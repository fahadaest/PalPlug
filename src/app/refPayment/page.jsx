'use client';
import React, { Suspense } from "react";
import ReferralPackage from "@/components/referralPackage";

const RefPayment = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReferralPackage />
    </Suspense>
  );
};

export default RefPayment;
