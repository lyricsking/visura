import { Link } from "@remix-run/react";
import { CommonProps } from "~/Shared/types/common.props";

type Props = CommonProps & {
  title: string;
  img: string;
  description: string;
};

export default function SummaryCard(props: Props) {
  return (
    <div
      className={`card w-full shadow-xl bg-white dark:bg-base-200 ${props.className}`}
    >
      <figure className="bg-gray-300 p-2">
        <img src={props.img} alt={props.title} />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-2xl font-bold text-center">{props.title}</h2>
        <p className="text-start line-clamp-2">{props.description}</p>
        <Link to={`/projects/${props.id}`} className="text-start btn-link mt-4">
          Read more...
        </Link>
      </div>
    </div>
  );
}
