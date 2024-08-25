import { LinksFunction, type MetaFunction } from "@remix-run/node";
import { findFontByName } from "~/shared/data/fonts";
import { config } from "@/config";
import BlogHero from "../components/blog-hero";
import { ListFilter, PlusCircle } from "lucide-react";

import Button from "~/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/card";
import { Input } from "~/components/input";
import { Label } from "~/components/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/table";
import { ToggleGroup, ToggleGroupItem } from "~/components/toggle.group";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "~/components/select";
import { SelectItem } from "@radix-ui/react-select";

export const links: LinksFunction = () => {
  const merriweather = findFontByName("Playfair Display");
  const raleway = findFontByName("Raleway");

  const links = [];

  if (merriweather)
    links.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links.push({ rel: raleway.rel, href: raleway.href });

  return links;
};

export const meta: MetaFunction = () => {
  return [
    { title: config.appName },
    { name: "description", content: config.description },
  ];
};

export default function Index() {
  const font = findFontByName("Courier Prime");

  return (
    <div className="flex flex-col items-start gap-4 md:gap-8">
      <BlogHero />

      <div className="mx-auto grid w-full max-w-3xl items-start rounded-md p-4 md:p-8 gap-4">
        <Card className="w-full divide-y overflow-x-auto">
          <CardHeader className="flex-row items-start w-full gap-6">
            <div className="">
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>

              <h3 className="hidden flex-1 shrink-0 items-center mt-2 text-2xl font-bold tracking-tight text-secondary sm:grow-0 sm:text-3xl">
                Upcoming
              </h3>
            </div>
            <Button variant="outline" className="flex-none ml-auto">
              <ListFilter className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-001</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-1" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-1" type="number" defaultValue="100" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-1" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-1" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="s"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-002</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-2" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-2" type="number" defaultValue="143" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-2" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="m"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-003</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-3" type="number" defaultValue="32" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="price-3" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="s"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button size="sm" variant="text" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mx-auto grid w-full max-w-3xl items-start p-4 md:p-8 gap-4 overflow-x-hidden">
        <Card className="w-full divide-y overflow-x-auto">
          <CardHeader>
            <CardTitle>Tips</CardTitle>
            <CardDescription>
              Lipsum dolor sit amet, consectetur adipiscing elit
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap items-center justify-between mt-6 bg-gray-100 border rounded-t-md divide-x">
              <Select>
                <SelectTrigger className="flex-1 border-none rounded-none">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="flex-1 border-none rounded-none">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"S"}>S</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="flex-1 border-none rounded-none">
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"S"}>S</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table className="border-s border-e border-b rounded-b-md">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="w-[100px]">Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-001</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-1" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-1" type="number" defaultValue="100" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-1" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-1" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="s"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-002</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-2" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-2" type="number" defaultValue="143" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-2" className="sr-only">
                      Price
                    </Label>
                    <Input id="price-2" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="m"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold">GGPC-003</TableCell>
                  <TableCell>
                    <Label htmlFor="stock-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="stock-3" type="number" defaultValue="32" />
                  </TableCell>
                  <TableCell>
                    <Label htmlFor="price-3" className="sr-only">
                      Stock
                    </Label>
                    <Input id="price-3" type="number" defaultValue="99.99" />
                  </TableCell>
                  <TableCell>
                    <ToggleGroup
                      type="single"
                      defaultValue="s"
                      variant="outline"
                    >
                      <ToggleGroupItem value="s">S</ToggleGroupItem>
                      <ToggleGroupItem value="m">M</ToggleGroupItem>
                      <ToggleGroupItem value="l">L</ToggleGroupItem>
                    </ToggleGroup>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>

          <CardFooter className="justify-center border-t p-4">
            <Button size="sm" variant="text" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Variant
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mx-auto grid sm:grid-cols-2 w-full max-w-3xl items-start p-4 md:p-8 gap-4">
        <h3 className="col-span-full mt-2 text-3xl text-center sm:text-4xl font-bold tracking-tight mb-10">
          Team News
        </h3>

        <article className="group relative flex flex-col space-y-2">
          <img
            alt="Preview Mode for Headless CMS"
            width="804"
            height="452"
            className="rounded-md border bg-muted transition-colors"
            src="/illustrations/blog-post-1.webp"
          />
          <h2 className="text-2xl font-extrabold">
            Preview Mode for Headless CMS
          </h2>
          <p className="text-muted-foreground">
            How to implement preview mode in your headless CMS.
          </p>
          <p className="text-sm text-muted-foreground">April 9, 2023</p>
          <a
            className="absolute inset-0"
            href="/blog/preview-mode-headless-cms"
          >
            <span className="sr-only">View Article</span>
          </a>
        </article>

        <article className="group relative flex flex-col space-y-2">
          <img
            alt="Dynamic Routing and Static Regeneration"
            width="804"
            height="452"
            className="rounded-md border bg-muted transition-colors"
            src="/illustrations/blog-post-2.webp"
          />
          <h2 className="text-2xl font-extrabold">
            Dynamic Routing and Static Regeneration
          </h2>
          <p className="text-muted-foreground">
            How to use incremental static regeneration using dynamic routes.
          </p>
          <p className="text-sm text-muted-foreground">March 4, 2023</p>
          <a
            className="absolute inset-0"
            href="/blog/dynamic-routing-static-regeneration"
          >
            <span className="sr-only">View Article</span>
          </a>
        </article>

        <article className="group relative flex flex-col space-y-2">
          <img
            alt="Server and Client Components"
            width="804"
            height="452"
            className="rounded-md border bg-muted transition-colors"
            src="/illustrations/blog-post-3.webp"
          />
          <h2 className="text-2xl font-extrabold">
            Server and Client Components
          </h2>
          <p className="text-muted-foreground">
            React Server Components allow developers to build applications that
            span the server and client.
          </p>
          <p className="text-sm text-muted-foreground">January 8, 2023</p>
          <a className="absolute inset-0" href="/blog/server-client-components">
            <span className="sr-only">View Article</span>
          </a>
        </article>

        <article className="group relative flex flex-col space-y-2">
          <img
            alt="Deploying Next.js Apps"
            width="804"
            height="452"
            className="rounded-md border bg-muted transition-colors"
            src="/illustrations/blog-post-4.webp"
          />
          <h2 className="text-2xl font-extrabold">Deploying Next.js Apps</h2>
          <p className="text-muted-foreground">
            How to deploy your Next.js apps on Vercel.
          </p>
          <p className="text-sm text-muted-foreground">January 2, 2023</p>
          <a className="absolute inset-0" href="/blog/deploying-next-apps">
            <span className="sr-only">View Article</span>
          </a>
        </article>
      </div>
    </div>
  );
}
