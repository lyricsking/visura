export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-primary border-t-2 border-neutral py-6 px-4">
      <p className="text-md text-center">
        Built with 💕 Remix and Tailwindcss + DaisyUI
        <br />
        Illustration by{" "}
        <a href="https://storyset.com" className="btn-link text-neutral">
          Storyset
        </a>
        <br />
        Inspired 💭 by{" "}
        <a
          href="https://vuejs-tailwindcss-portfolio.netlify.app"
          className="btn-link text-neutral"
        >
          IAM STOMAN
        </a>
        <br />
        <span>&copy; {year}</span> Jamiu Adeniyi
      </p>
    </div>
  );
}
