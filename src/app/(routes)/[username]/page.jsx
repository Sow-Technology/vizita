"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
const Page = () => {
  const pathname = usePathname();
  const username = pathname.substring(1);
  const searchUser = async () => {
    try {
      const response = await axios.post("/api/user", { username });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  searchUser();

  return (
    <div>
      <h1>User Profile Page</h1>
      <p>Username: {username}</p>
    </div>
  );
};

export default Page;
