import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto border-t border-gray-300 px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#015f5b]">
              Grocerly
            </h2>

            <div className="flex justify-center sm:justify-start gap-4 text-gray-500 mt-4 text-xl">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#015f5b]"
              >
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#015f5b]">
                <FaXTwitter />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#015f5b]"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#015f5b]"
              >
                <FaLinkedinIn />
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              © Grocerly Marketplace Private Limited
            </p>
            <p className="text-sm text-gray-400">
              FSSAI Lic No: 11224999000872
            </p>
          </div>

          {/* Links column 1 */}
          <ul className="space-y-3 text-gray-800 font-medium text-center sm:text-left">
            <li className="hover:text-[#015f5b] cursor-pointer">Home</li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Delivery Areas
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">Careers</li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Customer Support
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">Press</li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Grocerly Blog
            </li>
          </ul>

          {/* Links column 2 */}
          <ul className="space-y-3 text-gray-800 font-medium text-center sm:text-left">
            <li className="hover:text-[#015f5b] cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Terms of Use
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Responsible Disclosure Policy
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Sell on Grocerly
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Deliver with Grocerly
            </li>
            <li className="hover:text-[#015f5b] cursor-pointer">
              Franchise with Grocerly
            </li>
          </ul>

          {/* App download */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold mb-4">Download App</h3>
            <div className="flex flex-col gap-3 items-center sm:items-start">
              <button className="flex items-center gap-3 border rounded-xl px-4 py-3 w-full max-w-xs hover:bg-gray-100 transition">
                <FaGooglePlay className="text-xl" />
                <span className="text-sm font-medium">
                  Get it on Play Store
                </span>
              </button>
              <button className="flex items-center gap-3 border rounded-xl px-4 py-3 w-full max-w-xs hover:bg-gray-100 transition">
                <FaApple className="text-xl" />
                <span className="text-sm font-medium">Get it on App Store</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
