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
  TITLE: translate("services.feature.consultations.title"),
  INTRO: translate("services.feature.consultations.intro"),
  BODY: translate("services.feature.consultations.body"),
  PROCESS: [
    {
      title: translate("services.feature.consultations.process.talk.title"),
      body: translate(
        "services.feature.consultations.process.talk.description",
      ),
    },
    {
      title: translate("services.feature.consultations.process.timeline.title"),
      body: translate(
        "services.feature.consultations.process.timeline.description",
      ),
    },
    {
      title: translate(
        "services.feature.consultations.process.implementation.title",
      ),
      body: translate(
        "services.feature.consultations.process.implementation.description",
      ),
    },
  ],
  CARDS: [
    {
      title: translate("services.feature.consultations.card.mgmt.title"),
      description: translate(
        "services.feature.consultations.card.mgmt.description",
      ),
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
      title: translate("services.feature.consultations.card.hiring.title"),
      description: translate(
        "services.feature.consultations.card.hiring.description",
      ),
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
      title: translate("services.feature.consultations.card.sparring.title"),
      description: translate(
        "services.feature.consultations.card.sparring.description",
      ),
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
      process={translate("services.feature.process")}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
    />
  );
}
