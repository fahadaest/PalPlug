'use client';
import React, { Suspense } from "react";
import Requirements from "@/components/referralPackage/requirements";

const RequirementsPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Requirements />
        </Suspense>
    );
};

export default RequirementsPage;