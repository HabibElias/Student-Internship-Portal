import Logo from "../Logo";

const Footer = () => {
  return (
    <div className="flex gap-4 items-center py-12 justify-center flex-wrap px-4">
      <Logo onFooter />
      <p className="rights text-xs font-bold">&copy;2024</p>
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        User Agreement
      </a>
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        {" "}
        Privacy Policy
      </a>{" "}
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        Community
      </a>
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        Guidelines
      </a>{" "}
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        Cookie Policy
      </a>
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        Copyright Policy
      </a>{" "}
      <a
        href=""
        className="text-xs font-light tracking-[0.55px] hover:underline"
      >
        Send Feedback
      </a>
    </div>
  );
};

export default Footer;
