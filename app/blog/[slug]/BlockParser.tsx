import CodeHighlighter from "./CodeHighlighter";
import { DIRECTUS_API_URL } from "@/lib/config";

interface Block {
    id: string;
    type: string;
    data: any;
}

interface Props {
    blocks: Block[];
}

const BlockParser: React.FC<Props> = ({ blocks }) => {

    //   for table of contents
    const headings = blocks.filter((block) => block.type === "header");

    return (
        <div className="prose prose-lg max-w-none">
            {headings.length > 0 && (
                <>
                <nav className="p-5 rounded">
                    <h2 className="mt-0 mb-2">Table of Contents</h2>
                    <ul className="space-y-1 list-disc list-inside">
                        {headings.map((heading) => (
                            <li key={heading.id} className=" hover:underline">
                                <a href={`#${heading.id}`} dangerouslySetInnerHTML={{ __html: heading.data.text }}></a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <hr />
                </>
            )}
            {blocks.map((block) => {
                switch (block.type) {
                    case "paragraph":
                        return (
                            <p
                                key={block.id}
                                className="ml-6 text-primary"
                                dangerouslySetInnerHTML={{ __html: block.data.text }}
                            >
                                {/* {block.data.text} */}
                            </p>
                        );

                    case "header":
                        const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
                        return (
                            <HeaderTag
                                id={block.id}
                                key={block.id}
                                className="font-bold"
                                dangerouslySetInnerHTML={{ __html: block.data.text }}
                            >
                                {/* {block.data.text} */}
                            </HeaderTag>
                        );

                    case "nestedlist":
                        const renderList = (items: any[]) => (
                            <ul className="list-disc list-inside text-primary">
                                {items.map((item: any, i: number) => (
                                    <li key={i}>
                                        <span dangerouslySetInnerHTML={{ __html: item.content }} />
                                        {item.items && renderList(item.items)}
                                    </li>
                                ))}
                            </ul>
                        );
                        return <div key={block.id}>{renderList(block.data.items)}</div>;

                    case "code":
                        return (
                            <CodeHighlighter block={block} />
                        );

                    case "image":
                        return (
                            <figure key={block.id} className="flex flex-col items-center">
                                <img
                                    src={`${DIRECTUS_API_URL}${block.data.file.url}`}
                                    alt={block.data.caption}
                                    className="max-w-full h-auto"
                                />
                                {block.data.caption && (
                                    <figcaption className="text-sm text-gray-500 mt-2">
                                        {block.data.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );

                    case "table":
                        return (
                            <table key={block.id} className="table-auto border border-gray-300">
                                <tbody>
                                    {block.data.content.map((row: string[], rowIndex: number) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell: string, cellIndex: number) => (
                                                <td key={cellIndex} className="border px-4 py-2">
                                                    <span
                                                        dangerouslySetInnerHTML={{ __html: cell }}
                                                    ></span>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );

                    case "quote":
                        return (
                            <blockquote
                                key={block.id}
                                className="border-l-4 border-gray-500 pl-4 italic text-gray-700"
                            >
                                <p dangerouslySetInnerHTML={{ __html: block.data.text }}></p>
                                {block.data.caption && (
                                    <footer className="text-sm mt-1">— {block.data.caption}</footer>
                                )}
                            </blockquote>
                        );

                    case "checklist":
                        return (
                            <ul key={block.id} className="space-y-2">
                                {block.data.items.map((item: any, idx: number) => (
                                    <li key={idx} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            readOnly
                                            className="mr-2"
                                        />
                                        <span
                                            dangerouslySetInnerHTML={{ __html: item.text }}
                                        ></span>
                                    </li>
                                ))}
                            </ul>
                        );

                    case "raw":
                        return (
                            <div
                                key={block.id}
                                dangerouslySetInnerHTML={{ __html: block.data.html }}
                            />
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default BlockParser;
