"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
const Page = () => {
  const pathname = usePathname();
  const username = pathname.substring(1);
  const [data, setData] = useState({});
  const searchUser = async () => {
    try {
      const response = await axios.post("/api/user", { username });
      setData(response.data.data);
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
      {data.personalEmail}
    </div>
  );
};

export default Page;
