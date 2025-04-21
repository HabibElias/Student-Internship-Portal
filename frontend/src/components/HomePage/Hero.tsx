import searchPhoto from "@/assets/HomePage/photos.svg";

const Hero = () => {
  return (
    <section
      id="home"
      className="mt-32 flex max-h-max min-h-screen flex-col items-center"
    >
      {/* Connect Message */}
      <div className="mb-[60px] w-max bg-[rgba(79,92,136,0.37)] px-[7px] py-[16px] text-center text-xs">
        Connect, Learn, Grow. Your Career Awaits. ✨
      </div>
      {/* Call to Action */}
      <div className="mb-[18px] text-center font-[Dm_Sans] text-4xl font-[900]">
        Empower Your Future. Discover <br />
        Your Perfect Job.
      </div>

      {/* the Action */}
      <div className="mb-[26px] text-center font-[Dm_Sans] text-base font-[300] opacity-60">
        Discover internships and jobs that align with <br />
        your passion and goals.
      </div>

      {/* Btns */}
      <div className="mb-[60px] flex items-center justify-center gap-[50px]">
        <a
          href="/register"
          className="cursor-pointer rounded-full border-[#7D7ADA] bg-[#7D7ADA] px-7 py-3 font-[Dm_Sans] text-lg font-bold tracking-tight text-white ring-4 ring-[#7D7ADA] duration-200 hover:bg-[#7D7ADA]/80"
        >
          Get Started
        </a>
      </div>

      {/* Image */}
      <img src={searchPhoto} className="hidden md:block" alt="search page" />
    </section>
  );
};

export default Hero;
