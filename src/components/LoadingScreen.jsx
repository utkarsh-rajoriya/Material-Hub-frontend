import materialHubLogo from "../assets/material-hub-logo.png";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "motion/react";

const LoadingScreen = () => {
  return (
    <motion.div
      className="secondary min-h-screen flex flex-col justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.img
        src={materialHubLogo}
        alt="logo"
        className="w-auto h-32"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.5, 1.1, 1] }} // subtle bounce
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
      />

      <motion.div
        className="mt-6 w-40 h-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.7 }}
      >
        <DotLottieReact
          src="https://lottie.host/02c2b868-cce3-4db9-8e63-5e3ccaeb938a/h1cPm79PaN.lottie"
          loop
          autoplay
          className="scale-200"
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
