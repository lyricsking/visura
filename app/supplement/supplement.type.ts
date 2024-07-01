type Gender = 
  "male"|
  "female"|
  "both";

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
  form?: string;
  ageRange?: {
    min: number;
    max: number;
  };
}