import { getPosts } from '@/app/utils/utils';
import { Flex } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { baseURL } from '@/app/resources';

export async function generateMetadata() {
    const title = "Mes Projets";
    const description = "Une sélection de mes projets de développement et de design.";
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/work/`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Work() {
    const allProjects = getPosts(['src', 'app', 'work', 'projects', 'fr']);
    const person = { name: 'Rénald DESIRE' };

    return (
        <Flex
			fillWidth maxWidth="m"
			direction="column">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        headline: "Mes Projets",
                        description: "Une sélection de mes projets de développement et de design.",
                        url: `https://${baseURL}/work`,
                        image: `https://${baseURL}/og?title=Design%20Projects`,
                        author: {
                            '@type': 'Person',
                            name: person.name,
                        },
                        hasPart: allProjects.map(project => ({
                            '@type': 'CreativeWork',
                            headline: project.metadata.title,
                            description: project.metadata.summary,
                            url: `https://${baseURL}/work/${project.slug}`,
                            image: `${baseURL}/${project.metadata.image}`,
                        })),
                    }),
                }}
            />
            <Projects />
        </Flex>
    );
}
