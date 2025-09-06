import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { motion } from "motion/react";

// motion-enabled Link
const MotionLink = motion.create(Link);

export default function Home() {
  const { token } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-dvh secondary">
      <div className="text-center px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-black mb-6 font-satisfy"
          animate={{ scale: [0.8, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1 }}
        >
          Welcome <span className="primary-b">APGINS</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl primary-g max-w-2xl mx-auto mb-8 italic"
          animate={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          A platform where knowledge meets collaboration. Discover and share
          study notes, boost your learning, and help others grow with your
          contributions.
        </motion.p>

        {/* Animated Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <MotionLink
            to="/notes"
            className="px-6 py-3 rounded-xl bg-[#FF9D01] text-white font-semibold shadow-md hover:scale-[1.1] hover:transition"
            initial={{ scale: 0, opacity: 0 }}  
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.7,
              type: "spring",
              stiffness: 90,
              damping: 10,
            }}
          >
            View Notes
          </MotionLink>

          {!token && (
            <MotionLink
              to="/register"
              className="px-6 py-3 rounded-xl bg-[#317B74] text-white font-semibold shadow-md hover:scale-[1.1] hover:transition"
              initial={{ scale: 0, opacity: 0 }}  
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.9,
              type: "spring",
              stiffness: 90,
              damping: 10,
            }}
            >
              Teacher Register
            </MotionLink>
          )}
        </div>
      </div>
    </div>
  );
}
