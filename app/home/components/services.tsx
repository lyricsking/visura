import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Features from "~/shared/component/features";
import { CommonProps } from "~/shared/types/common.props";

const features = [
  {
    name: "Fast Web Apps",
    description:
      "Our web apps are fast by default. We employ the good old web standard APIs that browsers love and understand.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "PWA Enhancement",
    description:
      "Is fast not enough? Opt-in to Progressive Web Apps Enhancement and give your website visitors enhanced (based on their browser version) experience, fast loading time, and a web app that still works in a slow or no network coverage area.",
    icon: LockClosedIcon,
  },
  {
    name: "Secure Backend API",
    description:
      "Build easy scalable and deployable backend solution for your web and mobile apps, integrated with JWT, authentication/authorization and rate limiting enabled to protect your API.",
    icon: ArrowPathIcon,
  },
  {
    name: "API Integration",
    description:
      "Third party APIs provides website with advanced, reliable functionality without having to re-invent the wheel. Google, Twilio, Flutterwave etc integrated into your tech stack without the overhead.",
    icon: FingerPrintIcon,
  },
  {
    name: "Databse Integration",
    description:
      "Data brings your website alive and there is no better way to keep your data safe than with database. In-memory, file based, server hosted database? We have your back.",
    icon: ArrowPathIcon,
  },
  {
    name: "Hosting",
    description:
      "You can deploy your server yourself or have us do it for you. We will deploy your web app and backend API to secure and reliable web hosting service provider so that you can focus on what is more important rather than struggling with server and hosting configurations.",
    icon: FingerPrintIcon,
  },
];

export default function Services(props: CommonProps) {
  return <Features id="service-offer" features={features} />;
}
