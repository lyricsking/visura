import { CommonProps } from "~/Shared/types/common.props";

export type StatParams = {
  counter: number;
  prefix?: string;
  suffix?: string;
  description: string;
};

type Params = CommonProps;

const currentYear = new Date().getFullYear();
const startYear = new Date("March 1, 2017").getFullYear();

const stats: StatParams[] = [
  {
    counter: currentYear - startYear,
    suffix: " +",
    description: "Years experience writing reliable codes",
  },
  {
    counter: 7,
    description: "Projects completed",
  },
  { counter: 3, description: "Happy clients and counting" },
];

export default function Stats(params: Params) {
  return (
    <div className="bg-primary text-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The numbers speaks volume
          </h2>
          {false && (
            <p className="mt-6 text-lg leading-8">
              Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et
              quasi iusto modi velit ut non voluptas in. Explicabo id ut
              laborum.
            </p>
          )}
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </dl>
      </div>
    </div>
  );
}

function Stat({ counter, description, prefix, suffix }: StatParams) {
  let stat = prefix ? prefix : "";
  stat += counter;
  stat += suffix ? suffix : "";

  return (
    <div className="mx-auto flex max-w-xs flex-col gap-y-4">
      <dd className="order-first text-4xl font-bold tracking-tight sm:text-5xl">
        {stat}
      </dd>
      <dt className="text-base leading-7">{description}</dt>
    </div>
  );
}
