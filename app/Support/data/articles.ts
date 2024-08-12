
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

const articles = [
  {
    id: 1,
    name: "Using Our Product",
    description: "Guides and tips for using our products effectively.",
    articles: [
      {
        id: articleId,
        title: "How to Get Started with Our Platform",
        content: `<p>Welcome to our platform. To get started, you'll need to do the following:</p>
              <ol>
                <li>Create an account.</li>
                <li>Verify your email.</li>
                <li>Set up your profile.</li>
              </ol>
              <p>If you need further assistance, contact our support team.</p>`,
        relatedArticles: [
          { id: 2, title: "Account Setup and Verification" },
          { id: 3, title: "Managing Your Profile" },
        ],
      }
    ]
  },
  {
    id: 2,
    name: "Troubleshooting",
    description: "Solutions to common issues you might encounter.",
    
    articles: [
      {
        id: 2,
        title: "Fixing Connection Issues",
        content: "Lorem ipsum dolor sit amet..."
      }
    ]
  }
];

export const getArticleCategories = async () => {
  return articles;
};

export const getArticlesByCategory = async (categoryId: number) => {
  
  return articles.find((article) => article.id === categoryId);
};

export const getArticleDetails = async (categoryId: any, id: any) => {
  
  const category = await getArticlesByCategory(categoryId);
  
  if(category){
    return category.articles.find((article)=> article.id === id)
  }
  return null;
};
