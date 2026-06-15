import { getPosts } from '@/app/utils/utils';
import { Flex } from '@/once-ui/components/Flex';

import { ProjectCard } from '@/components/ProjectCard';

interface ProjectsProps {
    range?: [number, number?];
}

export function Projects({ range }: ProjectsProps) {
    const allProjects = getPosts(['src', 'app', 'work', 'projects', 'fr']);

    const sortedProjects = allProjects.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedProjects = range
        ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
        : sortedProjects;

    return (
        <Flex
            fillWidth gap="xl" marginBottom="40" paddingX="l"
            direction="column">
            {displayedProjects.map((post, index) => (
                <ProjectCard
                    key={post.slug}
                    basePath="work"
                    slug={post.slug}
                    priority={index === 0}
                    images={post.metadata.images}
                    title={post.metadata.title}
                    description={post.metadata.summary}
                    content={post.content}
                    avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}/>
            ))}
        </Flex>
    );
}
