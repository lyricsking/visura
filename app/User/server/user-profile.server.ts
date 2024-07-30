type CreateUserProfileProps = {
  userId: Types.ObjectId,
  firstName: string,
  lastName: string,
  phone: string,
  photo?: string,
  preferences: IUserProfile['preferences']
}
// Create User Profile
const createUserProfile = async (props: CreateUserProfileProps) => {
  const { userId, firstName, lastName, phone, photo, preferences } = props;
  
  const newUserProfile = new UserProfileModel({ userId, firstName, lastName, phone, photo, preferences });
  return await newUserProfile.save();
};

// Read User Profile
const getProfileByUserId = async (userId: Types.ObjectId) => {
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
