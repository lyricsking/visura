import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { getAppContext } from "~/app";
import { Label } from "~/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { useAppContext } from "~/core/utils/app-context";
import { handleResponse } from "~/core/utils/helpers";
import { useOptions } from "~/hooks/use-options";
import { homepageDisplayType } from "../type/options";
import Button from "~/components/button";
import { FormEvent, MouseEvent } from "react";

const loader = async ({}: LoaderFunctionArgs) => {
  const app = await getAppContext();
  return handleResponse<any>(app.configs("rwp_display"));
};

export default function DisplaySettings() {
  const { save } = useOptions();
  const app = useAppContext();
  const rwp_display = app.homepageConfig;
  const navigation = useNavigation();

  let formData: any = navigation.formData;

  let title = formData?.get("title")?.toString() || "";

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log(event.currentTarget);
    // save
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Homepage Display:
        <Select name="type">
          <SelectTrigger id="type" className="flex bg-white">
            <SelectValue placeholder={rwp_display.type} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {homepageDisplayType.map((type) => (
              <SelectItem key={type} value={type} className="capitalize">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Label>

      <Button type="submit">Save</Button>
    </Form>
  );
}
