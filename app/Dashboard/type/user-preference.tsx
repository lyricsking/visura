interface UserPreferences {
  profile: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: string;
    billingAddress: string;
  };
  notifications: {
    orderUpdates: boolean;
    subscriptionReminders: boolean;
    promotional: boolean;
  };
  display: {
    theme: 'light' | 'dark';
    language: string;
    currency: string;
  };
  privacy: {
    dataSharing: boolean;
    activityTracking: boolean;
    accountVisibility: boolean;
  };
  order: {
    deliveryInstructions: string;
    packaging: 'standard' | 'eco-friendly' | 'discreet';
  };
  health: {
    supplementPreferences: string[];
    healthGoals: string;
    allergies: string[];
  };
  payment: {
    savedMethods: { type: string; last4: string }[];
  };
  support: {
    preferredChannel: 'email' | 'chat' | 'phone';
    supportNotification: boolean;
  };
}
