"use client";
import { useState } from "react";
import axios from "axios"; // Import Axios
import OTPInputField from "@/components/otpInputField";
import { useRouter } from "next/navigation";
const VerifyEmailPage = () => {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState("");

  // Function to handle OTP verification using Axios
  const handleVerify = async (otp) => {
    try {
      // Make a POST request to your OTP verification API route using Axios
      const response = await axios.post("/api/verifyemail", { otp });

      // Set the verification status based on the API response
      setVerificationStatus(response.data.message);
      // If verification is successful, redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
      setVerificationStatus("Error during OTP verification");
    }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{verificationStatus}</p>
      <OTPInputField onVerify={handleVerify} />
    </div>
  );
};

export default VerifyEmailPage;
