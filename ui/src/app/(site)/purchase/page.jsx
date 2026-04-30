"use client";

import { Suspense } from "react";
import PurchaseForm from "./PurchaseForm";

export default function CartPurchasePage() {
  return (
    <Suspense fallback={<div>Loading cart checkout...</div>}>
      <PurchaseForm />
    </Suspense>
  );
}
