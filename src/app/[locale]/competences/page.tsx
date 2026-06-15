import { redirect } from 'next/navigation';
import { baseURL, renderContent } from '@/app/resources';

interface CompetencesParams {
	params: Promise<{
		locale: string;
	}>;
}

export async function generateMetadata(
	{ params }: CompetencesParams
) {
	const { locale } = await params;
	
	const { competences } = renderContent();

	const title = competences.title;
	const description = competences.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/${locale}/competences/`,
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

export default function Competences() {
	redirect('/competences');
}
