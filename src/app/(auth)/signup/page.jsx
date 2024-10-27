import dynamic from "next/dynamic";
import React from "react";
const Signup = dynamic(() => import("./_component/signup"), {
  ssr: false,
});

export default function SignupPage() {
  return (
    <div>
      <Signup />
    </div>
  );
}
