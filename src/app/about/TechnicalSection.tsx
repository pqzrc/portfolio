import { Flex, Heading, SmartImage, Text } from "@/once-ui/components";
import { about } from "@/app/about/aboutData";

export function TechnicalSection() {
  if (!about.technical.display) {
    return null;
  }

  return (
    <>
      <Heading
        as="h2"
        id={about.technical.title}
        variant="display-strong-s"
        marginBottom="m"
      >
        {about.technical.title}
      </Heading>
      {about.technical.skills.map((skill) => (
        <Flex key={skill.title} direction="column" gap="s" marginBottom="40" fillWidth>
          <Text id={skill.title} variant="heading-strong-m">
            {skill.title}
          </Text>

          <Flex gap="m" fillWidth wrap>
            {skill.images.map((image) => (
              <Flex
                key={image.src}
                direction="column"
                alignItems="center"
                gap="8"
                style={{ width: "92px" }}
              >
                <SmartImage
                  src={image.src}
                  alt={image.alt}
                  sizes="80px"
                  objectFit="contain"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "var(--radius-s)",
                  }}
                />
                <Text
                  as="span"
                  variant="body-default-xs"
                  onBackground="neutral-weak"
                  align="center"
                  style={{ lineHeight: "1.2", minHeight: "2.4em" }}
                >
                  {image.alt}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ))}
    </>
  );
}
