import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fefdfb]">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-[#fffdfa] to-[#fefdfb]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#800000] mb-4">
          Welcome to PCC ChurchNest
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          A safe and organized digital space to share and browse church documents, music sheets, and more — built with your ministry in mind.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/documents"
            className="bg-[#800000] text-white px-6 py-3 rounded-md font-medium shadow hover:bg-[#660000] transition"
          >
            Browse Documents
          </Link>
          <Link
            to="/upload"
            className="bg-[#FFD700] text-[#800000] px-6 py-3 rounded-md font-medium shadow hover:bg-[#e6c200] transition"
          >
            Upload Document
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-white text-center border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-[#800000] mb-6">Why ChurchNest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-[#800000] mb-2">Centralized Access</h3>
            <p className="text-sm text-gray-600">
              No more WhatsApp threads or searching emails. Everything your church needs — all in one place.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-[#800000] mb-2">Organized by Ministry</h3>
            <p className="text-sm text-gray-600">
              Easily browse by PECA, CYF, TECA, RECA and more, keeping things clean and structured.
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-[#800000] mb-2">Built for Simplicity</h3>
            <p className="text-sm text-gray-600">
              Designed for all church members to use with ease — whether you're a techie or not.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} ChurchNest. Made with love for the church.
      </footer>
    </div>
  );
}
