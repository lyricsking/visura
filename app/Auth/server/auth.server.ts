//  npm install remix-auth remix-auth-google
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/utils/session";
import { googleStrategy } from "../strategy/google-strategy";

const authenticator = new Authenticator(sessionStorage);

authenticator.use(googleStrategy);

createUser('user@example.com', 'password123')
  .then(user => {
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
        currency: 'USD',
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
      health: {
        supplementPreferences: ['vitamin D', 'omega-3'],
        healthGoals: 'general wellness',
        allergies: ['nuts'],
      },
      payment: {
        savedMethods: [{ type: 'card', last4: '1234' }],
      },
    };

    return createUserProfile(user._id, 'John', 'Doe', '123-456-7890', preferences);
  })
  .then(userProfile => {
    console.log('User and profile created:', userProfile);
  })
  .catch(error => {
    console.error('Error creating user or profile:', error);
  });


export { authenticator };
