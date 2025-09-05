import React from "react";

const About = () => {
  return (
    <div className="mt-[2rem] min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Image */}
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dtf1quyas/image/upload/v1750143315/Screenshot_2025_0617_114727_bwasfu.jpg"
            alt="Utkarsh image"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Right Side - Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to <span className="font-semibold text-[#317B74]">Material Hub</span>, 
            a platform created by <span className="font-medium">Utkarsh</span> to help students 
            share and access notes easily. Our goal is to make learning more collaborative 
            and stress-free by providing resources at your fingertips.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Whether you are preparing for exams, catching up on missed lectures, or 
            simply organizing your study material, Material Hub is here to help you 
            succeed in your academic journey.
          </p>

          {/* Some quick highlight boxes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow rounded-xl">
              <h3 className="text-lg font-semibold text-[#317B74]">📚 Easy Access</h3>
              <p className="text-sm text-gray-500 mt-2">
                Find notes by course & semester instantly.
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-xl">
              <h3 className="text-lg font-semibold text-[#317B74]">🤝 Community</h3>
              <p className="text-sm text-gray-500 mt-2">
                Upload & share notes with fellow students.
              </p>
            </div>
          </div>

          {/* Small signature/footer */}
          <p className="mt-8 text-gray-500 text-sm">
            Made with ❤️ by <span className="font-medium text-gray-700">Utkarsh</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
