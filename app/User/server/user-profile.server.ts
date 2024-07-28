// Create User Profile
const createUserProfile = async (
  userId: Types.ObjectId,
  firstName: string,
  lastName: string,
  phone: string,
  preferences: IUserProfile['preferences']
) => {
  const newUserProfile = new UserProfileModel({ userId, firstName, lastName, phone, preferences });
  return await newUserProfile.save();
};

// Read User Profile
const getUserProfileByUserId = async (userId: Types.ObjectId) => {
  return await UserProfileModel.findOne({ userId }).exec();
};

// Update User Profile
const updateUserProfile = async (userId: Types.ObjectId, updateData: Partial<IUserProfile>) => {
  return await UserProfileModel.findOneAndUpdate({ userId }, updateData, { new: true }).exec();
};

// Delete User Profile
const deleteUserProfile = async (userId: Types.ObjectId) => {
  return await UserProfileModel.findOneAndDelete({ userId }).exec();
};
