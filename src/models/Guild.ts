export interface Guild {
    id: String,
    name: String,
    icon: String,
    banner: String,
    owner: boolean,
    hasBot: boolean,
    admin:boolean,
    manager:boolean,
}

export interface ChannelConfig {
  channelId: string;
  channelType: "welcome" | "goodbye" | "booster";
  title: string;
  description: string;
  imageUrl: string;
}

export interface GuildConfig {
  guildId: string;
  channels: ChannelConfig[];
  gaChannelId: string | "";
  gaReqChannelId: string | "";
  gaResChannelId: string | "";
  isChannelEnabled: boolean;
  isEmbedEnabled: boolean;
  isStreakEnabled: boolean;
  isLinkDisable: boolean;
  isInviteDisable: boolean;
  isSpamMessageDisable: boolean;
}