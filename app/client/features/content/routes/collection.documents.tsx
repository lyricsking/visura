import { useState } from "react";
import {
  Table,
  Checkbox,
  Divider,
  Stack,
  Title,
  Flex,
  Button,
  Text,
  Modal,
  ScrollArea,
} from "@mantine/core";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import { DocumentForm } from "~/features/collection/components/document-form";
import formDataToObject from "~/shared/utils/form-data-to-object";
import { head } from "lodash";

export async function action({ params, request }: ActionFunctionArgs) {
  const body = formDataToObject(await request.formData());

  const { model } = params;

  const docsReqUrl = new URL(`http://localhost:3000/api/documents/${model}`);
  const c = await fetch(docsReqUrl, {
    body: JSON.stringify(body),
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return c;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { model } = params;

  const collectionReqUrl = new URL("http://localhost:3000/api/collections");
  model && collectionReqUrl.searchParams.set("model", model);

  // Fetch page if pageId is provided and valid
  const docsReqUrl = new URL(`http://localhost:3000/api/documents/${model}`);

  const [collection, docs] = await Promise.all([
    await fetch(collectionReqUrl, { method: "GET" }),
    await fetch(docsReqUrl, { method: "GET" }),
  ]);

  return { collection: await collection.json(), docs: await docs.json() };
}

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export default function Documents() {
  const { collection, docs } = useLoaderData<typeof loader>();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [isOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const rows: any[] = [];
  const heads: any[] = [];

  docs.data.forEach((element: any) => {
    const { _id, __v, ...fields } = element;

    rows.push(
      <Table.Tr
        key={_id}
        bg={
          selectedRows.includes(element.position)
            ? "var(--mantine-color-blue-light)"
            : undefined
        }
      >
        <Table.Td>
          <Checkbox
            aria-label="Select row"
            checked={selectedRows.includes(element.position)}
            onChange={(event) =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, element.position]
                  : selectedRows.filter(
                      (position) => position !== element.position
                    )
              )
            }
          />
        </Table.Td>

        {Object.entries(fields).map(([key, value]) => {
          heads.indexOf(key) < 0 && heads.push(key);

          return <Table.Td>{String(value)}</Table.Td>;
        })}
      </Table.Tr>
    );
  });

  return (
    <Stack gap={0} h={"calc(100vh - 150px)"} w={"100%"}>
      <Title order={4} c={"dark"} mt={"1.5rem"} p={"xs"}>
        Documents Browser
      </Title>

      <Divider size={"xs"} mt={"0.5rem"} />

      <Flex direction={"row"} justify={"end"} mt={"xl"} p={"sm"}>
        <Button
          children="Create Record"
          size="compact-sm"
          onClick={openModal}
        />
      </Flex>

      {docs.data && docs.data.length > 0 ? (
        <Table.ScrollContainer minWidth={500} p={"sm"}>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withRowBorders
            withColumnBorders
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={"5%"} />
                {heads.map((head) => (
                  <Table.Th>{head}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          h={"calc(100vh - 120px)"}
          className="border"
          m={"sm"}
          p={"sm"}
        >
          <Text
            c={"dimmed"}
            children="No record found for the selected collection."
            size={"xl"}
            ta={"center"}
            mx="auto"
          />
          <Text
            c={"dimmed"}
            children="Consider adding a new record."
            size={"xl"}
            ta={"center"}
            mx="auto"
          />
        </Flex>
      )}

      {/* Document creation modal */}
      <Modal
        opened={isOpened}
        onClose={closeModal}
        title="Create Document"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <DocumentForm schema={collection.data[0]} />
      </Modal>
    </Stack>
  );
}
