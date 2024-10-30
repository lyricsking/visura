import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Progress } from "@radix-ui/react-progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Form } from "@remix-run/react";
import {
  Link,
  ListFilter,
  PlusCircle,
  Table,
  MoreHorizontal,
  Share2Icon,
  Trash2Icon,
  File,
} from "lucide-react";
import { Badge } from "~/components/badge";
import Button, { buttonVariants } from "~/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "~/components/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/table";
import { formatDateByParts } from "~/core/utils/date";
import { cn } from "~/core/utils/util";
export const handle = {
  breadcrumb: {
    id: "post-list",
    label: "Posts",
  },
};

export default function Posts({ posts }: any) {
  //const data = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Your Posts</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Introducing Our Dynamic Orders Dashboard for Seamless Management
              and Insightful Analysis.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              to={`edit`}
              className={cn(
                buttonVariants(),
                "bg-indigo-500 text-white shadow-md"
              )}
            >
              Create New Post
            </Link>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-4xl">$1,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +25% from last week
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">$5,329</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last month
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
      </div>
      <Tabs defaultValue="all">
        <div className="grid grid-cols-2 items-center justify-between gap-x-4">
          <TabsList className="">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-flow-col-dense items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only md:not-sr-only md:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only md:not-sr-only md:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1 bg-indigo-400 text-white">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only md:not-sr-only md:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0 w-full">
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Excerpt
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Views
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Published on
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell className="hidden sm:table-cell">
                        <img
                          alt="Post image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          width="64"
                          src="/placeholder.svg"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {post.published ? "Active" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-medium">
                        {post.excerpt}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">30</TableCell>
                      <TableCell className="hidden md:table-cell w-44 text-center">
                        {post.publishedOn
                          ? formatDateByParts(new Date(post.publishedOn))
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Form method="post">
                                <input
                                  name="id"
                                  value={post._id}
                                  className="hidden"
                                />
                                <Button
                                  variant="ghost"
                                  type="submit"
                                  name="action"
                                  value="publish"
                                  className="p-0 font-normal"
                                >
                                  <Share2Icon className="mr-2 h-4 w-4" />
                                  Publish
                                </Button>
                              </Form>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
