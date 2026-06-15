import { notFound, redirect } from 'next/navigation'
import { getPosts } from '@/app/utils/utils'
import { baseURL } from '@/app/resources'
import CompetenceSlideshow from './CompetenceSlideshow'
import { getCompetenceSupport } from '../competenceSupport'

interface CompetenceParams {
    params: Promise<{
        slug: string;
    }>;
}

const oralCompetenceSlugs = ['01-realiser', '02-optimiser', '06-collaborer'] as const;

function isOralCompetenceSlug(slug: string) {
    return oralCompetenceSlugs.some((oralSlug) => oralSlug === slug);
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = getPosts(['src', 'app', 'competences', 'posts', 'fr']);
    return posts
        .filter((post) => isOralCompetenceSlug(post.slug))
        .map(post => ({
            slug: post.slug,
        }));
}

export async function generateMetadata({ params }: CompetenceParams) {
	const { slug } = await params;
    if (!isOralCompetenceSlug(slug)) {
        return
    }

	const post = getPosts(['src', 'app', 'competences', 'posts', 'fr']).find((post) => post.slug === slug)
	
	if (!post) {
		return
	}

	const {
		title,
		summary: description,
		image,
	} = post.metadata
	const ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			url: `https://${baseURL}/competences/${post.slug}`,
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

export default async function Competence({ params }: CompetenceParams) {
	const { slug } = await params;
    if (!isOralCompetenceSlug(slug)) {
        redirect('/competences')
    }

	const post = getPosts(['src', 'app', 'competences', 'posts', 'fr']).find((post) => post.slug === slug)
    const support = getCompetenceSupport(slug)

	if (!post || !support) {
		notFound()
	}

	return <CompetenceSlideshow post={post} support={support} />
}
