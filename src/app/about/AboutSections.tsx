import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  Tag,
  Text,
} from "@/once-ui/components";
import { TechnicalSection } from "@/app/about/TechnicalSection";
import { about, person, social } from "@/app/about/aboutData";
import styles from "@/components/about/about.module.scss";

function ProfileAside() {
  return (
    <Flex
      className={styles.avatar}
      minWidth="160"
      paddingX="l"
      paddingBottom="xl"
      gap="m"
      flex={3}
      direction="column"
      alignItems="center"
    >
      <Avatar src={person.avatar} size="xl" />
      <Flex gap="8" alignItems="center">
        <Icon onBackground="accent-weak" name="globe" />
        {person.location}
      </Flex>
      {person.languages.length > 0 && (
        <Flex wrap gap="8">
          {person.languages.map((language) => (
            <Tag key={language} size="l">
              {language}
            </Tag>
          ))}
        </Flex>
      )}
    </Flex>
  );
}

function IntroSection() {
  return (
    <>
      <Flex
        id={about.intro.title}
        fillWidth
        minHeight="160"
        direction="column"
        justifyContent="center"
        marginBottom="32"
      >
        <Heading className={styles.textAlign} variant="display-strong-xl">
          {person.name}
        </Heading>
        <Text
          className={styles.textAlign}
          variant="display-default-xs"
          onBackground="neutral-weak"
        >
          {person.role}
        </Text>
        {social.length > 0 && (
          <Flex
            className={styles.blockAlign}
            paddingTop="20"
            paddingBottom="8"
            gap="8"
            wrap
          >
            {social.map((item) => (
              <Button
                key={item.name}
                href={item.link}
                prefixIcon={item.icon}
                label={item.name}
                size="s"
                variant="tertiary"
                download={item.download || undefined}
              />
            ))}
          </Flex>
        )}
      </Flex>

      {about.intro.display && (
        <Flex
          direction="column"
          textVariant="body-default-l"
          fillWidth
          gap="m"
          marginBottom="xl"
        >
          {about.intro.description}
        </Flex>
      )}
    </>
  );
}

function WorkSection() {
  if (!about.work.display) {
    return null;
  }

  return (
    <>
      <Heading
        as="h2"
        id={about.work.title}
        variant="display-strong-s"
        marginBottom="m"
      >
        {about.work.title}
      </Heading>
      <Flex direction="column" fillWidth gap="l" marginBottom="40">
        {about.work.experiences.map((experience, index) => (
          <Flex
            key={`${experience.company}-${experience.role}-${index}`}
            fillWidth
            direction="column"
          >
            <Flex
              fillWidth
              mobileDirection="column"
              justifyContent="space-between"
              alignItems="flex-start"
              gap="4"
              marginBottom="4"
            >
              <Text id={experience.company} variant="heading-strong-l">
                {experience.company}
              </Text>
              <Text variant="heading-default-xs" onBackground="neutral-weak">
                {experience.timeframe}
              </Text>
            </Flex>
            <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
              {experience.role}
            </Text>
            <Flex as="ul" direction="column" gap="16">
              {experience.achievements.map((achievement, achievementIndex) => (
                <Text
                  as="li"
                  variant="body-default-m"
                  key={`${experience.company}-${achievementIndex}`}
                >
                  {achievement}
                </Text>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
}

function StudiesSection() {
  if (!about.studies.display) {
    return null;
  }

  return (
    <>
      <Heading
        as="h2"
        id={about.studies.title}
        variant="display-strong-s"
        marginBottom="m"
      >
        {about.studies.title}
      </Heading>
      <Flex direction="column" fillWidth gap="l" marginBottom="40">
        {about.studies.institutions.map((institution) => (
          <Flex key={institution.name} fillWidth direction="column" gap="4">
            <Text id={institution.name} variant="heading-strong-l">
              {institution.name}
            </Text>
            <Text variant="body-default-m">{institution.description}</Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}

export function AboutSections() {
  return (
    <Flex>
      <Flex fillWidth mobileDirection="column" justifyContent="center">
        <ProfileAside />
        <Flex
          className={styles.blockAlign}
          fillWidth
          flex={9}
          maxWidth={40}
          direction="column"
        >
          <IntroSection />
          <WorkSection />
          <StudiesSection />
          <TechnicalSection />
        </Flex>
      </Flex>
    </Flex>
  );
}
