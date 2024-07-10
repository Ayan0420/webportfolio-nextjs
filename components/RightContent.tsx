import EXPERIENCES from "@/data/experiences"
import ExperienceCard from "./ExperienceCard"
import { FaArrowUpRightFromSquare } from "react-icons/fa6"
import ProjectCard from "./ProjectCard"
import dynamic from 'next/dynamic'
import Footer from "./Footer"

// To disable SSR for CursorEffectComponent
const TechStack = dynamic(() => import('@/components/TechStack'), { ssr: false })




const RightContent = () => {
  
  return (
    <>
      <section className="leading-loose text-center md:text-start" id="about">
        <h1 className="block md:hidden text-2xl font-bold mb-5 text-center md:text-start" id="projects-heading">About</h1>
          <p className="mb-3">
          Hi! I'm a passionate fullstack developer hailing from Misamis Oriental, Philippines. I specialize in <span className="font-bold text-primary">building seamless and robust web applications</span>, focusing on modern web development technologies. Alongside my development work, I have a strong interest in all things tech, particularly <span className="font-bold text-primary">cloud technologies</span> and <span className="font-bold text-primary">automation (CI/CD)</span>.
          </p>
          <p className="mb-3 ">
          Currently, I am working as an IT instructor, where I get to share my knowledge and inspire the next generation of tech enthusiasts. My enthusiasm for technology drives me to constantly learn and grow. I'm a fast learner, always open to new learning opportunities and eager to embrace new challenges and bring a high level of passion and dedication to everything I do.
          </p>
          
      </section>


      <section className="pt-[5rem]" id="work-experience">
        <h1 className="text-2xl font-bold mb-5 text-center md:text-start" id="work-experience-heading">Work Experiences</h1>
        {
          EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={index} year={exp.year} company={exp.company} title={exp.title} description={exp.description} techStack={exp.techStack} />
          ))
        }
        <div className="mt-5 text-center md:text-start">
          <a href="https://drive.google.com/file/d/1AIQY944s_GqpF5TQk5OMjJPUUuoQEkwA/view" target="_blank" className="btn btn-info">
            View Full Resume
            <FaArrowUpRightFromSquare className="mr-1" />
            
          </a>
        </div>
      </section>

      <section className="pt-[5rem]" id="tech-stack">
        <h1 className="text-2xl font-bold mb-5 text-center md:text-start" id="tech-stack-heading">
          Tech Stack
        </h1>
        <p className="mb-3">I use these technologies to build my projects.</p>
        <TechStack />
      </section>
      
      <section className="min-h-screen pt-[5rem]" id="projects">
          <h1 className="text-2xl font-bold mb-5 text-center md:text-start" id="project-heading">Projects</h1>
          
          <ProjectCard 
            name="Web Portfolio v2"
            description="Portfolio showcasing projects and blogs, built with Next.js, Tailwind CSS, and Daisy UI, with a Node.js backend. Deployed using Docker and GitHub Actions on AWS."
            tags={["Next.js", "Tailwind CSS", "Daisy UI", "Node.js", "Docker", "Github Actions", "AWS" ]}
            thumbnail="/images/portfolio-website.png"
            href="https://github.com/Ayan0420/webportfolio-nextjs"
          />

          <ProjectCard 
            name="MoreTech Online - ECommerce App"
            description="Fullstack Ecommerce application created with the MERN stack deployed on Vercel."
            tags={["Bootstrap CSS","MongoDB", "Express.js", "React.js", "Node.js", "Vercel"]}
            thumbnail="/images/moretech.png"
            href="https://cpstn-3-e-commerce-website.vercel.app/"
          />

          <ProjectCard 
            name="Ecommerce Backend System"
            description="Ecommerce backend system created with the NodeJS, ExpressJs, MongoDB, and JWT for authentication deployed on Render."
            tags={["MongoDB", "Node.js", "Express.js", "JWT", "Render" ]}
            thumbnail="/images/ecommerce-api.png"
            href="https://github.com/Ayan0420/Ecommerce-API-Node-Express-MongoDB"
          />


          
      </section>
      
      <section className="min-h-screen pt-[5rem]" id="blog">
          <h1 className="text-2xl font-bold mb-3 text-center md:text-start" id="blog-heading">Blogs</h1>
          
          
      </section>

      <section>
        <Footer />
      </section>
    </>

  )
}

export default RightContent