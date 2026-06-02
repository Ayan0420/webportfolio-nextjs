export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import BlogCardFull from "./BlogCardFull";

import directus from "@/lib/directus";
import { DIRECTUS_ASSETS_URL } from "@/lib/config";
import { readItems } from "@directus/sdk";

const Blog = async () => {
    // query to Directus
    const options = {
        fields: ["id", "Title", "preview_text", "banner_image", "slug", "status", "date_updated", "date_created"],
        sort: ["-date_created"],
    };
    
    const blogs = await directus.request(readItems("Portfolio_Blog", options));

    // console.log(blogs);

    function createPreview(text: string, maxLength = 100) {
        if (text.length <= maxLength) return text;

        return text.slice(0, maxLength).trim() + "...";
    }

    return (
        <>
            <h1 className="text-3xl font-bold mb-3 text-center md:text-start" id="blog-heading">
                All Blogs
            </h1>
            <p className="mb-10 text-center md:text-start">
                Stuff that I like to share and write about.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {blogs.map((blog) => {
                    if (blog.status !== "published") return;

                    return (
                        <Link href={`/blog/${blog.slug}`} key={blog.id} className="col-span-1" prefetch={false}>
                            <BlogCardFull
                                title={blog.Title}
                                description={createPreview(blog.preview_text)}
                                date={blog.date_created}
                                thumbnail={
                                    blog.banner_image
                                        ? `${DIRECTUS_ASSETS_URL}/${blog.banner_image}`
                                        : `https://placehold.co/600x400/070e2b/dca54c?font=lora&text=${blog.Title.split(" ")[0].slice(0, -1)}`
                                }
                            />
                        </Link>
                    );
                })}
            </div>
            <div className="mt-10 flex justify-end">
                <a href="#" className="underline">
                    Back to Top
                </a>
            </div>
        </>
    );
};

export default Blog;
