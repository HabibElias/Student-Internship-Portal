const featuresStudents: { icons?: string; feature: string; desc: string }[] = [
  {
    icons: "/assets/Frame-3.svg",
    feature: "Find Job that match your interest",
    desc: "Use smart filters to discover the perfect match for your campaign.",
  },
  {
    icons: "/assets/Frame-4.svg",
    feature: "Save Time, Maximize Impact",
    desc: "Skip the search stress, connect with the right influencer in just a few clicks.",
  },
  {
    icons: "/assets/Frame-5.svg",
    feature: "Advance Your Career",
    desc: "Get discovered by recruiters and explore new opportunities.",
  },
  {
    icons: "/assets/Frame-6.svg",
    feature: "Professional",
    desc: "You can Grow in your profession by joining companies with your desired job preference",
  },
];

const featureComp: { icons?: string; feature: string; desc: string }[] = [
  {
    icons: "/assets/Frame.svg",
    feature: "Unlock More Brand Deals",
    desc: "Get discovered by Students actively looking for Companies like you.",
  },
  {
    icons: "/assets/Frame-1.svg",
    feature: "Perfect Job Matches",
    desc: "Work with students that align with you.",
  },
  {
    icons: "/assets/Frame-2.svg",
    feature: "Grow More",
    desc: "Build a strong company, get good rated students, and increase your work force.",
  },
];

const Feature = () => {
  return (
    <section id="features">
      <div className="mt-30 mb-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold">FEATURES FOR</h1>
        <h2 className="my-12 text-xl font-[400] text-white/80">STUDENTS</h2>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {featuresStudents.map(({ icons, feature, desc }, index) => {
          return (
            <div
              key={index}
              className="flex w-[14rem] flex-col items-center space-y-[0.9rem] text-center"
            >
              <div className="">
                <img src={icons} alt={feature} />
              </div>
              <div className="font-[montserrat] text-2xl font-[600]">
                {feature}
              </div>
              <div className="text-base text-[rgba(255,255,255,0.40)]">
                {desc}
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-12 flex flex-col items-center">
        <h2 className="text-xl font-[400] text-white/80">COMPANIES</h2>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-10">
        {featureComp.map(({ icons, feature, desc }, index) => {
          return (
            <div
              key={index}
              className="flex w-[14rem] flex-col items-center space-y-[0.9rem] text-center"
            >
              <div className="">
                <img src={icons} alt={feature} />
              </div>
              <div className="font-[montserrat] text-2xl font-[600]">
                {feature}
              </div>
              <div className="text-base text-[rgba(255,255,255,0.40)]">
                {desc}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Feature;
