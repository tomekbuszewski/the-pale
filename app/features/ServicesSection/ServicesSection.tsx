import {Text} from "@ui/atoms";
import { ServicesSection as Main } from "@ui/organisms";

import ConsultationsIcon from "./assets/consultations.svg?react";
import FrontendIcon from "./assets/frontend.svg?react";
import WebsiteIcon from "./assets/website.svg?react";

const items = [
  {
    title: "Website<br />Design",
    icon: <WebsiteIcon />,
    onClick: () => null,
    children: (
      <>
        <Text>
          Full-Cycle Web Solutions: Design, Development, Delivery.
        </Text>
        <Text>
          I provide a seamless experience from initial design concepts to
          the final product. Whether you’re launching a new business or
          revamping an existing site, I ensure everything works perfectly.
        </Text>
      </>
    ),
    additional: [
      "Unique, tailor-made designs that reflect your brand and vision",
      "Clean, efficient code for optimal performance and scalability",
      "Code stored in a private repository with full access and the option to take ownership",
      "Preview available for every change, ensuring everything looks perfect at all times",
      "Thorough testing for performance, compatibility, and usability",
      "Hosting, domains and deployments taken care of, with the option to transfer ownership free of charge",
    ],
  },
  {
    title: "Front-end<br />Development",
    icon: <FrontendIcon />,
    onClick: () => null,
    children: (
      <>
        <Text>
          Have a design? I’ll make it a reality with clean, functional
          front-end code.
        </Text>
        <Text>
          Tech choices are tailored to your project to ensure scalability
          and smooth performance.
        </Text>
      </>
    ),
    additional: [
      "Design consultations and suggest improvements for smoother implementation",
      "Front-end developed specifically to meet your unique needs",
      "Code stored in a repository with full access for future ownership",
      "Preview available for live changes before they go live",
      "Automated end-to-end tests to ensure everything works flawlessly after changes",
    ],
  },
  {
    title: "Project<br />Consulting",
    icon: <ConsultationsIcon />,
    onClick: () => null,
    children: (
      <>
        <Text>
          With experience as an engineering manager and tech lead, I
          understand both technical and human aspects of team dynamics.
        </Text>
        <Text>
          I offer consulting to help your team thrive and reach its goals.
        </Text>
      </>
    ),
    additional: [
      "Guidance on tech and team management",
      "Support with recruitment and candidate assessments",
      "Code reviews to ensure clean, efficient, and maintainable codebase",
      "Discuss ideas and solve technical challenges as your sparring partner",
    ],
  },
]

export default function ServicesSection() {return <Main items={items} />}
