import { json, LoaderFunctionArgs } from "react-router";
import { Form, useLoaderData, useNavigation } from "react-router";
import { getAppContext } from "~/app";
import { Label } from "~/shared/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/components/select";
import { useOptions } from "~/shared/hooks/use-options";
import {
  DisplayOptions,
  homepageDisplayType,
  HomepageType,
} from "../type/options";
import Button from "~/shared/components/button";
import { FormEvent, useEffect, useState } from "react";
import { IPage } from "~/features/page/types/page";
import { DISPLAY_OPTION_KEY, IOption } from "~/features/option/types/option";
import lo from "lodash";
import formDataToObject from "~/shared/utils/form-data-to-object";

export const loader = async ({}: LoaderFunctionArgs) => {
  const app = await getAppContext();

  const pluginRoutes = app.pluginRoutes.filter(
    (route) => route.default != false
  );

  const optionsURL = new URL("http://localhost:3000/api/options");
  optionsURL.searchParams.set("name", DISPLAY_OPTION_KEY);

  const [displaySettings, staticPages] = await Promise.all([
    await fetch(optionsURL).then((req) => {
      if (req) return req.json();
      return [];
    }),
    await fetch("http://localhost:3000/api/pages").then((req) => {
      if (req) return req.json();
      return [];
    }),
  ]);

  const data = {
    displaySettings: displaySettings.data[0].value as DisplayOptions,
    pluginRoutes,
    staticPages: staticPages.data as IPage[],
  };

  return json(data);
};

export default function DisplaySettings() {
  const { displaySettings, staticPages, pluginRoutes } =
    useLoaderData<typeof loader>();

  const { isSubmitting, save } = useOptions();
  const navigation = useNavigation();
  const [homepageType, setHomepageType] = useState<string>(
    displaySettings.homepage.type
  );
  const [homepagePath, setHomepagePath] = useState<string>(
    displaySettings.homepage.path
  );

  const [secondSelectOptions, setOptions] = useState(() => {
    if (homepageType === "static") {
      return staticPages;
    }

    return pluginRoutes;
  });

  let formData: any = navigation.formData;

  let title = formData?.get("title")?.toString() || "";

  useEffect(() => {
    if (homepageType) {
      if (homepageType === "static") {
        setOptions(staticPages);
      } else {
        setOptions(pluginRoutes);
      }
    }
  }, [homepageType]);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formDataObj = formDataToObject(new FormData(event.currentTarget));
    // save

    const values: DisplayOptions = {
      homepage: {
        type: formDataObj["type"],
        path: formDataObj["path"],
      },
    };
    save(DISPLAY_OPTION_KEY, values);
  }

  function onHomeTypeChanged(value: string): void {
    setHomepageType(value as HomepageType);
  }

  function onPageValue(value: string): void {
    setHomepagePath(value);
  }

  return (
    <div className="bg-white shadow rounded-b-lg px-4 py-5 sm:p-6">
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <Label asChild>
            <div className="grid auto-rows-auto gap-2">
              Homepage Display:
              <Select
                name="type"
                defaultValue={homepageType}
                onValueChange={onHomeTypeChanged}
              >
                <SelectTrigger id="type" className="bg-white">
                  <SelectValue
                    placeholder={lo.capitalize(displaySettings.homepage.type)}
                  />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {homepageDisplayType.map((type) => (
                    <SelectItem key={type} value={type}>
                      {lo.capitalize(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Label>

          {homepageType && (
            <Label asChild>
              <div className="grid auto-rows-auto gap-2">
                Select a {homepageType} page
                <Select
                  name="path"
                  defaultValue={homepagePath}
                  onValueChange={onPageValue}
                >
                  <SelectTrigger id="path" className=" bg-white">
                    <SelectValue
                      placeholder={
                        secondSelectOptions.find(
                          (page) => page.path == homepagePath
                        )?.metadata.title
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {secondSelectOptions.map((page) => (
                      <SelectItem
                        key={page.path}
                        value={page.path}
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

        <Button type="submit" className="mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </Form>
    </div>
  );
}
