"use client";

import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  console.log(params);

  return (
    <>
      <h1>Kanband board</h1>
    </>
  );
};

export default page;
