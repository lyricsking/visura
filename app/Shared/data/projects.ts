import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "logistics-ui",
    title: "Logistics UI",
    tags: ["web app", "api", "frontend", "backend", "logistics"],
    img: "https://logistics-ui.onrender.com/illustrations/in-no-time.svg",
    date: "",
    description:
      "Front facing UI for logistics API that let users to send and receives items from anywhere, without sweating.",
    techstack: [
      "NodeJS",
      "Typescript",
      "NuxtJs",
      "VueJS",
      "Typescript",
      "JWT",
      "Google API",
      "Twilio API",
      "Flutterwave Payment API",
    ],
    limitations: [
      "UI requires optimatization improvement",
      'Currently hosted a "sleeping" virtual machine, which goes to sleep every 15 minutes of inactivity.',
      "Google Place autocomplete will no longer due to biling issues",
      "Flutterwave API currently on run in demo mode.",
    ],
    client: {
      name: "Null",
      services: "Logistics",
      website: "https://logistics-ui.onrender.com",
    },
  },
  {
    id: "logistics-api",
    title: "Logistics API",
    tags: ["Backend / API"],
    img: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUwMCIgaGVpZ2h0PSIyNTAwIiB2aWV3Qm94PSIwIDAgMjU2IDI1NiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCI+PHBhdGggZD0iTTEyOCA5LjEwMmM2NS42NjUgMCAxMTguODk4IDUzLjIzMyAxMTguODk4IDExOC44OTggMCA2NS42NjUtNTMuMjMzIDExOC44OTgtMTE4Ljg5OCAxMTguODk4QzYyLjMzNSAyNDYuODk4IDkuMTAyIDE5My42NjUgOS4xMDIgMTI4IDkuMTAyIDYyLjMzNSA2Mi4zMzUgOS4xMDIgMTI4IDkuMTAyTTEyOCAwQzU3LjQyMSAwIDAgNTcuNDIxIDAgMTI4YzAgNzAuNTc5IDU3LjQyMSAxMjggMTI4IDEyOCA3MC41NzkgMCAxMjgtNTcuNDIxIDEyOC0xMjhDMjU2IDU3LjQyMSAxOTguNTc5IDAgMTI4IDBtMjAuODMgMjUuNTI0Yy0xMC40My0xLjg5Ni0zNS42NTEgMzYuNDA5LTQzLjk5NCA1OS43MzQtLjYzNCAxLjc2OS0yLjA4NiA4LjI0OS0yLjA4NiA5Ljk1NSAwIDAgNi41MzEgMTQuMDU1IDguMzQzIDE3LjM1MS0zLjAzNC0xLjU4LTkuMzIzLTEzLjc1Ni05LjMyMy0xMy43NTYtMy4wMzQgNS43ODQtNS45NDIgMzIuMzQtNC45OTQgMzcuMjcxIDAgMCA2Ljc2MiAxMC4wNjIgOS4zODcgMTIuNTc4LTMuNjAzLTEuMjAxLTkuNjcxLTkuMzU1LTkuNjcxLTkuMzU1LTEuMTM4IDMuNTA4LS45MTYgMTAuODA3LS4zNzkgMTMuMjc0IDQuNTUxIDYuNjM3IDEwLjYxOSA3LjM5NiAxMC42MTkgNy4zOTZzLTYuNjM3IDY2LjE4MSAzLjQxMyA3MS4xMTFjNi4yNTgtMS4zMjcgNy43NzUtNzMuOTU2IDcuNzc1LTczLjk1NnM3LjU4NS41NjkgOS4yOTItMS4zMjdjMy44NTYtMi42NTUgMTIuODI2LTMwLjIyNCAxMi45NTgtMzQuMjAyIDAgMC0xMC40MSAxLjk1Mi0xNS40ODcgMy45MjQgMy44MjYtMy44IDE2LjA0OS02LjM1MiAxNi4wNDktNi4zNTIgMy4zMTUtMy45NzkgMTAuMjkxLTMxLjA0NyAxMC45OTQtMzkuMzkxLjE3Ni0yLjA5My41ODMtNC42NTcuMjY4LTguMzk4IDAgMC05Ljk0MSAyLjE3Ny0xMi4wMTQgMS40MjQgMi4xMDQtLjIzNyAxMi4yNjMtNC4xNCAxMi4yNjMtNC4xNCAxLjgwMS0xNi4yMTMgMi4zNTgtNDIuMDkxLTMuNDEzLTQzLjE0MXptLTM2LjM4IDE3MS42OTFjLS43OTUgMTkuNDk2LTEuMjk0IDI1LjAwNC0yLjExNSAyOS42MDEtLjM3OS44NTctLjc1OC45OTctMS4xMzgtLjA5NS0zLjQ3Ny0xNS45OTItMy4yMjQtMTM2LjQzOCAzNi40MDktMTkxLjI0MS0yMy4wNSA0Mi4wOTItMzMuNTM1IDEyMi44NjEtMzMuMTU2IDE2MS43MzV6IiBmaWxsPSIjMzMzIi8+PC9zdmc+",
    date: "",
    description:
      "Logistics API backend built on top of NodeJS. This API let users register and login into their account, create and monitor shipments of any size, for a same day, next day or scheduled delivery anywhere. This API is directly consumed via Logistics UI.",
    techstack: [
      "NodeJS",
      "Typescript",
      "JWT",
      "Google API",
      "Twilio API",
      "Flutterwave Payment API",
    ],
    limitations: [
      "Google Place autocomplete will no longer due to biling issues",
      "Flutterwave API currently on run in demo mode.",
    ],
    client: {
      name: "Null",
      services: "Logistics",
      website: "https://logistics-5wxn.onrender.com",
    },
  },
];
