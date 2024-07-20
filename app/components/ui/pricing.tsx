import { CheckIcon } from "@heroicons/react/20/solid";
import { CommonProps } from "~/Shared/types/common.props";

const defaultPages: string[] = [
  "Landing/Homepage",
  "Signup/Registration",
  "Login",
  "Forgot Password",
  "Verify",
  "Terms and Condition",
  "Privacy",
  "Category page",
  "Search Page",
  "Item Page",
];

const defaultEndpoints = [
  "Register endpoint",
  "Login endpoint",
  "Forgot Password endpoint",
  "Verify endpoint",
  "Category endpoints",
  "search endpoint",
  "item endpoints",
];

const Period = {
  hour: "hour",
  month: "month",
  year: "year",
  "one-off": "one-off",
} as const;
type Period = keyof typeof Period;

type Plan = {
  name: string;
  description: string;
  price?: number;
  currency: string;
  period: Period;
  features?: string[];
  //paid_features: PaidFeature[]
};

const plans: Plan[] = [
  {
    name: "Frontend Development",
    description:
      "With SEO optimization built-in. Great for projects with existing data backend system.",
    price: 55000,
    currency: "NGN",
    period: Period["one-off"],
    features: [
      "Up to 10 pages. See * below.",
      "Free light and dark theme enabled.",
      "Up to 3 free after sales bug/support support.",
      "Free file, in-memory or SQLite database setup.",
      "Free pages and asset optimization.",
      "Free deployment service.",
    ],
  },
  {
    name: "Backend Development",
    description:
      "Secure and Reliable backend data management system. Great for projects supporting multiple web, mobile and third-party apps.",
    price: 65000,
    currency: "NGN",
    period: Period["one-off"],
    features: [
      "Up to 7 Endpoints. See ** below",
      "Up to 3 free after sales bug/service support",
      "Free SQLite database integration",
      "Free deployment service.",
      "Authentication and Authorization baked in",
      "Rate limiting",
    ],
  },
  {
    name: "Fullstack Development",
    description:
      "An end-to-end web app co-locating both backend and frontend codes on a single server. Great for new projects and startups close on deadline.",
    price: 85000,
    currency: "NGN",
    period: Period["one-off"],
    features: ["All features available in Frontend and Backend Developments"],
  },
  {
    name: "API integration",
    description: "Extend your app functionality with API",
    price: 2000,
    currency: "NGN",
    period: Period.hour,
  },
];

export default function Pricing(props: CommonProps) {
  const formatter = Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={`bg-base-100 py-24 sm:py-32 ${props.className}`}>
      <div className="mx-auto max-w-7xl px-6 text- lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-accent font-semibold leading-7">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Simple pricing plans
          </p>
          <p className="mt-6 text-lg leading-8">
            A simple no-brainer pricing plans that helps you make a decision.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div key={index} className="rounded-3xl ring-1 ring-gray-200">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-lg font-bold tracking-tight text-secondary">
                  {plan.name}
                </h3>
                <p className="mt-6 leading-6">{plan.description}</p>
                {plan.price && (
                  <p className="mt-6 items-baseline justify-center gap-x-2 text-accent">
                    <span className="text-5xl font-bold tracking-tight">
                      {formatter.format(plan.price)}
                    </span>
                    {" /"}
                    <span className="text-sm font-semibold leading-6 tracking-wide">
                      {plan.period}
                    </span>
                  </p>
                )}
                {plan.features && (
                  <>
                    <div className="mt-10 flex items-center gap-x-4">
                      <h4 className="flex-none text-sm font-semibold leading-6 text-accent">
                        What’s included
                      </h4>
                      <div className="h-px flex-auto bg-accent" />
                    </div>
                    <ul
                      role="list"
                      className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-base-content sm:grid-cols-2 sm:gap-6"
                    >
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3 text-start">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-accent"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <a
                  href="#contact"
                  className="mt-10 btn btn-wide btn-accent text-white"
                >
                  Get in touch
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto">
          <p className="mt-6 text-sm lg:text-md font-semibold">
            * {defaultPages.join(", ")}.
          </p>
          <p className="mt-6 text-sm lg:text-md font-bold">
            ** {defaultEndpoints.join(", ")}.
          </p>
        </div>

        <div className="mt-6">
          <p className="text-lg font-bold tracking-tight text-secondary ">
            Low on cash? No worries
          </p>
          <p className="leading-6">
            Are you tight on budget and can't wait to get your ideas out? No
            worries, get started for as little as 30% initial deposit and pay on
            a monthly installment.
            <a
              href="#contact"
              className="mt-4 w-full btn btn-accent text-white"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
