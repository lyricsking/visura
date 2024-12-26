export type GeneralSettingsOptions = {
  homepageDisplay: {
    type: HomepageType;
    path: string;
  };
};

export const homepageDisplayType = ["static", "plugin"] as const;
export type HomepageType = (typeof homepageDisplayType)[number];

export type DisplayOptions = {
  homepage: {
    type: HomepageType;
    path: string;
  };
};
