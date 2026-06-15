import { Flex } from "@/once-ui/components/Flex"
import { IconButton } from "@/once-ui/components/IconButton"
import { Text } from "@/once-ui/components/Text"
import styles from './Footer.module.scss'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const person = {
        name: 'Rénald DESIRE',
    };

    const social = [
        {
            name: 'GitHub',
            icon: 'github',
            link: 'https://github.com/donotdisturb7',
        },
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            link: 'https://www.linkedin.com/in/r%C3%A9nald-desire-ba47992b0/',
        },
        {
            name: 'Email',
            icon: 'email',
            link: 'mailto:renalddesire55@gmail.com',
        },
        {
            name: 'CV',
            icon: 'curriculum',
            link: 'https://drive.google.com/file/d/19zFY1rUKw8Qf7hudi9aFlycOBmXnN-x4/view?usp=sharing',
        }
    ];

    return (
        <Flex
            as="footer"
            position="relative"
            fillWidth padding="8"
            justifyContent="center" mobileDirection="column">
            <Flex
                className={styles.mobile}
                fillWidth maxWidth="m" paddingY="8" paddingX="16" gap="16"
                justifyContent="space-between" alignItems="center">
                <Text
                    variant="body-default-s"
                    onBackground="neutral-strong">
                    <Text
                        onBackground="neutral-weak">
                        © {currentYear} /
                    </Text>
                    <Text paddingX="4">
                        {person.name}
                    </Text>
                </Text>
                <Flex
                    gap="16">
                    {social.map((item) => (
                        item.link && (
                            <IconButton
                                key={item.name}
                                href={item.link}
                                icon={item.icon}
                                tooltip={item.name}
                                size="s"
                                variant="ghost"/>
                        )
                    ))}
                </Flex>
            </Flex>
            <Flex height="80" show="s"></Flex>
        </Flex>
    )
}
