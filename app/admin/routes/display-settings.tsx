import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { getAppContext } from "~/app";
import { Label } from "~/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { useOptions } from "~/hooks/use-options";
import {
  DisplayOptions,
  homepageDisplayType,
  HomepageType,
} from "../type/options";
import Button from "~/components/button";
import { FormEvent, useEffect, useState } from "react";
import { IPage } from "~/core/page/types/page";

export const loader = async ({}: LoaderFunctionArgs) => {
  const app = await getAppContext();
  const displaySettings = app.configs("rwp_display");

  const [plugnHomepages, staticPages] = await Promise.all([
    [] as IPage[],
    fetch("http://localhost:3000/api/pages").then((req) => {
      if (req) return req.json();
    }) as Promise<any>,
  ]);

  const data = {
    rwp_display,
    plugnHomepages,
    staticPages: staticPages.data as IPage[],
  };
  console.log(data);

  return json(data);
};

export default function DisplaySettings() {
  const { rwp_display, staticPages, plugnHomepages } =
    useLoaderData<typeof loader>();
  const { save } = useOptions();
  const navigation = useNavigation();
  const [homeValue, setHomeValue] = useState<string>(rwp_display.homepage.type);
  const [secondSelectOptions, setOptions] = useState(() => {
    if (homeValue === "static") {
      return staticPages;
    }

    return plugnHomepages;
  });

  let formData: any = navigation.formData;

  let title = formData?.get("title")?.toString() || "";

  useEffect(() => {
    if (homeValue) {
      if (homeValue === "static") {
        setOptions(staticPages);
      } else{
        setOptions(plugnHomepages);
      }
    }
  }, [homeValue]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log(event.currentTarget);
    // save
  }

  function onHomeTypeChanged(value: string): void {
    setHomeValue(value as HomepageType);
  }

  function onPageValue(value: string): void {
  }

  return (
    <div className="bg-white shadow rounded-b-lg px-4 py-5 sm:p-6">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <Label asChild>
            <div className="grid auto-rows-auto gap-2">
              Homepage Display:
              <Select name="type" onValueChange={onHomeTypeChanged}>
                <SelectTrigger id="type" className="bg-white">
                  <SelectValue placeholder={rwp_display.homepage.type} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {homepageDisplayType.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Label>

          {homeValue && (
            <Label asChild>
              <div className="grid auto-rows-auto gap-2">
                Select a {homeValue} page
                <Select name="type" onValueChange={onPageValue}>
                  <SelectTrigger id="type" className=" bg-white">
                    <SelectValue placeholder={secondSelectOptions[0]?.path} />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {secondSelectOptions.map((page) => (
                      <SelectItem
                        key={page.path}
                        value={"/"}
                        className="capitalize"
                      >
                        {page.metadata.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Label>
          )}
        </div>

        <Button type="submit" className="mt-2">
          Save
        </Button>
      </Form>
    </div>
  );
}
