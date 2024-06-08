export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t-2 border-neutral py-6 px-4">
      <span>&copy; {year}</span> Jamiu Adeniyi
    </div>
  );
}
