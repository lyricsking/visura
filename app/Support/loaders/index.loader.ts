
export const loader: LoaderFunction = () => {

}


// Dummy data and utilities for demonstration
export const getFAQs = async () => {
  return [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Orders' section.",
    },
    {
      id: 2,
      question: "How do I return a product?",
      answer:
        "You can return a product by visiting our 'Returns' page and following the instructions provided.",
    },
  ];
};

export const getArticleCategories = async () => {
  return [
    {
      id: 1,
      name: "Using Our Product",
      description: "Guides and tips for using our products effectively.",
    },
    {
      id: 2,
      name: "Troubleshooting",
      description: "Solutions to common issues you might encounter.",
    },
  ];
};

export const getArticlesByCategory = async (categoryId?: number) => {
  const allArticles = [
    {
      id: 1,
      categoryId: 1,
      title: "Getting Started with Our Product",
      content: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 2,
      categoryId: 2,
      title: "Fixing Connection Issues",
      content: "Lorem ipsum dolor sit amet...",
    },
  ];
  return allArticles.filter((article) => article.categoryId === categoryId);
};

export const getArticleDetails = async (id: any) => {
  const allArticles = await getArticlesByCategory();
  return allArticles.find((article) => article.id === parseInt(id));
};

export const loader = async () => {
  const articleCategories = await getArticleCategories();
  const faqs = await getFAQs();
  return { articleCategories, faqs };
};
