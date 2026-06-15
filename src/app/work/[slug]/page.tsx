import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'
import { baseURL } from '@/app/resources';
import { formatDate } from '@/app/utils/formatDate';
import ScrollToHash from '@/components/ScrollToHash';

interface WorkParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = getPosts(['src', 'app', 'work', 'projects', 'fr']);
    return posts.map(post => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: WorkParams) {
	const { slug } = await params;
	const post = getPosts(['src', 'app', 'work', 'projects', 'fr']).find((post) => post.slug === slug)
	
	if (!post) {
		return
	}

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		images,
		image,
		team,
	} = post.metadata
	const ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		images,
		team,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/work/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export default async function Project({ params }: WorkParams) {
	const { slug } = await params;
	const post = getPosts(['src', 'app', 'work', 'projects', 'fr']).find((post) => post.slug === slug)

	if (!post) {
		notFound()
	}

    const person = { name: 'Rénald DESIRE' };

	const avatars = post.metadata.team?.map((member) => ({
        src: member.avatar,
    })) || [];

	return (
		<Flex as="section"
			fillWidth maxWidth="m"
			direction="column" alignItems="center"
			gap="l">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `https://${baseURL}${post.metadata.image}`
							: `https://${baseURL}/og?title=${post.metadata.title}`,
							url: `https://${baseURL}/work/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Flex
				fillWidth maxWidth="xs" gap="16"
				direction="column">
				<Button
					href="/work"
					variant="tertiary"
					size="s"
					prefixIcon="chevronLeft">
					Projets
				</Button>
				<Heading
					variant="display-strong-s">
					{post.metadata.title}
				</Heading>
			</Flex>
			{post.metadata.images.length > 0 && (
				<SmartImage
					aspectRatio="2140 / 1364"
					objectFit="contain"
					radius="m"
					alt="image"
					sizes="(max-width: 768px) 100vw, 960px"
					loading="eager"
					src={post.metadata.images[0]}/>
			)}
			<Flex style={{margin: 'auto'}}
				as="article"
				maxWidth="xs" fillWidth
				direction="column">
				<Flex
					gap="12" marginBottom="24"
					alignItems="center">
					{ post.metadata.team && (
						<AvatarGroup
							reverseOrder
							avatars={avatars}
							size="m"/>
					)}
					<Text
						variant="body-default-s"
						onBackground="neutral-weak">
						{formatDate(post.metadata.publishedAt)}
					</Text>
				</Flex>
				<CustomMDX source={post.content} />
			</Flex>
			<ScrollToHash />
		</Flex>
	)
}
