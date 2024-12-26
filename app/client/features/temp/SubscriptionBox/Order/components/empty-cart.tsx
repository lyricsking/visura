import { Link, useNavigate } from "@remix-run/react";
import Button from "~/shared/components/button";

export default function EmptyCart() {
  let navigate = useNavigate();
  return (
    <main className="max-h-screen w-full md:max-w-md  bg-white md:my-6 mx-auto py-8 px-6 md:rounded-md md:shadow-md">
      <h2 className="text-4xl font-bold text-center mb-6">
        Your cart is empty
      </h2>
      <p className="text-lg text-center mt-8">
        Don't worry let our simple product quiz help you fill up your cart with
        suggestions or try one of our great products.
      </p>
      <Button
        size={"lg"}
        variant="text"
        className="flex mt-2 mx-auto text-white bg-indigo-400 mb-6"
        onClick={() => {
          navigate("/quiz");
        }}
      >
        Take Quiz
      </Button>
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <img
            src="/images/hot-savory.jpg"
            alt="Hot & Savory"
            className="w-full min-h-24 bg-gray-200 rounded-md"
          />
          <h2 className="mt-4 font-semibold">Hot & Savory</h2>
          <p className="text-indigo-500">Quick Healthy Lunch</p>
        </div>
        <div className="text-center">
          <img
            src="/images/complete-nutrition-bar.jpg"
            alt="Complete Nutrition Bar"
            className="w-full min-h-24 bg-gray-200 rounded-md"
          />
          <h2 className="mt-4 font-semibold">Complete Nutrition Bar</h2>
          <p className="text-indigo-500">High protein snack</p>
        </div>
        <div className="text-center">
          <img
            src="/images/daily-greens.jpg"
            alt="Daily Greens"
            className="w-full min-h-24 bg-gray-200 rounded-md"
          />
          <h2 className="mt-4 font-semibold">Daily Greens</h2>
          <p className="text-indigo-500">Wellness Supplement</p>
        </div>
        <div className="text-center">
          <img
            src="/images/black-edition.jpg"
            alt="Black Edition"
            className="w-full min-h-24 bg-gray-200 rounded-md"
          />
          <h2 className="mt-4 font-semibold">Black Edition</h2>
          <p className="text-indigo-500">Protein-Packed Meals</p>
        </div>
      </div>
    </main>
  );
}
