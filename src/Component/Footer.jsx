import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 pb-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src={assets.logo}
                alt="Ice Stupa Logo"
                className="h-10 w-auto mr-2"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Ice Stupa Project
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Pioneering sustainable water conservation through innovative
              glacier technology in high-altitude desert regions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/icestupa/"
                className="text-gray-500 hover:text-cyan-600 transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://x.com/icestupa/"
                className="text-gray-500 hover:text-cyan-600 transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.youtube.com/@SonamWangchuk66"
                className="text-gray-500 hover:text-cyan-600 transition"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://www.instagram.com/icestupaproject/"
                className="text-gray-500 hover:text-cyan-600 transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-medium text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  onClick={() => scrollTo(0, 0)}
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/activeProject"
                  onClick={() => scrollTo(0, 0)}
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Active Projects
                </Link>
              </li>
              <li>
                <a
                  href="https://m.youtube.com/watch?v=gvjJ39s53rk"
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Technology
                </a>
                {/* <Link
                  to="/technology"
                  onClick={() => scrollTo(0, 0)}
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Technology
                </Link> */}
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  onClick={() => scrollTo(0, 0)}
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/research"
                  onClick={() => scrollTo(0, 0)}
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Research
                </Link>
              </li>

              <li>
                <a
                  href="https://acresofice.com/case-study/"
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Site Map
                </a>
              </li>
              <li>
                <Link
                  to="/careers"
                  onClick={() =>
                    setTimeout(() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth", // Smooth scroll
                      });
                    }, 100)
                  }
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <a
                  href="https://milaap.org/fundraisers/hial"
                  className="text-gray-600 hover:text-cyan-600 text-sm transition"
                >
                  Support Our Work
                </a>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h4 className="font-medium text-gray-800 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-cyan-600 mr-2 mt-1 flex-shrink-0"
                />
                <span className="text-gray-600 text-sm">
                  SECMOL Campus, Phey, Ladakh, India - 194101
                </span>
              </li>
              <li className="flex items-center">
                <a href="tel:+919682574824" className="flex items-center">
                  <Phone
                    size={18}
                    className="text-cyan-600 mr-2 flex-shrink-0"
                  />
                  <span className="text-gray-600 text-sm">+91 9682574824</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  href="mailto:jigmatdorjey255@gmail.com"
                  className="flex items-center"
                >
                  <Mail
                    size={18}
                    className="text-cyan-600 mr-2 flex-shrink-0"
                  />
                  <span className="text-gray-600 text-sm">
                    jigmatdorjey255@gmail.com
                  </span>
                </a>
              </li>
            </ul>
            <div className="mt-4 pt-2">
              <Link
                to="/contact"
                onClick={() => {
                  setTimeout(() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth", // Smooth scroll
                    });
                  }, 100);
                }}
                className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-md text-sm hover:bg-cyan-200 transition"
              >
                Send Message
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Ice Stupa Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
