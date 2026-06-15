'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/once-ui/components/Button'
import { Flex } from '@/once-ui/components/Flex'
import { Heading } from '@/once-ui/components/Heading'
import { IconButton } from '@/once-ui/components/IconButton'
import { SmartImage } from '@/once-ui/components/SmartImage'
import { Text } from '@/once-ui/components/Text'
import styles from './CompetenceSlideshow.module.scss'
import type { CompetenceSupport } from '../competenceSupport'

interface Apprentissage {
    title: string;
    description: string;
    contexte: string;
    preuves: string[];
    difficultes: string[];
    retire: string;
    technologies: string;
    images: string[];
}

interface Niveau {
    numero: number;
    titre: string;
    apprentissages: Apprentissage[];
}

interface CompetenceSlideshowProps {
    post: {
        metadata: {
            title: string;
            subtitle?: string;
            summary?: string;
            image?: string;
        };
        content: string;
    };
    support: CompetenceSupport;
}

const availableImageIndexesByFolder = {
    ap1: [1, 2, 3, 4, 5, 6, 7, 8],
    ap2: [1, 2],
    ap3: [1, 2, 3, 4, 5, 6],
    ap4: [1, 2, 3, 4, 6, 7],
    ap5: [1, 2, 5, 6, 7],
    ap6: [1, 2, 4, 5, 6, 7, 8],
} as const;

type ImageFolder = keyof typeof availableImageIndexesByFolder;

type ParseMode = 'description' | 'contexte' | 'preuves' | 'difficultes' | 'retire' | 'technologies' | null;

// Découpe le contenu MDX en niveaux (## Niveau N - ...) puis en
// apprentissages critiques (### ...) avec leurs sections **Label :**
function extractNiveaux(content: string): Niveau[] {
    const lines = content.split('\n');
    const niveaux: Niveau[] = [];
    let currentNiveau: Niveau | null = null;
    let currentApprentissage: Apprentissage | null = null;
    let mode: ParseMode = null;

    const flushApprentissage = () => {
        if (currentApprentissage && currentApprentissage.title && currentNiveau) {
            currentNiveau.apprentissages.push(currentApprentissage);
        }
        currentApprentissage = null;
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();

        const niveauMatch = line.match(/^##\s+Niveau\s+(\d+)\s*(?:[-–—:]\s*(.*))?$/);
        if (niveauMatch) {
            flushApprentissage();
            currentNiveau = {
                numero: parseInt(niveauMatch[1], 10),
                titre: niveauMatch[2]?.trim() || '',
                apprentissages: [],
            };
            niveaux.push(currentNiveau);
            mode = null;
            continue;
        }

        if (line.startsWith('### ')) {
            flushApprentissage();
            currentApprentissage = {
                title: line.replace(/^###\s*/, '').trim(),
                description: '',
                contexte: '',
                preuves: [],
                difficultes: [],
                retire: '',
                technologies: '',
                images: [],
            };
            mode = null;
            continue;
        }

        if (!currentApprentissage) continue;

        if (line.startsWith('**Description :**')) {
            mode = 'description';
            currentApprentissage.description = line.replace('**Description :**', '').trim();
            continue;
        }
        if (line.startsWith('**Contexte')) {
            mode = 'contexte';
            currentApprentissage.contexte = line.replace(/\*\*[^:]+:\*\*/, '').trim();
            continue;
        }
        if (line.startsWith("**Ce que j'ai fait")) {
            mode = 'preuves';
            continue;
        }
        if (line.startsWith('**Difficultés')) {
            mode = 'difficultes';
            continue;
        }
        if (line.startsWith("**Ce que j'en retire :**")) {
            mode = 'retire';
            currentApprentissage.retire = line.replace("**Ce que j'en retire :**", '').trim();
            continue;
        }
        if (line.startsWith('**Image :**')) {
            currentApprentissage.images.push(line.replace('**Image :**', '').trim());
            mode = null;
            continue;
        }
        if (line.match(/^\*\*(Technologies utilisées|Outils utilisés|Standards appliqués|Pratiques appliquées|Outils de test|Livrables) :\*\*/)) {
            mode = 'technologies';
            currentApprentissage.technologies = line.replace(/\*\*[^:]+:\*\*/, '').trim();
            continue;
        }
        if (line.startsWith('**')) {
            mode = null;
            continue;
        }

        if (line.startsWith('- ')) {
            const item = line.replace('- ', '');
            if (mode === 'preuves') currentApprentissage.preuves.push(item);
            if (mode === 'difficultes') currentApprentissage.difficultes.push(item);
            continue;
        }

        if (line.length > 0 && !line.startsWith('#') && !line.startsWith('!')) {
            if (mode === 'description') {
                currentApprentissage.description = (currentApprentissage.description + ' ' + line).trim();
            } else if (mode === 'contexte') {
                currentApprentissage.contexte = (currentApprentissage.contexte + ' ' + line).trim();
            } else if (mode === 'retire') {
                currentApprentissage.retire = (currentApprentissage.retire + ' ' + line).trim();
            } else if (mode === 'technologies' && !currentApprentissage.technologies) {
                currentApprentissage.technologies = line;
            }
        }
    }

    flushApprentissage();
    return niveaux.filter((niveau) => niveau.apprentissages.length > 0);
}

export default function CompetenceSlideshow({ post, support }: CompetenceSlideshowProps) {
    const niveaux = useMemo(() => extractNiveaux(post.content), [post.content]);
    // Par défaut on présente le niveau le plus élevé (celui attendu en BUT3)
    const [currentNiveauIndex, setCurrentNiveauIndex] = useState(Math.max(0, niveaux.length - 1));
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageZoom, setImageZoom] = useState<'fit' | 'fill' | 'actual'>('fit');
    const [selectedImagePath, setSelectedImagePath] = useState<string | null>(null);

    // Déterminer le dossier d'images selon la compétence
    const getImageFolder = (title: string): ImageFolder => {
        if (title.includes('Réaliser')) return 'ap1';
        if (title.includes('Optimiser')) return 'ap2';
        if (title.includes('Administrer')) return 'ap3';
        if (title.includes('Gérer')) return 'ap4';
        if (title.includes('Conduire')) return 'ap5';
        if (title.includes('Collaborer')) return 'ap6';
        return 'ap1'; // fallback
    };

    const imageFolder = getImageFolder(post.metadata.title);
    const currentNiveau = niveaux[currentNiveauIndex];
    const currentApprentissages = currentNiveau?.apprentissages ?? [];
    const maxSlides = currentApprentissages.length;

    // Index global de l'apprentissage dans le fichier (pour les images)
    const getGlobalApprentissageIndex = (): number => {
        let index = 0;
        for (let i = 0; i < currentNiveauIndex; i++) {
            index += niveaux[i].apprentissages.length;
        }
        return index + currentSlide + 1;
    };

    const getFallbackIllustrationPath = (): string => {
        const requestedIndex = getGlobalApprentissageIndex();
        const availableIndexes = availableImageIndexesByFolder[imageFolder];
        const imageIndex = availableIndexes.some((index) => index === requestedIndex)
            ? requestedIndex
            : availableIndexes[availableIndexes.length - 1];

        return `/images/comp/${imageFolder}/apprentissage-${imageIndex}.png`;
    };

    const getIllustrationPaths = (): string[] => {
        const overrides = currentApprentissages[currentSlide]?.images ?? [];
        return overrides.length > 0 ? overrides : [getFallbackIllustrationPath()];
    };

    const openImageModal = (imagePath: string) => {
        setSelectedImagePath(imagePath);
        setIsImageModalOpen(true);
    };

    // Navigation
    const nextSlide = useCallback(() => {
        setCurrentSlide((slide) => (slide < maxSlides - 1 ? slide + 1 : slide));
    }, [maxSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((slide) => (slide > 0 ? slide - 1 : slide));
    }, []);

    const switchNiveau = useCallback((index: number) => {
        if (index >= 0 && index < niveaux.length) {
            setCurrentNiveauIndex(index);
            setCurrentSlide(0);
        }
    }, [niveaux.length]);

    // Gestion des touches clavier
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsImageModalOpen(false);
                setImageZoom('fit');
                setSelectedImagePath(null);
                return;
            }
            if (!isImageModalOpen) {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
                const digit = parseInt(e.key, 10);
                if (!isNaN(digit)) {
                    const index = niveaux.findIndex((niveau) => niveau.numero === digit);
                    if (index !== -1) switchNiveau(index);
                }
            } else {
                // Controls dans la modal
                if (e.key === 'f' || e.key === 'F') setImageZoom('fit');
                if (e.key === 'z' || e.key === 'Z') setImageZoom('fill');
                if (e.key === 'a' || e.key === 'A') setImageZoom('actual');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isImageModalOpen, nextSlide, niveaux, prevSlide, switchNiveau]);

    if (niveaux.length === 0 || maxSlides === 0) {
        return (
            <Flex direction="column" alignItems="center" gap="l" fillWidth maxWidth="m">
                <Button href="/competences" variant="tertiary" size="s" prefixIcon="chevronLeft">
                    Retour aux compétences
                </Button>
                <Text>Aucun apprentissage trouvé pour cette compétence.</Text>
            </Flex>
        );
    }

    const currentApprentissage = currentApprentissages[currentSlide];
    const illustrationPaths = getIllustrationPaths();

    return (
        <Flex
            fillWidth
            direction="column"
            background="neutral-weak"
            style={{ overflow: 'hidden', minHeight: '100vh' }}>

            {/* Header style PowerPoint */}
            <Flex
                className={styles.topBar}
                fillWidth
                padding="m"
                justifyContent="space-between"
                alignItems="center"
                background="surface"
                border="neutral-medium"
                borderStyle="solid-1">

                <Button href="/competences" variant="tertiary" size="s" prefixIcon="chevronLeft">
                    Compétences
                </Button>

                <Flex className={styles.topTitle} direction="column" alignItems="center" gap="xs">
                    <Heading variant="heading-strong-l">
                        {post.metadata.title}
                    </Heading>
                    {post.metadata.subtitle && (
                        <Text variant="body-default-m" onBackground="brand-strong">
                            {post.metadata.subtitle}
                        </Text>
                    )}
                </Flex>

                <Flex gap="s" alignItems="center">
                    <Text variant="body-default-s" onBackground="neutral-weak">
                        {currentSlide + 1} / {maxSlides}
                    </Text>
                </Flex>
            </Flex>

            {/* Navigation Niveau */}
            <Flex
                fillWidth
                padding="m"
                direction="column"
                alignItems="center"
                gap="s"
                background="surface">
                <Flex
                    className={styles.supportCard}
                    fillWidth
                    maxWidth="xl"
                    direction="row"
                    gap="l"
                    wrap
                    padding="l"
                    radius="l"
                    background="neutral-weak">
                    <Flex className={styles.supportMedia} flex={1}>
                        <SmartImage
                            src={support.project.image}
                            alt={support.project.title}
                            aspectRatio="16 / 9"
                            objectFit="contain"
                            radius="m"
                            sizes="(max-width: 768px) 100vw, 480px"
                            loading="eager"
                            style={{
                                width: '100%',
                                backgroundColor: '#050505',
                                border: '1px solid var(--neutral-alpha-weak)',
                            }}
                        />
                    </Flex>
                    <Flex className={styles.supportContent} flex={1} direction="column" gap="m">
                        <Flex direction="column" gap="xs">
                            <Text variant="label-default-s" onBackground="brand-strong">
                                Projet support principal
                            </Text>
                            <Heading variant="heading-strong-l">
                                {support.project.title}
                            </Heading>
                            <Text variant="body-default-m" onBackground="neutral-weak">
                                {support.project.summary}
                            </Text>
                            <Text variant="body-default-s">
                                {support.project.role}
                            </Text>
                        </Flex>
                        <Flex direction="column" gap="xs">
                            <Text variant="label-default-s" onBackground="brand-strong">
                                Stack
                            </Text>
                            <Text variant="body-default-s" onBackground="neutral-medium">
                                {support.project.stack.join(' • ')}
                            </Text>
                        </Flex>
                        <Flex direction="column" gap="xs">
                            <Text variant="label-default-s" onBackground="brand-strong">
                                Points d&apos;appui
                            </Text>
                            {support.project.proofs.map((proof) => (
                                <Text key={proof} variant="body-default-s" onBackground="neutral-medium">
                                    • {proof}
                                </Text>
                            ))}
                        </Flex>
                        <Flex gap="s" wrap>
                            {support.project.href && (
                                <Button href={support.project.href} variant="secondary" size="s">
                                    Voir le projet support
                                </Button>
                            )}
                            {support.secondaryProjects.map((project) => (
                                <Button key={project.href} href={project.href} variant="tertiary" size="s">
                                    {project.label}
                                </Button>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>

                <Flex gap="s" justifyContent="center">
                    {niveaux.map((niveau, index) => (
                        <Button
                            key={niveau.numero}
                            variant={currentNiveauIndex === index ? "primary" : "secondary"}
                            size="m"
                            onClick={() => switchNiveau(index)}>
                            Niveau {niveau.numero}
                        </Button>
                    ))}
                </Flex>
                {currentNiveau.titre && (
                    <Text variant="body-default-m" onBackground="neutral-weak" align="center">
                        {currentNiveau.titre}
                    </Text>
                )}
            </Flex>

            {/* Slide principal */}
            <Flex
                className={styles.slideShell}
                fillWidth
                flex={1}
                padding="xl"
                justifyContent="center">

                <Flex
                    className={styles.slideCard}
                    fillWidth
                    maxWidth="xl"
                    direction="column"
                    gap="l"
                    background="surface"
                    padding="xl"
                    radius="l"
                    border="neutral-medium"
                    borderStyle="solid-1">

                    {/* Titre de l'apprentissage */}
                    <Flex direction="column" alignItems="center" gap="m">
                        <Heading className={styles.slideHeading} variant="display-strong-s" align="center">
                            {currentApprentissage.title}
                        </Heading>
                        {currentApprentissage.description && (
                            <Text variant="body-default-l" align="center" onBackground="neutral-weak">
                                {currentApprentissage.description}
                            </Text>
                        )}
                    </Flex>

                    {/* Contexte et rôle */}
                    {currentApprentissage.contexte && (
                        <Flex
                            direction="column"
                            gap="xs"
                            padding="m"
                            radius="m"
                            background="neutral-weak">
                            <Heading variant="heading-strong-s" onBackground="brand-strong">
                                Contexte et rôle
                            </Heading>
                            <Text variant="body-default-m">
                                {currentApprentissage.contexte}
                            </Text>
                        </Flex>
                    )}

                    {/* Contenu principal en 2 colonnes */}
                    <Flex className={styles.slideGrid} direction="row" gap="xl" wrap fillWidth>

                        {/* Preuves et réalisations */}
                        {currentApprentissage.preuves.length > 0 && (
                            <Flex className={styles.slideColumn} direction="column" gap="m" flex={1}>
                                <Heading variant="heading-strong-m" onBackground="accent-strong">
                                    Ce que j'ai réalisé
                                </Heading>
                                <Flex direction="column" gap="s">
                                    {currentApprentissage.preuves.map((preuve, index) => (
                                        <Text key={index} variant="body-default-m">
                                            • {preuve}
                                        </Text>
                                    ))}
                                </Flex>
                            </Flex>
                        )}

                        {/* Difficultés et solutions */}
                        {currentApprentissage.difficultes.length > 0 && (
                            <Flex className={styles.slideColumn} direction="column" gap="m" flex={1}>
                                <Heading variant="heading-strong-m" onBackground="danger-strong">
                                    Difficultés et solutions
                                </Heading>
                                <Flex direction="column" gap="s">
                                    {currentApprentissage.difficultes.map((difficulte, index) => (
                                        <Text key={index} variant="body-default-m">
                                            • {difficulte}
                                        </Text>
                                    ))}
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

                    {/* Technologies */}
                    {currentApprentissage.technologies && (
                        <Flex direction="column" gap="xs">
                            <Heading variant="heading-strong-s" onBackground="warning-strong">
                                Technologies / Outils
                            </Heading>
                            <Text variant="body-default-m" onBackground="brand-strong">
                                {currentApprentissage.technologies}
                            </Text>
                        </Flex>
                    )}

                    {/* Ce que j'en retire */}
                    {currentApprentissage.retire && (
                        <Flex
                            direction="column"
                            gap="xs"
                            padding="m"
                            radius="m"
                            border="brand-medium"
                            borderStyle="solid-1">
                            <Heading variant="heading-strong-s" onBackground="brand-strong">
                                Ce que j'en retire
                            </Heading>
                            <Text variant="body-default-m">
                                {currentApprentissage.retire}
                            </Text>
                        </Flex>
                    )}

                    <Flex
                        fillWidth
                        gap="m"
                        wrap
                        justifyContent="center">
                        {illustrationPaths.map((imagePath, index) => (
                            <Flex
                                key={imagePath}
                                className={styles.imageCard}
                                onClick={() => openImageModal(imagePath)}
                            >
                                <SmartImage
                                    src={imagePath}
                                    alt={`Illustration ${index + 1} pour ${currentApprentissage.title}`}
                                    aspectRatio="16 / 9"
                                    objectFit="contain"
                                    radius="m"
                                    sizes="(max-width: 768px) 100vw, 480px"
                                    loading="eager"
                                    style={{
                                        width: '100%',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid var(--neutral-alpha-weak)',
                                        cursor: 'pointer',
                                    }}
                                />
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Flex>

            {/* Navigation arrows */}
            <Flex
                fillWidth
                padding="m"
                justifyContent="space-between"
                alignItems="center"
                background="surface">

                <IconButton
                    icon="chevronLeft"
                    size="l"
                    variant={currentSlide > 0 ? "primary" : "tertiary"}
                    disabled={currentSlide === 0}
                    onClick={prevSlide}
                />

                <Flex gap="xs" alignItems="center">
                    {/* Indicateurs de slides */}
                    {currentApprentissages.map((_, index) => (
                        <Flex
                            key={index}
                            width="8"
                            height="8"
                            radius="full"
                            background={index === currentSlide ? "brand-strong" : "neutral-medium"}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </Flex>

                <IconButton
                    icon="chevronRight"
                    size="l"
                    variant={currentSlide < maxSlides - 1 ? "primary" : "tertiary"}
                    disabled={currentSlide === maxSlides - 1}
                    onClick={nextSlide}
                />
            </Flex>

            {/* Modal d'image en plein écran */}
            {isImageModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        cursor: 'pointer',
                        overflow: 'auto',
                    }}
                    onClick={() => setIsImageModalOpen(false)}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element -- Native image keeps the full-screen actual-size zoom mode. */}
                    <img
                        src={selectedImagePath ?? illustrationPaths[0]}
                        alt={`Illustration pour ${currentApprentissage.title}`}
                        style={{
                            maxWidth: imageZoom === 'actual' ? 'none' : '95vw',
                            maxHeight: imageZoom === 'actual' ? 'none' : '90vh',
                            width: imageZoom === 'fill' ? '95vw' : 'auto',
                            height: imageZoom === 'fill' ? '90vh' : 'auto',
                            objectFit: imageZoom === 'fill' ? 'cover' : 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Bouton fermer */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            color: 'white',
                            fontSize: '24px',
                            cursor: 'pointer',
                            background: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s',
                        }}
                        onClick={() => setIsImageModalOpen(false)}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'}
                    >
                        ×
                    </div>

                    {/* Controls de zoom */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '20px',
                            left: '20px',
                            display: 'flex',
                            gap: '8px',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            style={{
                                padding: '8px 12px',
                                background: imageZoom === 'fit' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                                color: imageZoom === 'fit' ? 'black' : 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setImageZoom('fit')}
                        >
                            Ajuster (F)
                        </button>
                        <button
                            style={{
                                padding: '8px 12px',
                                background: imageZoom === 'fill' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                                color: imageZoom === 'fill' ? 'black' : 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setImageZoom('fill')}
                        >
                            Remplir (Z)
                        </button>
                        <button
                            style={{
                                padding: '8px 12px',
                                background: imageZoom === 'actual' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.7)',
                                color: imageZoom === 'actual' ? 'black' : 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 'bold',
                            }}
                            onClick={() => setImageZoom('actual')}
                        >
                            Taille réelle (A)
                        </button>
                    </div>

                    {/* Instructions */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: 'white',
                            fontSize: '14px',
                            opacity: 0.8,
                            textAlign: 'center',
                            background: 'rgba(0, 0, 0, 0.5)',
                            padding: '8px 16px',
                            borderRadius: '4px',
                        }}
                    >
                        F: Ajuster • Z: Remplir • A: Taille réelle • Échap: Fermer • Clic: Fermer
                    </div>
                </div>
            )}

            {/* Instructions de navigation */}
            <Flex
                padding="s"
                justifyContent="center"
                background="neutral-weak">
                <Text variant="body-default-xs" onBackground="neutral-weak">
                    Navigation : ← → pour les apprentissages • {niveaux.map((niveau) => niveau.numero).join('/')} pour changer de niveau • Echap pour fermer
                </Text>
            </Flex>
        </Flex>
    );
}
