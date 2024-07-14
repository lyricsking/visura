
export const createOrUpdateAddress = async (id: string, address: IAddress): Promise<void> => {
  try {
    await connectToDatabase();
    
    await AddressModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...address, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, new: true }
    ).exec();
    console.log("Address saved successfully.");
  } catch (err) {
    console.error("Error saving address.", err);
  } finally{
    disconnectDatabase();
  }
}
