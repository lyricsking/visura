import { Types } from "mongoose";
import ArticleCollection from "../models/article.model";
import { IArticle, IArticleCollection } from "../types/article.type";

export async function addArticle(
  categoryData: Omit<IArticleCollection, "_id" | "createdAt" | "updatedAt">,
  articlesData: IArticle[]
): Promise<IArticleCollection | null> {
  try {
    // Update the existing category or create a new one
    const updatedCategory = await ArticleCollection.findOneAndUpdate(
      { name: categoryData.name },
      {
        $setOnInsert: {
          description: categoryData.description,
          articles: [],
        },
        $set: {
          updatedAt: new Date(),
        },
        $push: {
          articles: {
            $each: articlesData,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    ).exec();

    return updatedCategory;
  } catch (error) {
    console.error(
      "Error creating or updating the support article category",
      error
    );

    throw error;
  }
}

export async function updateArticleCollection(
  categoryId: Types.ObjectId,
  updateData: Partial<IArticleCollection>
): Promise<IArticleCollection | null> {
  try {
    // Update the support article category with the provided update data
    const updatedCategory = await ArticleCollection.findByIdAndUpdate(
      categoryId,
      {
        $set: {
          name: updateData.name,
          description: updateData.description,
          updatedAt: new Date(),
        },
      },
      { new: true }
    ).exec();

    // Check if the category was found and updated
    if (!updatedCategory) {
      throw new Error("Support Article Category not found");
    }

    // Return the updated category
    return updatedCategory;
  } catch (error) {
    console.error("Error updating support article category", error);
    throw error;
  }
}

export async function updateArticle(
  categoryId: Types.ObjectId,
  articleId: Types.ObjectId,
  updateData: Partial<IArticle>
): Promise<IArticle | null> {
  try {
    // Find the support article category and update the specific article
    const updatedCategory = await ArticleCollection.findOneAndUpdate(
      { _id: categoryId, "articles._id": articleId },
      {
        $set: {
          "articles.$.title": updateData.title,
          "articles.$.description": updateData.description,
        },
        updatedAt: new Date(),
      },
      { new: true }
    ).exec();

    // Check if the category was found and an article was updated
    if (!updatedCategory) {
      throw new Error("Support Article Category or Article not found");
    }

    // Return the updated article
    return (
      updatedCategory.articles.find((article) => article._id === articleId) ||
      null
    );
  } catch (error) {
    console.error("Error updating support article", error);
    throw error;
  }
}

export async function findArticleById(
  categoryId: Types.ObjectId,
  articleId: Types.ObjectId
): Promise<IArticle | null> {
  const supportCategory = await ArticleCollection.findById(categoryId)
    .select({ articles: { $elemMatch: { _id: articleId } } })
    .exec();

  if (!supportCategory || supportCategory.articles.length === 0) {
    throw new Error("Support Article not found");
  }

  return supportCategory.articles[0];
}

export async function findOneCategory(
  searchCriteria: Partial<IArticleCollection>
): Promise<IArticleCollection | null> {
  try {
    const category = await ArticleCollection.findOne(searchCriteria).exec();

    if (!category) {
      throw new Error("Support Article Category not found");
    }

    return category;
  } catch (error) {
    console.error("Error finding support article category", error);
    throw error;
  }
}

export async function findOneArticle(
  categoryId: Types.ObjectId,
  searchCriteria: Partial<IArticle>
): Promise<IArticle | null> {
  try {
    const category = await ArticleCollection.findOne(
      { _id: categoryId, articles: { $elemMatch: searchCriteria } },
      { "articles.$": 1 }
    ).exec();

    if (!category || category.articles.length === 0) {
      throw new Error("Support Article not found");
    }

    return category.articles[0];
  } catch (error) {
    console.error("Error finding support article", error);
    throw error;
  }
}

export async function deleteSupportArticle(
  categoryId: Types.ObjectId,
  articleId: Types.ObjectId
): Promise<boolean> {
  const supportCategory = await ArticleCollection.findOneAndUpdate(
    { _id: categoryId },
    { $pull: { articles: { _id: articleId } } },
    { new: true }
  ).exec();

  if (!supportCategory) {
    throw new Error("Support Article or Category not found");
  }

  return true;
}
