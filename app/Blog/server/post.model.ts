import PostModel, { PostModelType } from "../models/post.model";
import { IPost } from "../types/post.type";

export const createBlog = async function (data: IPost): Promise<IPost> {
  try {
    const blog = await PostModel.create(data);
    console.log(blog);

    return blog;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
