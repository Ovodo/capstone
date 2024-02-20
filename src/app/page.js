"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductDisplay from "../components/ProductDisplay";
import Modal from "../components/Modal";
import useCart from "@/hooks/useCart";
import useProfile from "@/hooks/useProfile";
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
