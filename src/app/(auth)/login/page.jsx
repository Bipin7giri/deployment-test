import dynamic from "next/dynamic";
import React from "react";
const Login = dynamic(() => import("./_component/login"), {
  ssr: false,
});
export default function LoginPage() {
  return (
    <div>
      <Login />
    </div>
  );
}
