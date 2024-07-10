export const Gender = {
  male: "male",
  female: "female",
  both: "both",
} as const;
export type Gender = (typeof Gender)[keyof typeof Gender];

export interface ISupplement {
  name: string;
  price: number;
  gender: Gender;
  preferences: string[];
  activityLevel: string;
  healthGoals: string[];
  healthConcerns: string[];
  dietaryRestrictions?: string[];
  allergies?: string[];
  benefits: string[];
  tags: string[];
  form: string;
  ageRange?: {
    min: number;
    max: number;
  };
}
