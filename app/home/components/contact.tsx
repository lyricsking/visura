import {
  ArrowPathIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Social from "~/shared/component/social";
import { CommonProps } from "~/shared/types/common.props";

export type Item = {
  name: string;
  description: React.ReactNode;
  icon: React.ComponentType<CommonProps>;
};

type Params = CommonProps;

const items: Item[] = [
  {
    name: "Our Address",
    description: "78 Ajilosun street, Ado - Ikere road. Ado-Ekiti",
    icon: MapPinIcon,
  },
  {
    name: "Working Hours",
    description:
      "Monday - Friday: 08:00 - 17:00. \nSaturday: 10:00 - 17:00.\n Sunday: 14:00 - 17:00.",
    icon: ClockIcon,
  },
  {
    name: "Contact",
    description: (
      <Social
        className="flex items-center gap-2"
        socials={["whatsapp", "facebook"]}
        sizeClass="h-5 w-5"
        wrapperClass="btn"
      />
    ),
    icon: ChatBubbleLeftIcon,
  },
];

export default function Contact(props: Params) {
  const { className } = props;

  return (
    <div id="service-offer" className={`bg-accent py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-accent font-semibold leading-7">Our contacts</h2>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch with us today.
          </h2>
          {false && (
            <p className="mt-6 text-lg leading-8">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </p>
          )}
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {items.map((item) => (
              <div key={item.name} className="relative pl-16">
                <dt className="font-semibold leading-7 text-base">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <item.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {item.name}
                </dt>
                <dd
                  className="mt-2 text-base leading-7"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
