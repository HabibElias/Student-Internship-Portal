import searchPhoto from "@/assets/HomePage/photos.svg";

const HomePage = () => {
  return (
    <div className="flex w-full flex-col justify-center bg-[url(@/assets/HomePage/Grid1.svg)] bg-fixed text-white">
      {/* Hero Section */}
      <section className="mt-32 flex max-h-max min-h-screen flex-col items-center">
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
          <button className="cursor-pointer rounded-full border-[#7D7ADA] bg-[#7D7ADA] px-7 py-3 font-[Dm_Sans] text-lg font-semibold text-white ring-4 ring-[#7D7ADA] duration-200 hover:bg-[#7D7ADA]/80">
            Sign In
          </button>
          <button className="cursor-pointer rounded-full bg-transparent px-6 py-3 font-[Dm_Sans] text-lg font-semibold text-[#7D7ADA] ring-4 ring-[#7D7ADA] duration-200 hover:bg-[#7D7ADA] hover:text-white">
            Log In
          </button>
        </div>

        {/* Image */}
        <img src={searchPhoto} className="hidden md:block" alt="search page" />
      </section>

      {/* Numbers */}
      <section className="-mt-36 flex min-h-screen flex-col items-center justify-start">
        <div className="flex items-center justify-center flex-wrap gap-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold">6,000</h2>
            <h3 className="text-3xl font-semibold opacity-80">
              Active Students
            </h3>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold">1,000</h2>
            <h3 className="text-3xl font-semibold opacity-80">
              Jobs Posted
            </h3>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default HomePage;
