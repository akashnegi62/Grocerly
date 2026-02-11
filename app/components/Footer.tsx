import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto border-t border-gray-300 px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <div className="flex justify-center sm:justify-start gap-4 text-gray-500 mt-4 text-xl">
              <FaInstagram />
              <FaXTwitter />
              <FaFacebookF />
              <FaLinkedinIn />
            </div>

            <p className="text-sm text-gray-400 mt-6">
              © Grocerly Marketplace Private Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
