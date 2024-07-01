
const supplements: ISupplement[] = [
  {
    name: "",
    price: 0, 
    gender: "both",
    preferences: [""],
    activityLevel: "string",
    healthGoals: [""],
    healthConcerns: [""],
    dietaryRestrictions: [""],
    allergies: [""],
    benefits: [""],
    tags: [""],
    form: "string",
    ageRange: {
      min: 0,
      max: 0,
    }
  }
];

export const seedSupplement = async () => {
  try {
    await Supplement.deleteMany({});
    await Supplement.insertMany;
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
