import Feature from "@/components/HomePage/Feature";
import Hero from "@/components/HomePage/Hero";
import Numbers from "@/components/HomePage/Numbers";

const HomePage = () => {
  
  return (
    <div className="flex w-full flex-col justify-center bg-[url(@/assets/HomePage/Grid1.svg)] bg-fixed text-white">
      {/* Hero Section */}
      <Hero />

      {/* Numbers */}
      <Numbers />

      <section id="about">
        <div className="mx-auto max-w-[700px] px-3 md:text-start">
          <h1 className="mb-3 text-center font-[sora] text-xl font-bold">
            Student Internship & Job Matching Portal
          </h1>
          <p className="text-center text-base text-[#CBD1FB]">
            The Job and Students Matching Portal is a web application designed
            to bridge the gap between employers seeking talent and students
            searching for job opportunities. This platform facilitates a
            seamless connection by allowing students to create profiles
            showcasing their skills, education, and experiences while employers
            can post job openings and search for suitable candidates.
          </p>
        </div>
      </section>

      <Feature />
    </div>
  );
};

export default HomePage;
