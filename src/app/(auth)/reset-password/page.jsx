import dynamic from "next/dynamic";
import React from "react";
const ResetPassword = dynamic(() => import("./_component/ResetPassword"), {
  ssr: false,
});

export default function ResetPasswordPage() {
  return (
    <div>
      <ResetPassword />
    </div>
  );
}
