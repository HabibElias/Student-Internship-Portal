const jobsElement = document.querySelector(".jobs");

// filter logic variable values
const searchName = document.querySelector("#search"); // search job title
const searchInternship = document.querySelector("#interJob"); // search if job is internship or not
const searchJobTime = document.querySelector("#jobTime"); // search if job is part-time or full-time
const searchPostedTime = document.querySelector("#pTime"); // search if job posted time is within range
const searchDepartment = document.querySelector("#dept"); // search job departments

const searchBtn = document.querySelector(".search-btn");

// all the jobs

// all the jobs are located here
const jobs = [
  {
    title: "Junior Developer",
    fullTime: true,
    internship: false,
    remote: true,
    level: "Mid-level",
    skills: ["JavaScript", "HTML", "CSS", "React", "Node.js", "Git"],
    dept: ["Software Development", "Web Development", "IT"],
    description:
      "We are seeking a passionate Junior Developer to join our team. The ideal candidate will have a strong foundation in programming and a desire to learn and grow in a collaborative environment. You will work on various projects, contributing to both front-end and back-end development.",
    posted: new Date("2025-01-15"),
    deadline: new Date("2025-01-29"),
  },
  {
    title: "Software Engineer",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Entry-Level",
    skills: ["Java", "Spring Boot", "Microservices"],
    dept: ["Software Engineering", "IT"],
    description:
      "We are looking for a Software Engineer to join our team. The ideal candidate will have a strong foundation in Java and experience with Spring Boot. You will work on developing and maintaining microservices.",
    posted: new Date("2024-11-23"),
    deadline: new Date("2025-01-20"),
  },
  {
    title: "Graphic Designer",
    fullTime: false,
    internship: true,
    remote: true,
    level: "Internship",
    skills: ["Adobe Photoshop", "Illustrator", "InDesign"],
    dept: ["Design", "Marketing"],
    description:
      "We are seeking a creative Graphic Designer intern to join our team. You will be responsible for creating visual content for our marketing campaigns. The ideal candidate will have a strong portfolio showcasing their design skills.",
    posted: new Date("2024-04-23"),
    deadline: new Date("2025-02-01"),
  },
  {
    title: "Data Analyst",
    fullTime: true,
    internship: false,
    remote: true,
    level: "Mid-Level",
    skills: ["SQL", "Python", "Data Visualization"],
    dept: [
      "Software Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    description:
      "We are looking for a skilled Data Analyst to join our team. You will be responsible for analyzing large datasets to provide actionable insights. The ideal candidate will have experience with data visualization tools and a strong analytical mindset.",
    posted: new Date("2024-09-23"),
    deadline: new Date("2025-02-15"),
  },
  {
    title: "Project Manager",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Senior-Level",
    skills: ["Project Management", "Agile", "Scrum"],
    dept: [
      "Software Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    description:
      "We are seeking an experienced Project Manager to lead our team. The ideal candidate will have a proven track record of managing complex projects and delivering results on time and within budget. Strong leadership and communication skills are essential.",
    posted: new Date("2024-12-20"),
    deadline: new Date("2025-05-20"),
  },
  {
    title: "UX Designer",
    fullTime: false,
    internship: false,
    remote: true,
    level: "Mid-Level",
    skills: ["UX Design", "Wireframing", "Prototyping"],
    dept: [
      "Software Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    description:
      "We are looking for a creative UX Designer to join our team. You will be responsible for designing user-friendly interfaces and improving the overall user experience. The ideal candidate will have a strong portfolio showcasing their design skills.",
    posted: new Date("2024-05-28"),
    deadline: new Date("2025-06-25"),
  },
  {
    title: "Marketing Specialist",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Mid-Level",
    skills: ["Digital Marketing", "SEO", "Content Creation"],
    dept: [
      "Software Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
    ],
    description:
      "We are seeking a talented Marketing Specialist to join our team. You will be responsible for developing and executing marketing strategies to promote our products and services. The ideal candidate will have experience in digital marketing and a creative mindset.",
    posted: new Date("2024-12-07"),
    deadline: new Date("2025-05-28"),
  },
  {
    title: "Electrical Engineer",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Entry-Level",
    skills: ["Circuit Design", "MATLAB", "AutoCAD"],
    dept: ["Electrical Engineering"],
    description:
      "We are seeking an Electrical Engineer to join our team. The ideal candidate will have experience in circuit design and a strong understanding of electrical systems.",
    posted: new Date("2025-01-01"),
    deadline: new Date("2025-03-29"),
  },
  {
    title: "Mechanical Engineer",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Mid-Level",
    skills: ["SolidWorks", "Thermodynamics", "Project Management"],
    dept: ["Mechanical Engineering"],
    description:
      "We are looking for a Mechanical Engineer to join our team. The ideal candidate will have experience with SolidWorks and a strong understanding of thermodynamics.",
    posted: new Date("2025-01-12"),
    deadline: new Date("2025-02-01"),
  },
  {
    title: "Civil Engineer",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Senior-Level",
    skills: ["AutoCAD", "Project Management", "Structural Analysis"],
    dept: ["Civil Engineering"],
    description:
      "We are seeking a Senior Civil Engineer to lead our team. The ideal candidate will have extensive experience in structural analysis and project management.",
    posted: new Date("2025-01-01"),
    deadline: new Date("2025-02-29"),
  },
  {
    title: "Chemical Engineer",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Mid-Level",
    skills: ["Process Design", "Chemical Analysis", "Safety Protocols"],
    dept: ["Chemical Engineering"],
    description:
      "We are looking for a Chemical Engineer to join our team. The ideal candidate will have experience in process design and a strong understanding of chemical safety protocols.",
    posted: new Date("2025-01-14"),
    deadline: new Date("2025-02-20"),
  },
  {
    title: "Biomedical Engineer",
    fullTime: true,
    internship: false,
    remote: false,
    level: "Entry-Level",
    skills: ["Medical Devices", "Biomaterial", "Regulatory Compliance"],
    dept: ["Biomedical Engineering"],
    description:
      "We are seeking a Biomedical Engineer to join our team. The ideal candidate will have experience with medical devices and a strong understanding of biomaterials.",
    posted: new Date("2025-01-1"),
    deadline: new Date("2025-4-22"),
  },
];

const filter = () => {
  const filteredJobs = jobs.filter((job) => {
    const matchesSearchName = searchName.value
      ? job.title.toLowerCase().includes(searchName.value.toLowerCase())
      : true;
    const matchesInternship =
      searchInternship.value === "all"
        ? true
        : job.internship === (searchInternship.value === "internship")
        ? true
        : false;
    const matchesJobTime =
      searchJobTime.value === "all"
        ? true
        : job.fullTime === (searchJobTime.value === "fullTime")
        ? true
        : false;
    const matchesPostedTime =
      searchPostedTime.value === "all"
        ? true
        : (new Date() - job.posted) / (1000 * 60 * 60 * 24) <=
          parseInt(searchPostedTime.value)
        ? true
        : false;
    const matchesDepartment =
      searchDepartment.value === "all"
        ? true
        : job.dept.includes(searchDepartment.value)
        ? true
        : false;

    console.log(matchesDepartment);

    return (
      matchesSearchName &&
      matchesInternship &&
      matchesJobTime &&
      matchesPostedTime &&
      matchesDepartment
    );
  });

  if (filteredJobs.length === 0) {
    jobsElement.innerHTML = `

      <div class="img">
      <img src="../../assets/images/notFound.png" alt="search not found"/>
      <p>Search Not Found</p>
      </div>
      
    `;
  } else {
    jobsElement.innerHTML = "";
    filteredJobs.forEach((job) => {
      jobsElement.appendChild(createJobElement(job));
    });
  }
};

// searchName.addEventListener("input", filter);
// searchInternship.addEventListener("change", filter);
// searchJobTime.addEventListener("change", filter);
// searchPostedTime.addEventListener("change", filter);
// searchDepartment.addEventListener("change", filter);

function createJobElement(job) {
  const jobElement = document.createElement("div");
  jobElement.classList.add("job");

  jobElement.innerHTML = `
    <div class="logo"></div>
    <div class="title">
    <h2>${job.title}</h2>
    <div class="keywords">
    <p>${job.remote ? "Remote" : "On-site"}</p>
    <p>${job.fullTime ? "Full-time" : "Part-time"}</p>
    <p>${job.level}</p>
    </div>
    </div>
    <div class="description">
    <h3>Description</h3>
    <p>${job.description}</p>
            <button class="more">Read More</button>
        </div>
        <div class="details">
        <div class="detail">
        <div class="detailTitle">
        <span class="material-symbols-rounded">flag</span>
        <p>Posted</p>
        </div>
        <div class="detailDescription">${job.posted.toDateString()}</div>
        </div>
        <div class="detail">
        <div class="detailTitle">
        <span class="material-symbols-rounded">work</span>
        <p>Skills</p>
        </div>
        <div class="detailDescription">${job.skills.join(", ")}</div>
        </div>
        <div class="detail">
        <div class="detailTitle">
        <span class="material-symbols-rounded">schedule</span>
        <p>Deadline</p>
        </div>
        <div class="detailDescription">${job.deadline.toDateString()}</div>
        </div>
        <div class="detail">
        <div class="detailTitle">
        <span class="material-symbols-rounded">school</span>
        <p>Dept</p>
        </div>
        <div class="detailDescription">${
          job.dept.join(", ").length <= 41
            ? job.dept.join(", ")
            : job.dept.join(", ").slice(0, 41) + "..."
        }</div>
            </div>
        </div>
        <div class="btns">
        <a href="../applicationPage/application.html" class="apply">
        <span class="material-symbols-rounded"> attach_file </span>
        Apply
        </a>
        <a href="../jobPage/job.html">
        <span class="material-symbols-rounded"> open_in_full </span>
        See More
        </a>
        </div>
        `;

  return jobElement;
}

jobs.forEach((e) => {
  jobsElement.appendChild(createJobElement(e));
});

searchBtn.addEventListener("click", filter);
