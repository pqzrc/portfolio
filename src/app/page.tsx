import React from 'react';

import { Arrow } from '@/once-ui/components/Arrow';
import { Avatar } from '@/once-ui/components/Avatar';
import { Button } from '@/once-ui/components/Button';
import { Flex } from '@/once-ui/components/Flex';
import { Heading } from '@/once-ui/components/Heading';
import { RevealFx } from '@/once-ui/components/RevealFx';
import { SmartImage } from '@/once-ui/components/SmartImage';
import { Text } from '@/once-ui/components/Text';

import { baseURL } from '@/app/resources'; 

export async function generateMetadata() {
	const title = "Rénald DESIRE | Étudiant en informatique";
	const description = "Étudiant en informatique à l'IUT de la Martinique. Je m'intéresse au développement web, aussi bien front-end que back-end, et je travaille quotidiennement sur Linux.";
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}`,
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

export default function Home() {
	const person = {
        name: 'Rénald DESIRE',
        avatar: '/images/avatar.JPEG',
    };

	return (
		<Flex
			maxWidth="m" fillWidth gap="xl"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: "Rénald DESIRE | Développeur",
						description: "Portfolio de Rénald DESIRE",
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent("Rénald DESIRE | Développeur")}`,
						publisher: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<Flex
				fillWidth
				direction="column"
				paddingY="l" gap="m">
					<Flex
						direction="column"
						fillWidth maxWidth="s">
						<RevealFx
							translateY="4" revealedByDefault fillWidth justifyContent="flex-start" paddingBottom="m">
							<Heading
								wrap="balance"
								variant="display-strong-l">
								Salut, je suis Rénald.
							</Heading>
						</RevealFx>
						<RevealFx
							translateY="8" revealedByDefault fillWidth justifyContent="flex-start" paddingBottom="m">
							<Text
								wrap="balance"
								onBackground="neutral-weak"
								variant="heading-default-xl">
								Étudiant en informatique à l'IUT de la Martinique.<br/>
								Je m'intéresse au développement web, aussi bien front-end que back-end, et je travaille quotidiennement sur Linux. Je consacre mon temps libre à la réalisation de projets personnels.
							</Text>
						</RevealFx>
						<RevealFx translateY="12" revealedByDefault>
							<Flex fillWidth>
								<Button
									id="about"
									data-border="rounded"
									href="/about"
									variant="tertiary"
									size="m">
									<Flex
										gap="8"
										alignItems="center">
										<Avatar
											style={{marginLeft: '-0.75rem', marginRight: '0.25rem'}}
											src={person.avatar}
											size="m"/>
											À propos de moi
											<Arrow trigger="#about"/>
									</Flex>
								</Button>
							</Flex>
						</RevealFx>
					</Flex>
				
			</Flex>
			<RevealFx translateY="16" delay={0.2} fillWidth>
				<Flex fillWidth gap="m" direction="column">
					<SmartImage
						radius="l"
						alt="Organisation et Méthode"
						aspectRatio="16 / 9"
						src="/images/projects/organisation-et-methode/home-page.png"
						style={{ border: '1px solid var(--neutral-alpha-weak)' }}
					/>
					<Flex fillWidth mobileDirection="column" paddingX="s" paddingTop="12" paddingBottom="24" gap="l">
						<Flex flex={5}>
							<Heading as="h2" wrap="balance" variant="heading-strong-xl">
								Organisation et Méthode
							</Heading>
						</Flex>
						<Flex flex={7} direction="column" gap="16">
							<Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
								Application Laravel développée en stage chez BeepWay pour centraliser l'organisation interne, les ressources, les tâches, les documents et les accès.
							</Text>
							<Button href="/work" variant="tertiary" size="s">
								Voir mes projets de 3e année
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</RevealFx>
		</Flex>
	);
}
