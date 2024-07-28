import UserModel from './models/User'; // Adjust path as necessary
import UserProfileModel from './models/UserProfile'; // Adjust path as necessary

// Create User
const createUser = async (email: string, password: string, roles: UserRoles[] = ['user']) => {
  const newUser = new UserModel({ email, password, roles });
  return await newUser.save();
};

// Read User
const getUserById = async (userId: Types.ObjectId) => {
  return await UserModel.findById(userId).exec();
};

// Update User
const updateUser = async (userId: Types.ObjectId, updateData: Partial<IUser>) => {
  return await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
};

// Delete User
const deleteUser = async (userId: Types.ObjectId) => {
  return await UserModel.findByIdAndDelete(userId).exec();
};
