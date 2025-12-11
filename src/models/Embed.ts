export interface Field {
    name: string;
    value: string;
    inline: boolean;
}

export interface EmbedData {
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
