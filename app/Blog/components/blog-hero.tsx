import { findFontByName } from "~/shared/data/fonts";

export default function BlogHero() {
  const font = findFontByName("Courier Prime");

  return (
    <div className="flex w-full bg-gray-300 border shadow-md text-center px-6 py-8 sm:py-12 lg:px-8 lg:py-16">
      <h1
        className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        style={{ fontFamily: font!.value }}
      >
        Sport tips, predictions, analysis and news.
      </h1>
    </div>
  );
}
