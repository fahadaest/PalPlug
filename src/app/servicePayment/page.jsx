
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PaymentMethod = dynamic(
  () => import('@/components/referralPackage/paymentMethod'),
  { suspense: true }
)

export default function RefPayment() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading payment…</div>}>
      <PaymentMethod />
    </Suspense>
  )
}
