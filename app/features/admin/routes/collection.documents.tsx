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
  Box,
  Center,
  Modal,
  ScrollArea,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import { useDisclosure } from "@mantine/hooks";
import page from "~/shared/components/ui/page";
import { DocumentForm } from "~/features/collection/components/document-form";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const currentUrl = new URL(request.url);
  const id = currentUrl.searchParams.get("id");
  const { model } = params;
  // Fetch page if pageId is provided and valid
  const docsReqUrl = new URL(`http://localhost:3000/api/documents/${model}`);
  // if (id) {
  //   docsReqUrl.searchParams.set("id", id);
  // }
  return await (await fetch(docsReqUrl, { method: "GET" })).json();
}

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export default function Documents() {
  const { data, pagination } = useLoaderData<typeof loader>();

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [isOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const rows = data.map((element: any) => (
    <Table.Tr
      key={element.name}
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
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

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

      {data && data.length > 0 ? (
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
                <Table.Th />
                <Table.Th>Element position</Table.Th>
                <Table.Th>Element name</Table.Th>
                <Table.Th>Symbol</Table.Th>
                <Table.Th>Atomic mass</Table.Th>
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
        <DocumentForm />
      </Modal>
    </Stack>
  );
}
