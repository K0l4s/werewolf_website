import type { EmbedData } from "./Embed";

export interface AlertModel {
    _id?: string,
    channelId: string,
    channelType: string,
    message: string,
    isEmbed: boolean,
    embedData: EmbedData,
    embed?: EmbedData,
}