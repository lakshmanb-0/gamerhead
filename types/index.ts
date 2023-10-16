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

// category Api 
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
export type TCategoryDataProps = {
  gameData: TGameData[];
  heading: string;
};

// header Api 
export type THeaderApiType = {
  featured_win: TGameData[];
};

// single Game api 
export type TApiDetailsApi = {
  [key: string]: {
    success: boolean;
    data: TSingleGameData;
  };
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

// dlc Api 
export type TDlcProps = {
  dlc: TDlcDataProps[];
};
export type TDlcDataProps = {
  id: number,
  name: string,
  header_image: string,
  price_overview: {
    currency: string,
    initial: number,
    final: number,
    discount_percent: number
  },
  platforms: {
    windows: boolean,
    mac: boolean,
    linux: boolean
  },
  release_date: {
    steam: string
  },
  controller_support: string
}

// News Api 
export type TNewsData = {
  gid: string,
  title: string,
  url: string,
  is_external_url: boolean,
  author: string,
  contents: string,
  feedlabel: string,
  date: number,
  feedname: string,
  feed_type: number,
  appid: number
}

// Review Api 

export type TReviewData = {
  recommendationid: string,
  author: {
    steamid: string,
    num_games_owned: number,
    num_reviews: number,
    playtime_forever: number,
    playtime_last_two_weeks: number,
    playtime_at_review: number,
    last_played: number
  },
  language: string,
  review: string,
  timestamp_created: number,
  timestamp_updated: number,
  voted_up: boolean,
  votes_up: number,
  votes_funny: number,
  weighted_vote_score: string,
  comment_count: number,
  steam_purchase: boolean,
  received_for_free: boolean,
  written_during_early_access: boolean,
  hidden_in_steam_china: boolean,
  steam_china_location: string
}