export const dynamic = "force-dynamic";

import { readItems } from "@directus/sdk";
import Image from "next/image";
import Link from "next/link";
import BlockParser from "./BlockParser";
import directus from "@/lib/directus";
import { DIRECTUS_ASSETS_URL } from "@/lib/config";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    // query to Directus
    const options = {
        filter: {
            slug: {
                _eq: slug,
            },
        },
    };
    const result = await directus.request(readItems("Portfolio_Blog", options));

    // console.log(result);

    if (result.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <h1 className="text-6xl font-bold">404</h1>
                <p className="text-2xl">Post not found</p>
                <Link href="/blog" className="mt-10 px-5 py-3 btn btn-secondary">
                    Return to Blogs
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="container py-10">
                <div className="mb-5 py-5 bg-primary bg-opacity-10 transition duration-300 ease-in-out">
                    <h1 className="text-3xl font-bold mb-3 text-center">{result[0].Title}</h1>
                    <div className="text-center">
                        <p>Published Date: {new Date(result[0].date_created).toDateString()}</p>
                        <p className="text-sm text-gray-500">
                            Last updated: {new Date(result[0].date_updated).toDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex justify-center mb-10">
                    {result[0].banner_image && (
                        <Image
                            src={`${DIRECTUS_ASSETS_URL}/${result[0].banner_image}`}
                            alt="blog image"
                            width={800}
                            height={500}
                            className="rounded-lg shadow-md"
                        />
                    )}
                </div>

                <BlockParser blocks={result[0].body.blocks} />
                <div className="mt-10 flex justify-end">
                    <a href="#" className="underline">
                        Back to Top
                    </a>
                </div>
            </div>
        </>
    );
};

export default page;
