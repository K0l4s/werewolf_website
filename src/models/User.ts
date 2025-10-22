
export interface User {
    id: string;
    username: string;
    premium: boolean;
    coin: number;
    level: number;
    token: number;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled: boolean;
    banner: string | null;
    accent_color: string | null;
    locale: string;
    verified: boolean;
    email: string | null;
    flags: number;
    premium_type: number;
    public_flags: number;
    global_name: string | null;
    display_name_styles: string | null;
    banner_color: string | null;
    avatar_decoration_data: AvatarDecorationData | null;
    primary_guild: PrimaryGuild | null;
    collectibles: Collectibles | null;
    clan: Clan | null;
    pronouns?: string;
}
export const defaultUser: User = {
    id: "",
    username: "",
    discriminator: "",
    avatar: null,
    bot: false,
    system: false,
    premium: false,
    coin: 0,
    level: 0,
    token: 0,
    mfa_enabled: false,
    banner: null,
    accent_color: null,
    locale: "",
    verified: false,
    email: null,
    flags: 0,
    premium_type: 0,
    public_flags: 0,
    global_name: null,
    display_name_styles: null,
    banner_color: null,
    avatar_decoration_data: null,
    primary_guild: null,
    collectibles: null,
    clan: null,
    pronouns: undefined,
};

interface AvatarDecorationData {
    asset: string;
    expires_at: string | null;
    sku_id: string;
}
interface PrimaryGuild {
    identity_guild_id: string;
    identity_enabled: boolean;
    tag: string;
    badge: string;
}
interface Collectibles {
    nameplate: Nameplate;
}
interface Nameplate {
    sku_id: string;
    asset: string;
    label: string;
    palette: string;
}
interface Clan {
    badge: string;
    identity_enabled: boolean;
    identity_guild_id: string;
    tag: string;
    clan_id?: string;
    clan_name?: string;
    clan_sku_id?: string;
    clan_asset?: string;
    clan_palette?: string;
    clan_label?: string;
    clan_expires_at?: string | null;
    clan_features?: string[];
    clan_member_count?: number;
    clan_description?: string;
    clan_owner_id?: string;
    clan_created_at?: string;
    clan_vanity_url_code?: string | null;
    clan_banner_color?: string | null;
    clan_banner_asset?: string | null;
    clan_banner_expires_at?: string | null;
    clan_public_flags?: number;
    clan_nitro_boost_level?: number;
    clan_nitro_boost_count?: number;
    clan_premium_subscription_count?: number;
    clan_premium_subscription_expiration?: string | null;
    clan_premium_subscription_sku_id?: string | null;
    clan_premium_subscription_sku_asset?: string | null;
    clan_premium_subscription_sku_label?: string | null;
    clan_premium_subscription_sku_palette?: string | null;
    clan_premium_subscription_sku_expires_at?: string | null;
    clan_premium_subscription_sku_features?: string[];
}
// [[Prototype]]