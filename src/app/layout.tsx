import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteGuard } from "@/components/RouteGuard";
import { baseURL, effects, style } from '@/app/resources'

import { Inter } from 'next/font/google'
import { Source_Code_Pro } from 'next/font/google';

import { Background } from "@/once-ui/components/Background";
import { Flex } from "@/once-ui/components/Flex";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { BackgroundProps } from "@/once-ui/components/Background";

export async function generateMetadata() {
	return {
		metadataBase: new URL(`https://${baseURL}`),
		title: "Rénald DESIRE | Portfolio",
		description: "Portfolio de Rénald DESIRE, développeur full-stack.",
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},
		other: {
			charset: 'UTF-8',
		},
	}
};

const primary = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

type FontConfig = {
    variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
*/

const code = Source_Code_Pro({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

const backgroundMask: BackgroundProps["mask"] =
	effects.mask === "cursor" ||
	effects.mask === "topLeft" ||
	effects.mask === "topRight" ||
	effects.mask === "bottomLeft" ||
	effects.mask === "bottomRight" ||
	effects.mask === "none"
		? effects.mask
		: "none";

const backgroundEffects: Pick<BackgroundProps, "mask" | "gradient" | "dots" | "lines"> = {
	mask: backgroundMask,
	gradient: effects.gradient,
	dots: {
		display: effects.dots.display,
		opacity: effects.dots.opacity,
		size: "24",
	},
	lines: effects.lines,
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({
	children
} : RootLayoutProps) {
	return (
		<Flex
			as="html" lang="fr"
			background="page"
			data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
			data-solid={style.solid} data-solid-style={style.solidStyle}
			data-theme={style.theme}
			data-border={style.border}
			data-surface={style.surface}
			data-transition={style.transition}
			className={classNames(
				primary.variable,
				secondary ? secondary.variable : '',
				tertiary ? tertiary.variable : '',
				code.variable)}>
			<head>
				<meta charSet="UTF-8" />
			</head>
			<Flex style={{minHeight: '100vh'}}
				as="body"
				fillWidth margin="0" padding="0"
				direction="column">
				<Analytics />
				<Background
					mask={backgroundEffects.mask}
					gradient={backgroundEffects.gradient}
					dots={backgroundEffects.dots}
					lines={backgroundEffects.lines}/>
				<Flex
					fillWidth
					minHeight="16">
				</Flex>
				<Header/>
				<Flex
					zIndex={0}
					fillWidth paddingY="l" paddingX="l"
					justifyContent="center" flex={1}>
					<Flex
						justifyContent="center"
						fillWidth minHeight="0">
						<RouteGuard>
							{children}
						</RouteGuard>
					</Flex>
				</Flex>
				<Footer/>
				<SpeedInsights />
			</Flex>
		</Flex>
	);
}
