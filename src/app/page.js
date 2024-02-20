"use client";
import React, { useEffect, useState } from "react";
import ProductDisplay from "../components/ProductDisplay";
import { getServerAuthSession } from "./auth/functions";
import { updateProfile } from "@/store/slice-reducers/UserReducer";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getSession = async () => {
      const session = await getServerAuthSession();
      if (session) {
        console.log("session", session);
        dispatch(updateProfile(session?.user));
      } else {
        console.log("no session", session);
      }
    };
    getSession();
  }, []);

  return (
    <div className='App w-screen h-screen '>
      <ProductDisplay />
    </div>
  );
}

export default App;
