import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-[#4F4C98] p-12 text-white">
      {/* Logo and Links */}
      <div className="flex flex-wrap">
        {/* Logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Links */}
        <div className="grid flex-1 grid-cols-2 gap-y-8 md:grid-cols-3">
          {/* Product Links */}
          <div className="flex flex-col gap-4 text-xs">
            <h2 className="opacity-70">Product</h2>
            <a href="#" className="hover:underline">
              Overview
            </a>
            <a href="#" className="hover:underline">
              Features
            </a>
            <a href="#" className="hover:underline">
              Pricing
            </a>
            <a href="#" className="hover:underline">
              Tutorials
            </a>
          </div>
          {/* Company Links */}
          <div className="flex flex-col gap-4 text-xs">
            <h2 className="opacity-70">Company</h2>
            <a href="#" className="hover:underline">
              About us
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
            <a href="#" className="hover:underline">
              Press
            </a>
            <a href="#" className="hover:underline">
              News
            </a>
          </div>
          {/* Resource Links */}
          <div className="flex flex-col gap-4 text-xs">
            <h2 className="opacity-70">Resources</h2>
            <a href="#" className="hover:underline">
              Blog
            </a>
            <a href="#" className="hover:underline">
              Newsletters
            </a>
            <a href="#" className="hover:underline">
              Help center
            </a>
            <a href="#" className="hover:underline">
              Support
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-[2px] w-full bg-white/20"></div>

      {/* Rights */}
      <div className="flex flex-wrap justify-between gap-y-4 text-center">
        <h2 className="opacity-70">Save countless hours searching for a Job</h2>
        <h2 className="font-[Montserrat] text-base font-[500]">
          @2025 StudentJobPortal. All rights reserved
        </h2>
      </div>
    </footer>
  );
};

export default Footer;
