export type CompetenceSupport = {
    readonly order: string;
    readonly label: string;
    readonly title: string;
    readonly scope: string;
    readonly href: string;
    readonly project: {
        readonly title: string;
        readonly href?: string;
        readonly summary: string;
        readonly role: string;
        readonly stack: readonly string[];
        readonly proofs: readonly string[];
        readonly image: string;
    };
    readonly secondaryProjects: readonly {
        readonly href: string;
        readonly label: string;
    }[];
    readonly acs: readonly string[];
};

export const oralCompetences: readonly CompetenceSupport[] = [
    {
        order: "01",
        label: "Adapter",
        title: "Adapter des applications sur un ensemble de supports",
        scope: "Architecture, intégration, production, déploiement",
        href: "/competences/01-realiser",
        project: {
            title: "The Camp",
            summary: "Projet support principal pour montrer l'analyse et l'évolution d'une application web mobile-first existante, basée sur un parcours narratif par QR codes.",
            role: "Analyse de l'existant, refactorisation progressive, amélioration mobile/PWA, validation du parcours joueur et documentation technique.",
            stack: ["HTML", "CSS", "JavaScript", "PWA", "QR codes", "Service worker"],
            proofs: [
                "Application existante analysée avant évolution",
                "Architecture restructurée par pages, styles et scripts",
                "Parcours mobile-first basé sur QR codes",
                "Checklist de validation fonctionnelle et responsive",
            ],
            image: "/images/projects/the-camp/start-menu.png",
        },
        secondaryProjects: [],
        acs: [
            "Choisir et implémenter les architectures adaptées.",
            "Faire évoluer une application existante.",
            "Intégrer des solutions dans un environnement de production.",
        ],
    },
    {
        order: "02",
        label: "Optimiser",
        title: "Analyser et optimiser des applications",
        scope: "Métriques, comportement du code, bibliothèques dédiées",
        href: "/competences/02-optimiser",
        project: {
            title: "Organisation et Méthode",
            href: "/work/04-organisation-et-methode",
            summary: "Projet support principal pour montrer l'optimisation d'une application métier déjà utilisée, avec contraintes de contenu, d'exports et de performances.",
            role: "Développement de modules métier, rédaction structurée, exports PDF, API Laravel et adaptation aux usages internes.",
            stack: ["Laravel", "PHP", "MySQL", "Editor.js", "DomPDF", "JavaScript"],
            proofs: [
                "Rédaction structurée avec Editor.js",
                "Normalisation backend du contenu",
                "Exports PDF générés en HTML dédié",
                "Travail sur des données et usages métier réels",
            ],
            image: "/images/projects/organisation-et-methode/redaction-task.png",
        },
        secondaryProjects: [],
        acs: [
            "Anticiper les résultats de diverses métriques.",
            "Profiler, analyser et justifier le comportement d'un code existant.",
            "Choisir et utiliser des bibliothèques et méthodes dédiées au domaine.",
        ],
    },
    {
        order: "03",
        label: "Manager",
        title: "Manager une équipe informatique",
        scope: "Veille, innovation, changement, suivi de projet",
        href: "/competences/06-collaborer",
        project: {
            title: "Stage BeepWay - automatisation et conduite du changement",
            href: "/work/04-organisation-et-methode",
            summary: "Projet support principal pour montrer la veille, l'automatisation, les échanges métier et l'accompagnement d'un changement d'outil en entreprise.",
            role: "Analyse de besoins internes, scripts de prospection, automatisation d'e-mails, proposition de Resend et accompagnement d'usages plus accessibles.",
            stack: ["Python", "CSV", "E-mail automation", "Resend", "Laravel", "Linux"],
            proofs: [
                "Scripts de scraping pour récupérer des prospects",
                "Structuration des données en CSV",
                "Automatisation d'envoi d'e-mails",
                "Proposition de Resend pour rendre l'usage accessible à l'équipe",
            ],
            image: "/images/projects/organisation-et-methode/beepway-logo-card.png",
        },
        secondaryProjects: [],
        acs: [
            "Organiser et partager une veille numérique.",
            "Identifier les enjeux de l'économie de l'innovation numérique.",
            "Guider la conduite du changement informatique dans une organisation.",
            "Accompagner le management de projet informatique.",
        ],
    },
] as const;

export function getCompetenceSupport(slug: string): CompetenceSupport | undefined {
    return oralCompetences.find((competence) => competence.href.endsWith(`/${slug}`));
}
