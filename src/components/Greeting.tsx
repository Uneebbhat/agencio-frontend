"use client";

import useUserStore from "@/store/useUserStore";
import React from "react";
import { Card, CardHeader, CardTitle } from "./ui/card";

// TODO: Chane "[name] with actual name from the zustand store"

const Greeting = () => {
  const getUser = useUserStore((state) => state.getUser);
  const user = getUser();
  const myDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Karachi",
  });

  // console.log(user);

  const hours = new Date(myDate).getHours();
  let greet;

  if (hours < 12) {
    greet = "Good morning";
  } else if (hours >= 12 && hours <= 17) {
    greet = "Good afternoon";
  } else {
    greet = "Good evening";
  }
  return (
    <>
      <section className="w-[100%]">
        <Card className="text-[24px] md:text-[30px] font-semibold">
          <CardHeader>
            <CardTitle>
              {greet}, {user?.name}!
            </CardTitle>
          </CardHeader>
        </Card>
      </section>
    </>
  );
};

export default Greeting;
