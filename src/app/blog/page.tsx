import { getPosts } from '@/app/utils/utils';
import { Flex } from '@/once-ui/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL } from '@/app/resources';

export async function generateMetadata() {
    const title = "Blog";
    const description = "Articles et réflexions sur le développement, le design et la technologie.";
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/blog/`,
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

export default function Blog() {
    const allBlogs = getPosts(['src', 'app', 'blog', 'posts', 'fr']);
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
                        headline: "Blog",
                        description: "Articles et réflexions sur le développement, le design et la technologie.",
                        url: `https://${baseURL}/blog`,
                        image: `${baseURL}/og?title=Blog`,
                        author: {
                            '@type': 'Person',
                            name: person.name,
                        },
                        hasPart: allBlogs.map(post => ({
                            '@type': 'CreativeWork',
                            headline: post.metadata.title,
                            description: post.metadata.summary,
                            url: `https://${baseURL}/blog/${post.slug}`,
                            image: `${baseURL}/${post.metadata.image}`,
                        })),
                    }),
                }}
            />
            <Posts />
        </Flex>
    );
} 