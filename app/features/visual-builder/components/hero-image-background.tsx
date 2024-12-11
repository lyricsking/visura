import cx from "clsx";
import {
  Button,
  Container,
  Highlight,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import classes from "hero-image-background.module.css";
import {
  BaseComponentsInfoProps,
  ComponentsInfo,
} from "../types/builder.components";

type HeroImageBackgroundSettingsProps = ComponentsInfo<BaseComponentsInfoProps>;

export const heroImageBackgroundInfo: HeroImageBackgroundSettingsProps = {
  name: "hero 1",
  group: "sections",
  component: HeroImageBackground,
  settingsComponent: HeroImageBackgroundSettings,
  props: {
    onPropsUpdate: () => {},
  },
};

export function HeroImageBackground() {
  return (
    <Container className={classes.wrapper} fluid>
      <div className={classes.inner}>
        <Highlight
          component={"h3"}
          highlight={["code reviews"]}
          
          highlightStyles={{
            backgroundImage:
              "linear-gradient(45deg, var(--mantine-color-cyan-5), var(--mantine-color-indigo-5))",
            fontWeight: 700,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className={classes.title}
        >
          Automated AI code reviews for any stack
        </Highlight>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Build more reliable software with AI companion. AI is also trained
            to detect lazy developers who do nothing and just complain on
            Twitter.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            Book a demo
          </Button>
          <Button className={classes.control} size="lg">
            Purchase a license
          </Button>
        </div>
      </div>
    </Container>
  );
}

export function HeroImageBackgroundSettings() {
  return <></>;
}
