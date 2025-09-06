import { motion } from "motion/react";

const About = () => {
  return (
    <div className="mt-[3rem] min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 overflow-hidden">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Image */}
        <motion.div
          className="flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src="https://res.cloudinary.com/dtf1quyas/image/upload/v1750143315/Screenshot_2025_0617_114727_bwasfu.jpg"
            alt="Utkarsh image"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>

          <motion.p
            className="text-gray-600 leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Welcome to <span className="font-semibold text-[#317B74]">Material Hub</span>, 
            a platform created by <span className="font-medium">Utkarsh</span> to help students 
            share and access notes easily. Our goal is to make learning more collaborative 
            and stress-free by providing resources at your fingertips.
          </motion.p>

          <motion.p
            className="text-gray-600 leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Whether you are preparing for exams, catching up on missed lectures, or 
            simply organizing your study material, Material Hub is here to help you 
            succeed in your academic journey.
          </motion.p>

          {/* Highlight Boxes */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "📚 Easy Access",
                desc: "Find notes by course & semester instantly.",
              },
              {
                title: "🤝 Community",
                desc: "Upload & share notes with fellow students.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-4 bg-white shadow rounded-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-[#317B74]">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Small signature/footer */}
          <motion.p
            className="mt-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
          >
            Made with ❤️ by <span className="font-medium text-gray-700">Utkarsh</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
