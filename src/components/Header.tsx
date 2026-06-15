"use client";

import { usePathname } from 'next/navigation'

import { Flex } from "@/once-ui/components/Flex"
import { ToggleButton } from "@/once-ui/components/ToggleButton"
import styles from '@/components/Header.module.scss'

import { routes } from '@/app/resources'

export const Header = () => {
    const pathname = usePathname() ?? '';

    const navLinks = [
        { href: "/", label: "Accueil", icon: "home", check: (p: string) => p === "/" },
        { href: "/about", label: "À propos", icon: "person", check: (p: string) => p === "/about" },
        { href: "/work", label: "Projets", icon: "grid", check: (p: string) => p.startsWith('/work') },
        { href: "/blog", label: "Blog", icon: "book", check: (p: string) => p.startsWith('/blog') },
        { href: "/competences", label: "Compétences", icon: "gallery", check: (p: string) => p.startsWith('/competences') }
    ];

    return (
        <>
            <Flex
                className={styles.mask}
                position="fixed" zIndex={9}
                fillWidth minHeight="80" justifyContent="center">
            </Flex>
            <Flex style={{height: 'fit-content'}}
                className={styles.position}
                as="header"
                zIndex={9}
                fillWidth padding="8"
                justifyContent="center">
                <Flex
                    paddingLeft="12" fillWidth
                    alignItems="center"
                    textVariant="body-default-s">
                </Flex>
                <Flex fillWidth justifyContent="center">
                    <Flex
                        background="surface" border="neutral-medium" borderStyle="solid-1" radius="m-4" shadow="l"
                        padding="4"
                        justifyContent="center">
                        <Flex
                            gap="4"
                            textVariant="body-default-s">
                            {navLinks.map(link => (
                                routes[link.href] && (
                                    <ToggleButton
                                        key={link.href}
                                        prefixIcon={link.icon}
                                        href={link.href}
                                        selected={link.check(pathname)}>
                                        <Flex paddingX="2" hide="s">{link.label}</Flex>
                                    </ToggleButton>
                                )
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
                <Flex fillWidth justifyContent="flex-end" alignItems="center">
                    <Flex
                        paddingRight="12"
                        justifyContent="flex-end" alignItems="center"
                        textVariant="body-default-s"
                        gap="20">
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
