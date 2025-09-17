"use client";

import { useState } from "react";

interface TogglePassowrd {
  togglePassword: boolean;
  handleTogglePassword: () => void;
}

const useTogglePassword = (): TogglePassowrd => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };

  return { togglePassword, handleTogglePassword };
};

export default useTogglePassword;
