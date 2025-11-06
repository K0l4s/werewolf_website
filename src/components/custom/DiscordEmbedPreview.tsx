import React from "react";

interface Field {
    name: string;
    value: string;
    inline: boolean;
}

interface EmbedData {
    // author?: string;
    title?: string;
    description?: string;
    color?: string;
    footer?: string;
    footerIcon?: string;
    timestamp?: boolean;
    image?: string;
    thumbnail?: string;
    fields?: Field[];
}

interface Props {
    embed: EmbedData;
}

export default function DiscordEmbedPreview({ embed }: Props) {
    const parseDiscordFormatting = (text: string) => {
        if (!text) return "";

        let formatted = text;

        // Mentions
        formatted = formatted
            .replace(
                /<@&(\d+)>/g,
                `<span class='text-[#00AFF4] hover:underline cursor-pointer'>@role-$1</span>`
            )
            .replace(
                /<@!?(\d+)>/g,
                `<span class='text-[#00AFF4] hover:underline cursor-pointer'>@user-$1</span>`
            )
            .replace(
                /<#(\d+)>/g,
                `<span class='text-[#00AFF4] hover:underline cursor-pointer'>#channel-$1</span>`
            );

        // Emojis
        formatted = formatted.replace(
            /<(a?):(\w+):(\d+)>/g,
            (_, animated, name, id) => {
                const ext = animated ? "gif" : "png";
                const url = `https://cdn.discordapp.com/emojis/${id}.${ext}`;
                return `<img src="${url}" alt="${name}" class="inline w-6 h-6 align-text-bottom" />`;
            }
        );

        // Formatting
        formatted = formatted
            .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>") // bold italic
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold
            .replace(/\*(.*?)\*/g, "<em>$1</em>") // italic
            .replace(/__(.*?)__/g, "<u>$1</u>") // underline
            .replace(/~~(.*?)~~/g, "<s>$1</s>") // strikethrough
            .replace(/\|\|(.*?)\|\|/g, `<span class="spoiler" data-hidden="true">$1</span>`);

        return formatted;
    };

    const handleSpoilerClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("spoiler")) {
            const hidden = target.getAttribute("data-hidden") === "true";
            target.setAttribute("data-hidden", hidden ? "false" : "true");
        }
    };

    // Hàm để nhóm fields thành các hàng inline
    const groupFields = (fields: Field[]) => {
        const groups: Field[][] = [];
        let currentGroup: Field[] = [];
        
        fields.forEach((field) => {
            if (field.inline) {
                // Nếu field là inline, thêm vào nhóm hiện tại
                currentGroup.push(field);
            } else {
                // Nếu field không phải inline
                if (currentGroup.length > 0) {
                    // Đẩy nhóm inline hiện tại trước
                    groups.push([...currentGroup]);
                    currentGroup = [];
                }
                // Đẩy field không inline như một nhóm riêng
                groups.push([field]);
            }
        });
        
        // Đẩy nhóm inline cuối cùng nếu còn
        if (currentGroup.length > 0) {
            groups.push(currentGroup);
        }
        
        return groups;
    };

    return (
        <div
            className="border-l-4 rounded-lg p-4 relative bg-[#2f3136]"
            style={{ borderColor: embed.color }}
            onClick={handleSpoilerClick}
        >
            {/* Author */}
            {/* {embed.author && (
                <div className="text-sm text-white font-bold mb-1 flex items-center gap-2">
                    {embed.author}
                </div>
            )} */}

            {/* Title */}
            {embed.title && (
                <div className="text-lg font-semibold text-white mb-2">
                    {embed.title}
                </div>
            )}

            {/* Description */}
            {embed.description && (
                <div
                    className="text-gray-300 whitespace-pre-wrap mb-2"
                    dangerouslySetInnerHTML={{
                        __html: parseDiscordFormatting(embed.description),
                    }}
                />
            )}

            {/* Fields */}
            {embed.fields?.length ? (
                <div className="space-y-2 mt-2">
                    {groupFields(embed.fields).map((fieldGroup, groupIndex) => (
                        <div 
                            key={groupIndex} 
                            className={`
                                ${fieldGroup.length > 1 || fieldGroup[0].inline 
                                    ? "grid grid-cols-1 md:grid-cols-3 gap-2" 
                                    : "block"
                                }
                            `}
                        >
                            {fieldGroup.map((field, fieldIndex) => (
                                <div 
                                    key={fieldIndex} 
                                    className=" p-2 rounded"
                                >
                                    <div className="font-semibold text-white">{field.name}</div>
                                    <div
                                        className="text-gray-300"
                                        dangerouslySetInnerHTML={{
                                            __html: parseDiscordFormatting(field.value),
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : null}

            {/* Image */}
            {embed.image && (
                <img
                    src={embed.image}
                    alt="embed"
                    className="rounded-lg mt-4 w-full max-h-60 object-cover"
                />
            )}

            {/* Thumbnail */}
            {embed.thumbnail && (
                <img
                    src={embed.thumbnail}
                    alt="thumb"
                    className="absolute top-4 right-4 w-16 h-16 rounded-lg object-cover"
                />
            )}

            {/* Footer */}
            {(embed.footer || embed.timestamp) && (
                <div className="text-xs text-gray-500 mt-4 border-t border-gray-700 pt-2 flex items-center gap-2">
                    {embed.footerIcon && (
                        <img
                            src={embed.footerIcon}
                            alt="footer-icon"
                            className="w-4 h-4 rounded-full"
                        />
                    )}
                    <span>{embed.footer}</span>
                    {embed.timestamp && (
                        <span className="ml-auto text-gray-600">
                            {new Date().toLocaleString()}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}