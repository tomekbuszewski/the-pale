import { Link } from "react-router";
import { SectionWrapper, Separator, Text } from "@ui/atoms";
import { ArticleHeader, List } from "@ui/molecules";
import clsx from "clsx";

import globals from "../services/service.module.scss";

const COPY = {
  INTRO: (
    <>
      This page, inspired by
      <Link to="https://wesbos.com/uses">Wes Bos’ /uses</Link>, details the
      hardware and software I use on a daily basis.
    </>
  ),

  SECTIONS: [
    {
      TITLE: "Hardware",
      DESCRIPTION:
        "I am a Mac guy for years. My first iMac with i5 is still around (although shut down), as well as my second iMac 5K with i9 and whopping 128GB of RAM (also shut down). I try not to replace my hardware too often, simply because I don’t need cutting edge performance, and yearly bumps aren’t worth the money.",
      ITEMS: [
        <>
          <b>MacBook Pro M1 Max 16</b> bought in 2022 is my main work station.
          Previously, I had a 27” iMac with i9 processor. Switch to M1 was kind
          of terrifying, because at first I thought my apps don’t build. Only
          after googling “node doesn’t build on m1” I realized that build times
          went down to under a second.
        </>,
        <>
          <b>Apple Studio Display 27”</b> with nano-texture glass. I was always
          a big display guy, so getting this on a good deal was a no-brainer.
          While not the best display ever (this award goes to my glossy iMac
          5K), I do appreciate its sharpness and near-perfect sunlight handling.
          I have large windows in my office, and that’s the only screen that is
          fully readable at all times.{" "}
        </>,
        <>
          <b>LG 28MQ780-B</b> is my second monitor. Previously I had a BenQ one,
          but it has terrible ghosting. Initially I wanted a 4K one, but this LG
          bad boy is basically two displays put on top of each other, so, yeah.
          I use it only for coding (terminal, tests, documentation), so it’s
          perfect.
        </>,
        <>
          <b>iPhone 14 Pro</b> is my iPhone X replacement. I bought it purely
          for the island thingy, but apart from that, kinda meh. I mean, it’s an
          iPhone. Great camera that can double as a webcam works wonders for
          recording my videos though.
        </>,
        <>
          <b>ZSA Moonlander MK1</b> is my latest keyboard. I went into computers
          to type, so when few years ago I realized I am still using this boring
          Apple Keyboard, I wanted something more exciting. I went through
          Keychrons (which breaks easily, for some reason), had a Nuphy Air,
          some Epomaker and even a Logitech POP. Then a colleague suggested the
          Moonlander, which is a split keyboard. And I fell in love. It’s a
          tough relationship, given the price tag and 20 years of muscle memory,
          but worth it.
        </>,
        <>
          <b>Logitech MX Master 3</b> is the mouse I thought I’ll never use.
          Apple Magic Mouse had all these touch miracles that I fell head over
          heels for, but eventually its poor ergonomics took its toll on my hand
          and wrist. MX3 is extremely comfortable, has tons of configuration
          options (down to the physical wheel behavior) and its battery (after 4
          years) still keeps up.
        </>,
      ],
    },
    {
      TITLE: "Software",
      DESCRIPTION:
        "I try to keep my software minimalistic. That means, one application for one thing, but I don’t do that much apart from work and music here.",
      ITEMS: [
        <>
          <b>IntelliJ IDEA</b> is my IDE of choice. It has everything I need,
          including great introspection, intellisense, comfortable jumping
          between files, classes, interfaces, whatever. And a great window
          manager that allows you to split a pane and put it somewhere else on
          your desktop. You name it, IDEA has it.
        </>,
        <>
          <b>Neovim</b> (Lazyvim variant) for quick edits. While I am by no
          means fluent in Vim, handling everything by keyboard is strangely
          comfortable. I still am not fully convinced to use Vim Mode in
          IntelliJ, but I am getting there.
        </>,
        <>
          <b>Vivaldi</b> is my recent browser of choice. I&#39;ve left Chrome
          after using it for over 15 years, simply due to lack of features like
          workspaces and decent theming. As for the other popular browsers, Arc
          didn’t click due to navigation, Firefox due to poor JS tools (although
          I still use it for debugging grids) and rendering, Safari due to,
          well, being Safari.
        </>,
        <>
          <b>oh-my-zsh</b> for my terminal configuration. It has nice themes,
          but I use it like once every few days, because 99% of my terminal
          things are happening inside IntelliJ.
        </>,
        <>
          <b>Alacritty</b> for the terminal emulator. I honestly don&#39;t know
          why I am using it instead of a regular terminal shipped with the
          system, as I only do one thing there: type <code>zellij</code> and
          press <code>[return]</code>. (Yes, technically these are two things.)
        </>,
        <>
          <b>Obsidian</b> for writing. I’ve used iA Writer, but Obsidian has
          more customizations and themes. I store the vault on iCloud, so
          there’s the same sync mechanism I had previously.
        </>,
        <>
          <b>Sketch</b> for all the UI design. I&#39;ve really wanted to like
          Figma and even used it for sometime, did some projects and was happy,
          but eventually I just decided to go back to Sketch. It&#39;s what I am
          familiar and productive with the most. And it&#39;s a native app,
          which also comes in handy, especially when I work with a lot of
          external assets.
        </>,
        <>
          <b>Affinity Designer</b> and <b>Photo</b> for more detailed designs. I
          still am learning these tools, but Adobe’s rates and licence handling
          just doesn’t sit right with me.
        </>,
      ],
    },
    {
      TITLE: "Music",
      DESCRIPTION: (
        <>
          I spend a lot of time listening to music, and in high school I fell
          into the headphones rabbit hole. Luckily, I was able to catch that
          rabbit! Oh, and check{" "}
          <Link to="https://rateyourmusic.com/~_tomek" target="_blank">
            my RateYourMusic profile
          </Link>{" "}
          for the albums I like.
        </>
      ),
      ITEMS: [
        <>
          <b>Focal Stellia</b> headphones are basically the pinnacle of music
          listening. Perfect in every detail, from form (I can wear them even
          during the Summer for hours without discomfort) to factor. I would
          like to also have Focal Utopias, but given the noise outside my
          apartment, open-back headphones sadly aren’t an option.
        </>,
        <>
          <b>Cayin iHA-6</b> paired with <b>Cayin iDAC6-MK2</b> are my
          headphones amplifier and digital-analogue converter. I’ve switched
          from JDS Atom and Topping D10 and it’s night and day.
        </>,
        <>
          Apple Music offers lossless, vast library. Simple as that. I’ve used
          Qobuz earlier, which had this hand-curated feel, but too much music
          was missing. I mean, Apple Music even has{" "}
          <Link
            target="_blank"
            to="https://music.apple.com/pl/album/information-overload-unit/1562887788"
          >
            obscure Australian industrial from the 80s
          </Link>{" "}
          (warning: early industrial is a hole you might emerge after ten years)
          or an{" "}
          <Link
            target="_blank"
            to="https://music.apple.com/pl/album/ripe-4-luv/1321204701"
          >
            early Young Guv EP
          </Link>
          . Come on!
        </>,
      ],
    },
    {
      TITLE: "Gaming",
      DESCRIPTION: "I recently realized that I play games for almost 30 years.",
      ITEMS: [
        <>
          <b>PS5</b> is a must-have. I am a PlayStation fan ever since the first
          one (which I got in second grade).
        </>,
        <>
          <b>Xbox Series X</b> is something I got due to sheer “I collect these”
          feeling. After 360 I feel that Microsoft really lost the ball. Buying
          studios and whipping mediocre games (looking at you, latest Forza)
          doesn’t really help here.
        </>,
        <>
          <b>Nintendo Switch</b> is a special thing. Its hardware is basically
          Wii U, which was too little even then it launched, but the games. Oh,
          the games. Mario Kart 8 is enough to recommend the entire thing, with
          Metroid Dread, the two Zeldas and other Mario titles to boot.
        </>,
        <>
          <b>PC</b> with RTX 3080Ti and Ryzen 7. I was against gaming on PC for
          years, mostly due to “I work with computers, so I don’t want them on
          my free time”, but the games not available on consoles are just too
          much to ignore. From indies, to oldies (I actually bought the rig to
          play classic Fallout games), to titles better adjusted for mouse
          (shooters, RPGs, aRPGs). Fun fact: the first game I launched on my new
          computer was Quake II, which I wanted to play for over 15 years.
        </>,
        <>
          <b>Beelink SER5</b> is a tiny computer I use as an emulation and media
          station. My old LG OLED TV doesn’t work well with streaming apps, some
          (like Canal+) don’t have dedicated apps at all, so using this is a
          perfect solution. Plus, since I don’t have my PS1 with me, I can still
          play the games (and some PS2 titles as well, but not as many).
        </>,
      ],
    },
  ],
};

export default function Consulting() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Uses" />

      <section className={clsx(globals.mainSection)}>
        <Text variant="article-body">{COPY.INTRO}</Text>
        <Separator />
      </section>

      <section className={clsx(globals.mainSection, globals.full)}>
        {COPY.SECTIONS.map(({ TITLE, DESCRIPTION, ITEMS }) => (
          <List
            key={TITLE}
            columns={1}
            description={DESCRIPTION}
            title={TITLE}
            items={ITEMS}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
