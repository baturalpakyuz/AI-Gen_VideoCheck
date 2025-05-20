import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-50 backdrop-blur-2xl text-black py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left text-sm mb-4 md:mb-0">
          © 2024 AI-Generated Video Detector. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <Link href="#privacy" className="hover:text-blue-400 text-sm">
            Privacy Policy
          </Link>
          <Link href="#terms" className="hover:text-blue-400 text-sm">
            Terms of Service
          </Link>
          <Link href="#contact" className="hover:text-blue-400 text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
