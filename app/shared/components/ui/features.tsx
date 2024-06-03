export type FeaturesParams = {
  id: string;
  features: Feature[];
};
type Feature = {
  name: string;
  description: string;
  icon: any;
};

export default function Features(params: FeaturesParams) {
  return (
    <div id={params.id} className="bg-base-100 py-24 sm:py-32">
      <div className="mx-auto text-base-content max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-accent font-semibold leading-7">Our services</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
            Everything you need to make your next project a big deal
          </p>
          <p className="mt-6 text-lg leading-8">
            You get well-crafted, ease-to-use modern web apps and backend
            solutions that appeal to your visitors and enable you to grow eaily
            so you can focus on other important stuff.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 text-base-content lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {params.features.map((feature) => (
              <Feature key={feature.name} {...feature} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function Feature(params: Feature) {
  return (
    <div key={params.name} className="relative pl-16">
      <dt className="font-semibold leading-7 text-secondary">
        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
          <params.icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        {params.name}
      </dt>
      <dd className="mt-2 text-base leading-7">{params.description}</dd>
    </div>
  );
}
