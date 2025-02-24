import { ServicePage } from "@ui/organisms";

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
import { useTranslate } from "@hooks";

export default function Consulting() {
  const translate = useTranslate();

  const COPY = {
    TITLE: translate("services.feature.consultations.title"),
    INTRO: translate("services.feature.consultations.full.intro"),
    BODY: translate("services.feature.consultations.full.body"),
    PROCESS: [
      {
        title: translate(
          "services.feature.consultations.full.process.talk.title",
        ),
        body: translate(
          "services.feature.consultations.full.process.talk.description",
        ),
      },
      {
        title: translate(
          "services.feature.consultations.full.process.timeline.title",
        ),
        body: translate(
          "services.feature.consultations.full.process.timeline.description",
        ),
      },
      {
        title: translate(
          "services.feature.consultations.full.process.implementation.title",
        ),
        body: translate(
          "services.feature.consultations.full.process.implementation.description",
        ),
      },
    ],
    CARDS: [
      {
        title: translate("services.feature.consultations.full.card.mgmt.title"),
        description: translate(
          "services.feature.consultations.full.card.mgmt.description",
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
        title: translate(
          "services.feature.consultations.full.card.hiring.title",
        ),
        description: translate(
          "services.feature.consultations.full.card.hiring.description",
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
        title: translate(
          "services.feature.consultations.full.card.sparring.title",
        ),
        description: translate(
          "services.feature.consultations.full.card.sparring.description",
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
    WHAT_YOU_GET: translate(
      "services.feature.consultations.full.what-do-you-get",
    ),
  };
  return (
    <ServicePage
      title={COPY.TITLE}
      intro={COPY.INTRO}
      body={COPY.BODY}
      process={translate("services.feature.process")}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
      whatYouGet={COPY.WHAT_YOU_GET}
    />
  );
}
