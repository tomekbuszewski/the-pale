import { ServicePage } from "@ui/organisms";
import { translate } from "@utils/translate";

import {
  airtable,
  atlassian,
  clickup,
  confluence,
  jira,
  meet,
  miro,
  monday,
  notion,
  slack,
  teams,
  trello,
  zapier,
  zoom,
} from "../icons";

const COPY = {
  TITLE: translate("services.feature.consultations.title") as string,
  INTRO: translate("services.feature.consultations.intro") as string,
  BODY: translate("services.feature.consultations.body") as string[],
  PROCESS: [
    {
      title: translate(
        "services.feature.consultations.process.talk.title",
      ) as string,
      body: translate(
        "services.feature.consultations.process.talk.description",
      ) as string,
    },
    {
      title: translate(
        "services.feature.consultations.process.timeline.title",
      ) as string,
      body: translate(
        "services.feature.consultations.process.timeline.description",
      ) as string,
    },
    {
      title: translate(
        "services.feature.consultations.process.implementation.title",
      ) as string,
      body: translate(
        "services.feature.consultations.process.implementation.description",
      ) as string,
    },
  ],
  CARDS: [
    {
      title: translate(
        "services.feature.consultations.card.mgmt.title",
      ) as string,
      description: translate(
        "services.feature.consultations.card.mgmt.description",
      ) as string[],
      icons: [
        miro,
        airtable,
        jira,
        confluence,
        clickup,
        monday,
        notion,
        trello,
        zapier,
        atlassian,
      ],
    },
    {
      title: translate(
        "services.feature.consultations.card.hiring.title",
      ) as string,
      description: translate(
        "services.feature.consultations.card.hiring.description",
      ) as string[],
      icons: [
        meet,
        zoom,
        slack,
        teams,
        atlassian,
        confluence,
        meet,
        zoom,
        slack,
        teams,
        atlassian,
        confluence,
      ],
    },
    {
      title: translate(
        "services.feature.consultations.card.sparring.title",
      ) as string,
      description: translate(
        "services.feature.consultations.card.sparring.description",
      ) as string[],
      icons: [
        meet,
        zoom,
        slack,
        teams,
        meet,
        zoom,
        slack,
        teams,
        meet,
        zoom,
        slack,
        teams,
      ],
    },
  ],
};

export default function Consulting() {
  return (
    <ServicePage
      title={COPY.TITLE}
      intro={COPY.INTRO}
      body={COPY.BODY}
      process={translate("services.feature.process") as string}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
    />
  );
}
