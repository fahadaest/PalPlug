'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Requirements from '@/components/referralPackage/requirements';
export default function QueryParamsWrapper() {
  const params = useSearchParams();
  const employeeId = params.get('employeeId');
  const service = params.get('service');
  const selectedPackages = params.get('selectedPackages');
  const totalPrice = params.get('totalPrice');
  const serviceFee = params.get('serviceFee');
  const totalDeliveryDays = Number(params.get('totalDeliveryDays')) || 1;
  return (
    <Requirements
      employeeId={employeeId}
      service={service}
      selectedPackages={selectedPackages}
      totalPrice={totalPrice}
      serviceFee={serviceFee}
      totalDeliveryDays={totalDeliveryDays}
    />
  );
}
