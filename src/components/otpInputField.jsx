"use client";
import { useState } from "react";

const OTPInputField = ({ onVerify }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerify = () => {
    // Call the onVerify function passed as a prop with the entered OTP
    onVerify(otp);
  };

  return (
    <div>
      <label htmlFor="otpInput">Enter OTP:</label>
      <input
        type="text"
        id="otpInput"
        value={otp}
        onChange={handleChange}
        maxLength={6} // Set the appropriate length for your OTP
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default OTPInputField;
