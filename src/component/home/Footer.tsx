import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" ">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Name */}
        <div>
          <Link href="/" className="flex items-center space-x-3">
            {/* <Image
              src="/logo3.png"
              alt="CELGAP"
              width={300}
              height={100}
              className="rounded p-1"
            /> */}
          </Link>
          <p className="mt-3 text-sm text-gray-800">
            Advancing research, education, and policy in law and governance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about/mission" className="hover:text-yellow-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/research" className="hover:text-yellow-400">
                Research
              </Link>
            </li>
            <li>
              <Link href="/programs/courses" className="hover:text-yellow-400">
                Programs
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-yellow-400">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-yellow-400">
                Events
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <p className="flex items-center gap-2 text-sm text-gray-800">
            <MapPin size={16} /> University Campus, Dhaka, Bangladesh
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-800">
            <Mail size={16} /> info@celgap.org
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-800">
            <Phone size={16} /> +880 1234 567890
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold text-lg mb-3 ml-3">Follow Us</h4>
          <div className="flex space-x-3">
            <Link
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0347A7] hover:text-white transition"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0347A7] hover:text-white transition"
            >
              <Twitter size={18} />
            </Link>
            <Link
              href="#"
              aria-label="LinkedIn"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0347A7] hover:text-white transition"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#0347A7] hover:text-white transition"
            >
              <Instagram size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#011a43] text-center py-3 text-sm text-gray-400">
        © {new Date().getFullYear()} Centre for Law, Governance & Policy. All
        rights reserved.
      </div>
    </footer>
  );
}
