export type TGameData = {
  id: number;
  type: number;
  name: string;
  discounted: boolean;
  discount_percent: number | null;
  original_price: number | null;
  final_price: number | null;
  currency: string;
  large_capsule_image: string;
  small_capsule_image: string;
  windows_available: boolean;
  mac_available: boolean;
  linux_available: boolean;
  streamingvideo_available: boolean;
  header_image: string;
  controller_support?: string;
};

export type TGameDataProps = {
  gameData: TGameData[];
};

export type TCategoryApiType = {
  specials: {
    id: string;
    name: string;
    items: TGameData[];
  };
  top_sellers: {
    id: string;
    name: string;
    items: TGameData[];
  };
  coming_soon: {
    id: string;
    name: string;
    items: TGameData[];
  };
  new_releases: {
    id: string;
    name: string;
    items: TGameData[];
  };
};

export type THeaderApiType = {
  featured_win: TGameData[];
};

export type TApiDetailsApi = {
  [key: string]: {
    success: boolean;
    data: TSingleGameData;
  };
};

export type TCategoryDataProps = {
  gameData: TGameData[];
  heading: string;
};

export type TSingleGameData = {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support?: string;
  dlc?: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  reviews: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: { [key: string]: string };
  mac_requirements: { [key: string]: string };
  linux_requirements?: { [key: string]: string };
  legal_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  packages: number[];
  platforms: {
    [key: string]: boolean;
  };
  background_raw: string;
};

export type TDlcProps = {
  gameData: TSingleGameData[];
};
