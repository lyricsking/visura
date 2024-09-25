interface IOverview {
  userName: string;
  accountSummary: {
    recentActivity: string;
    nextDeliveryDate: string;
  };
  subscriptions: {
    id: string;
    name: string;
    status: string;
    nextDeliveryDate: string;
  }[];
  orders: {
    id: string;
    date: string;
    status: string;
  }[];
  invoices: {
    id: string;
    dueDate: string;
    amount: string;
  }[];
  notifications: {
    id: string;
    message: string;
    date: string;
  }[];
  healthTips: {
    id: string;
    title: string;
    content: string;
  }[];
  recommendedProducts: {
    id: string;
    name: string;
    description: string;
    price: string;
  }[];
}
