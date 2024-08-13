async function addArticle(
  categoryData: Omit<ISupportArticleCategory, '_id' | 'createdAt' | 'updatedAt'>,
  articlesData: IArticle[]
): Promise<ISupportArticleCategory | null> {
  try {
    // Update the existing category or create a new one
    const updatedCategory = await SupportArticleCategory.findOneAndUpdate(
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
    console.error("Error creating or updating the support article category", error);
    throw error;
  }
}

async function updateArticleCategory(
  categoryId: Types.ObjectId,
  updateData: Partial<ISupportArticleCategory>
): Promise<ISupportArticleCategory | null> {
  try {
    // Update the support article category with the provided update data
    const updatedCategory = await SupportArticleCategory.findByIdAndUpdate(
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

async function updateArticle(
  categoryId: Types.ObjectId,
  articleId: Types.ObjectId,
  updateData: Partial<IArticle>
): Promise<IArticle | null> {
  try {
    // Find the support article category and update the specific article
    const updatedCategory = await SupportArticleCategory.findOneAndUpdate(
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
    return updatedCategory.articles.id(articleId);
  } catch (error) {
    console.error("Error updating support article", error);
    throw error;
  }
}

async function findArticleById(
  categoryId: Types.ObjectId,
  articleId: Types.ObjectId
): Promise<IArticle | null> {
  const supportCategory = await SupportArticleCategory.findById(categoryId)
    .select({ articles: { $elemMatch: { _id: articleId } } })
    .exec();

  if (!supportCategory || supportCategory.articles.length === 0) {
    throw new Error("Support Article not found");
  }

  return supportCategory.articles[0];
}

async function findOneCategory(
  searchCriteria: Partial<ISupportArticleCategory>
): Promise<ISupportArticleCategory | null> {
  try {
    const category = await SupportArticleCategory.findOne(searchCriteria).exec();

    if (!category) {
      throw new Error("Support Article Category not found");
    }

    return category;
  } catch (error) {
    console.error("Error finding support article category", error);
    throw error;
  }
}

async function findOneArticle(
  categoryId: Types.ObjectId,
  searchCriteria: Partial<IArticle>
): Promise<IArticle | null> {
  try {
    const category = await SupportArticleCategory.findOne(
      { _id: categoryId, "articles": { $elemMatch: searchCriteria } },
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

async function deleteSupportArticle(
  categoryId: Types.ObjectId,
  articleId: Types.ObjectId
): Promise<boolean> {
  const supportCategory = await SupportArticleCategory.findOneAndUpdate(
    { _id: categoryId },
    { $pull: { articles: { _id: articleId } } },
    { new: true }
  ).exec();

  if (!supportCategory) {
    throw new Error("Support Article or Category not found");
  }

  return true;
}
