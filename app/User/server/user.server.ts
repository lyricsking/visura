// Create User
const createUser = async (email: string, password: string, roles: UserRoles[] = ['user']) => {
  const exists = await UserModel.count({email}).exec();
  if(count > 0){
    throw new Error('User already exists');
  }
  const newUser = new UserModel({ email, password, roles });
  
  return await newUser.save();
};

// Read User
const getUserById = async (userId: Types.ObjectId) => {
  
  const user= await UserModel.findById(userId).exec();
  
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

// Update User
const updateUser = async (userId: Types.ObjectId, updateData: Partial<IUser>) => {
  const updatedUser =  await UserModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
  
  if (!updatedUser ) {
    throw new Error('User or profile not found');
  }
  
  return updatedUser;
};

// Delete User
const deleteUser = async (userId: Types.ObjectId) => {
  const deletedUser= await UserModel.findByIdAndDelete(userId).exec();
  
  if(!deletedUser){
    throw new Error('User not found');
  }
  
  return deletedUser;
};
