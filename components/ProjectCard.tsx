import Image from "next/image";
import { DIRECTUS_ASSETS_URL } from "@/lib/config";

interface ProjectDesc {
  name: string;
  description: string;
  tags: Array<{ name: string }>;
  thumbnail: string;
  href: string;
}

const ProjectCard = ({name, description, tags, thumbnail, href}: ProjectDesc) => {
  

  return (
    <a href={href} target="_blank" className="rounded-lg shadow-md p-4 hover:bg-primary hover:scale-105 hover:bg-opacity-10 transition duration-300 ease-in-out grid grid-cols-12 gap-3 mb-5">
        <div className="col-span-12 md:col-span-4 flex items-center justify-center">
            <Image
              src={`${DIRECTUS_ASSETS_URL}/${thumbnail}`}
              alt={name}
              width={300}
              height={200}
              className="rounded-lg shadow-md"
            />
        </div>
        <div className="col-span-12 md:col-span-8 text-center md:text-start">
            <h1 className="text-lg font-bold mb-2">{name}</h1>
            <p className="text-sm mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {tags.map((tag, index) => (
                <span key={index} className="bg-secondary text-secondary-content rounded-full px-2 py-1 text-[10px] font-bold">{tag.name}</span>
            ))}
            </div>
        </div>
    </a>
  )
}

export default ProjectCard