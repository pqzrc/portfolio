import { baseURL } from '@/app/resources';
import { Button } from '@/once-ui/components/Button';
import { Flex } from '@/once-ui/components/Flex';
import { Heading } from '@/once-ui/components/Heading';
import { Text } from '@/once-ui/components/Text';
import { oralCompetences } from './competenceSupport';

export async function generateMetadata() {
	const title = "Compétences BUT Informatique - Niveau 3";
	const description = "Présentation des trois compétences de niveau 3: adapter, optimiser et manager.";
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: { title, description, type: 'website', url: `https://${baseURL}/competences/`, images: [{ url: ogImage, alt: title }] },
		twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
	};
}

export default function Competences() {
	return (
		<Flex fillWidth maxWidth="xl" direction="column" gap="xl" paddingY="xl">
			<Flex direction="column" gap="m" alignItems="center">
				<Text variant="label-default-m" onBackground="brand-strong">
					BUT Informatique - 3e année
				</Text>
				<Heading variant="display-strong-xl" align="center">
					Compétences de niveau 3
				</Heading>
				<Text variant="body-default-l" onBackground="neutral-weak" align="center">
					Chaque compétence est présentée à partir d&apos;un projet support principal, puis déclinée à travers ses apprentissages critiques.
				</Text>
			</Flex>

			<Flex direction="row" gap="l" wrap fillWidth>
				{oralCompetences.map((competence) => (
					<Flex
						key={competence.href}
						direction="column"
						gap="m"
						flex={1}
						padding="xl"
						border="neutral-medium"
						borderStyle="solid-1"
						radius="l"
						background="surface"
						style={{ minWidth: "300px" }}>
						<Flex direction="row" gap="m" alignItems="center">
							<Text variant="label-default-l" onBackground="brand-strong">
								{competence.order}
							</Text>
							<Text variant="heading-strong-s">
								{competence.label}
							</Text>
						</Flex>
						<Heading as="h2" variant="heading-strong-l">
							{competence.title}
						</Heading>
						<Text variant="body-default-s" onBackground="neutral-weak">
							{competence.scope}
						</Text>
						<Flex
							direction="column"
							gap="xs"
							padding="m"
							radius="m"
							background="neutral-weak">
							<Text variant="label-default-s" onBackground="brand-strong">
								Projet support
							</Text>
							<Heading as="h3" variant="heading-strong-s">
								{competence.project.title}
							</Heading>
							<Text variant="body-default-s" onBackground="neutral-medium">
								{competence.project.summary}
							</Text>
						</Flex>
						<Flex direction="column" gap="s">
							{competence.acs.map((ac) => (
								<Text key={ac} variant="body-default-s" onBackground="neutral-medium">
									- {ac}
								</Text>
							))}
						</Flex>
						<Flex direction="row" gap="s" wrap paddingTop="s">
							<Button href={competence.href} variant="primary" size="s">
								Ouvrir la compétence
							</Button>
							{competence.project.href && (
								<Button href={competence.project.href} variant="secondary" size="s">
									Voir le projet support
								</Button>
							)}
						</Flex>
					</Flex>
				))}
			</Flex>

			<Flex direction="column" gap="m">
				<Heading as="h2" variant="heading-strong-xl">
					Projets complémentaires
				</Heading>
				<Flex direction="row" gap="l" wrap fillWidth>
					{oralCompetences.map((competence) => (
						<Flex
							key={competence.href}
							direction="column"
							gap="m"
							flex={1}
							padding="l"
							border="neutral-medium"
							borderStyle="solid-1"
							radius="l"
							background="surface"
							style={{ minWidth: "280px" }}>
							<Text variant="label-default-s" onBackground="brand-strong">
								{competence.label}
							</Text>
							<Heading as="h3" variant="heading-strong-m">
								{competence.project.title}
							</Heading>
							<Flex direction="column" gap="s">
								{competence.secondaryProjects.map((project) => (
									<Button
										key={project.href}
										href={project.href}
										variant="tertiary"
										size="s"
										style={{ width: "fit-content" }}>
										{project.label}
									</Button>
								))}
							</Flex>
						</Flex>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
}
