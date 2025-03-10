import { createContext } from "react";
import { create } from "zustand";
import React from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const base_usel = "https://task-backend-2-eq1x.onrender.com";

export const useAuthstore = create((set) => ({
  isLoggingIn: false,

  login: async (admin, navigate) => {
    set({ isLoggingIn: true });

    const request = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(admin)
    };

    const response = await fetch(`${base_usel}/admin/login`, request);
    const data = await response.json();
    set({ isLoggingIn: false });

    console.log(26, data);

    if (response.ok) {
      toast.success("logged in successfull");
      localStorage.setItem("Admin", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      toast.error("login failed invalid credentials");
    }
  }
}));
