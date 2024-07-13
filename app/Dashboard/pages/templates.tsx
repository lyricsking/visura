import { DialogOverlay } from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@remix-run/react";
import Button from "~/shared/components/button";

export const handle = {
  pageName: "Templates",
  breadcrumb: () => {
    const array: React.ReactElement[] = [];
    array.push(<Link to="/dashboard/pages">Pages</Link>);
    array.push(<span>Templates</span>);

    return array;
  },
};
export default function Templates() {
  let num = [];
  while (num.length < 100) {
    num.push(num.length + 1);
  }

  const navigate = useNavigate();
  const gotoEdit = (id: string) => navigate(`/dashboard/pages/edit/${id}`);

  return (
    <div>
      <hr className="-my-[5px] mb-[20px] border-t" />
      <div className="grid grid-cols-2 md:grid-cols-12 gap-2 py-2 px-2">
        {num.map((val, index) => (
          <Button
            key={index}
            variant={"outline"}
            radius={"md"}
            className="h-[250px]"
            onClick={() => gotoEdit("blank")}
          >
            <div className="h-full"></div>
          </Button>
        ))}
      </div>
    </div>
  );
}
