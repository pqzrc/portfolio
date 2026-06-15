"use client";

import { AvatarGroup, Flex, Heading, SmartImage, SmartLink, Text } from "@/once-ui/components";
import { useState } from "react";

interface ProjectCardProps {
    slug: string;
    basePath: string;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
    priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    slug,
    basePath,
    images = [],
    title,
    content,
    description,
    avatars,
    priority = false
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleImageClick = () => {
        if(images.length > 1) {
            const nextIndex = (activeIndex + 1) % images.length;
            handleControlClick(nextIndex);

        }
    };

    const handleControlClick = (index: number) => {
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    return (
        <Flex
            fillWidth gap="m"
            direction="column">
            {images[activeIndex] && <Flex fillWidth onClick={handleImageClick}>
                <SmartImage
                    tabIndex={0}
                    radius="l"
                    alt={title}
                    aspectRatio="2140 / 1364"
                    objectFit="contain"
                    sizes="(max-width: 768px) 100vw, 960px"
                    loading={priority ? "eager" : "lazy"}
                    src={images[activeIndex]}
                    style={{
                        border: '1px solid var(--neutral-alpha-weak)',
                        ...(images.length > 1 && {
                            cursor: 'pointer',
                        }),
                    }}/>
            </Flex>}
            {images.length > 1 && (
                <Flex
                    gap="4" paddingX="s"
                    fillWidth
                    justifyContent="center">
                    {images.map((_, index) => (
                        <Flex
                            key={index}
                            onClick={() => handleControlClick(index)}
                            style={{
                                background: activeIndex === index 
                                    ? 'var(--neutral-on-background-strong)' 
                                    : 'var(--neutral-alpha-medium)',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            fillWidth
                            height="2">
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex
                mobileDirection="column"
                fillWidth paddingX="s" paddingTop="12" paddingBottom="24" gap="l">
                {title && (
                    <Flex
                        flex={5}>
                        <Heading
                            as="h2"
                            wrap="balance"
                            variant="heading-strong-xl">
                            {title}
                        </Heading>
                    </Flex>
                )}
                {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                    <Flex
                        flex={7} direction="column"
                        gap="16">
                        {avatars?.length > 0 && (
                            <AvatarGroup
                                avatars={avatars}
                                size="m"
                                reverseOrder/>
                        )}
                        {description?.trim() && (
                            <Text
                                wrap="balance"
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                        {content?.trim() && (
                            <SmartLink
                                suffixIcon="chevronRight"
                                style={{margin: '0', width: 'fit-content'}}
                                href={`/${basePath}/${slug}`}>
                                    <Text
                                        variant="body-default-s">
                                       Voir le projet
                                    </Text>
                            </SmartLink>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};
