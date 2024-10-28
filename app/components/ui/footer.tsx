import config from "@/config";

export default function Footer() {
  const year = new Date().getFullYear();
  let copyrightText = "Adeniyi Jamiu";

  return (
    <div className="border-t-2 border-neutral py-6 px-4">
      <span>&copy; {year}</span> {copyrightText}
    </div>
  );
}
