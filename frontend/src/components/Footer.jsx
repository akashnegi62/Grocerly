import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGooglePlay, FaApple } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl border-t border-gray-300 mx-auto py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#015f5b]">Grocerly</h2>
          <div className="flex gap-4 text-gray-500 mt-4 text-xl">
            <FaInstagram />
            <FaXTwitter />
            <FaFacebookF />
            <FaLinkedinIn />
          </div>
          <p className="text-sm text-gray-400 mt-6">
            © Grocerly Marketplace Private Limited
          </p>
          <p className="text-sm text-gray-400">fssai lic no : 11224999000872</p>
        </div>

        {/* Links column 1 */}
        <ul className="space-y-3 text-gray-800 font-medium">
          <li>Home</li>
          <li>Delivery Areas</li>
          <li>Careers</li>
          <li>Customer Support</li>
          <li>Press</li>
          <li>Grocerly Blog</li>
        </ul>

        {/* Links column 2 */}
        <ul className="space-y-3 text-gray-800 font-medium">
          <li>Privacy Policy</li>
          <li>Terms of Use</li>
          <li>Responsible Disclosure Policy</li>
          <li>Sell on Grocerly</li>
          <li>Deliver with Grocerly</li>
          <li>Franchise with Grocerly</li>
        </ul>

        {/* App download */}
        <div>
          <h3 className="font-semibold mb-4">Download App</h3>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaGooglePlay className="text-xl" />
              <span className="text-sm font-medium">Get it on play store</span>
            </button>
            <button className="flex items-center gap-3 border rounded-xl px-4 py-3">
              <FaApple className="text-xl" />
              <span className="text-sm font-medium">Get it on app store</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
