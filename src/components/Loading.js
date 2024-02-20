import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Loading = ({ loading }) => {
  const dotVariants = {
    start: {
      x: "-100%",
      opacity: 0.5,
    },
    end: {
      x: "100%",
      opacity: 1,
    },
  };
  return (
    <div className=''>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial='start'
            animate='end'
            transition={{
              duration: 1,
              staggerChildren: 0.5,
              delayChildren: 0.3,
            }}
            className={`text-center rounded-3xl`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                variants={dotVariants}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className={`inline-block w-2 h-2 m-1 lg:m-2 rounded-full bg-blue-500`}
              ></motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Loading;
