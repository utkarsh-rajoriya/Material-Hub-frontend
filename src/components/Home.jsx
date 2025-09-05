import { useContext } from 'react';
import {Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
export default function Home() {

  const { token, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center h-dvh secondary">
  <div className="text-center px-6">
    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 font-satisfy">
      Welcome to <span className="primary-b">APGINS</span>
    </h1>
    <p className="text-lg md:text-xl primary-g max-w-2xl mx-auto mb-8 italic">
      A platform where knowledge meets collaboration. Discover and share study notes, 
      boost your learning, and help others grow with your contributions.
    </p>

    {/* Dynamic Buttons */}
    <div className="flex flex-wrap gap-4 justify-center">
      <Link
        className="px-6 py-3 rounded-xl bg-[#FF9D01] text-white font-semibold shadow-md hover:bg-[#e68c00] transition"
        to="/notes"
      >
        View Notes
      </Link>
      {!token && (
        <Link
          className="px-6 py-3 rounded-xl bg-[#317B74] text-white font-semibold shadow-md hover:bg-[#25645b] transition"
          to="/register"
        >
          Teacher Register
        </Link>
      )}
    </div>
  </div>
</div>

  );
}
