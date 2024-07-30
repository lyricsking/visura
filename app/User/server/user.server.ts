export type CreateUserProps = {
  email: string, 
  password?: string, 
  roles: UserRoles[] = ['user'], 
  populate: any[]
}
// Create User
export const createUser = async (props: CreateUserProps) => {
  const { email, password, roles, populate } = props;
  
  console.log("Creating user");

  let existingUser = await UserModel.findOne({email}).populate(populate).exec();
  
  if(existingUser){
    return existingUser;
  }
  
  let newUser = new User({ 
    email, 
    ...( password && { password }),
    roles
  });
  
  await newUser.save()
  /*.then(user => {
    const preferences = {
      notifications: {
        preferredSupportChannel: 'email',
        orderUpdates: true,
        promotional: true,
        subscriptionReminders: true,
        supportNotification: true,
      },
      display: {
        theme: 'light',
        language: 'en',
        currency: 'NGN',
      },
      privacy: {
        dataSharing: true,
        activityTracking: true,
        accountVisibility: true,
      },
      order: {
        deliveryInstructions: 'Leave at door',
        packaging: 'eco-friendly',
      },
    };
  });
  */
  
  // Query the saved user and populate the virtual field
  return await User.findById(newUser._id).populate(populate).exec();
};

// Read User
const getUserById = async (userId: Types.ObjectId) => {
  
  const user = await UserModel.findById(userId).exec();
  
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
