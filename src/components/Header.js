"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile } from "@/store/slice-reducers/UserReducer";
import Loading from "./Loading";

const Header = () => {
  const { name, cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isCartShaking, setIsCartShaking] = useState(false); // State to control the shake animation
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function clientLogin() {
    setIsLoading(true);

    try {
      await signIn("affinidi", {
        callbackUrl: "http://localhost:3000",
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading("error");
    }
  }

  const logout = () => {
    setIsLoading(true);
    signOut();
    dispatch(clearProfile());

    router.push("/");
    setIsLoading(false);
  };

  const renderLoginState = () => {
    if (isLoading) {
      return (
        <div className=''>
          <Loading loading={isLoading} />
        </div>
      );
    }

    if (isLoading === "error") {
      signOut();
      return (
        <div>
          <p>Unable to load user data. Please try again later.</p>
        </div>
      );
    }

    if (name) {
      return (
        <div>
          <span style={{ fontSize: "14px", textTransform: "capitalize" }}>
            Welcome, {name}
          </span>
          <button onClick={logout}>Logout</button>
        </div>
      );
    }

    return (
      <div>
        <button
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "140px",
          }}
          variant='primary'
          onClick={clientLogin}
        >
          <Image
            width={10}
            height={10}
            src={"/logo192.png"}
            alt='logo affinidi'
          />
          Affinidi Login
        </button>
      </div>
    );
  };
  const shakeAnimation = {
    shake: {
      rotate: [0, 10, -10, 10, -5, 5, -3, 3, 0], // Define the shake motion
      transition: {
        duration: 0.5, // Duration of the animation
      },
    },
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      // Trigger the shake animation when cartItems length changes
      setIsCartShaking(true);
      setTimeout(() => setIsCartShaking(false), 1000); // Stop shaking after 1 second
    }
  }, [cartItems]);

  return (
    <header className='Header'>
      <Link href='/'>
        <h1>FashionFrenzy</h1>
      </Link>
      <nav>
        {renderLoginState()}
        <Link href='/cart' className='CartIcon'>
          <motion.div
            animate={isCartShaking ? "shake" : ""}
            className={`CartIcon ${isCartShaking ? "shake" : ""}`} // Apply shake animation class conditionally
            onAnimationEnd={() => setIsCartShaking(false)} // Reset isCartShaking when animation ends
            variants={shakeAnimation}
          >
            <img src='/cart.png' alt='Cart' />
            <p>{cartItems?.length}</p>
          </motion.div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
