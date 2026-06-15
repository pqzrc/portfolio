export const person = {
  firstName: "Rénald",
  lastName: "DESIRE",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Étudiant en informatique",
  avatar: "/images/avatar.JPEG",
  location: "Martinique",
  languages: ["Français", "Anglais"],
} as const;

export const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/donotdisturb7",
    download: false,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/r%C3%A9nald-desire-ba47992b0/",
    download: false,
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:renalddesire55@gmail.com",
    download: false,
  },
  {
    name: "CV",
    icon: "curriculum",
    link: "https://drive.google.com/file/d/19zFY1rUKw8Qf7hudi9aFlycOBmXnN-x4/view?usp=sharing",
    download: true,
  },
] as const;

export const about = {
  tableOfContent: {
    display: true,
    subItems: true,
  },
  intro: {
    display: true,
    title: "Introduction",
    description:
      "Étudiant en informatique à l'IUT de la Martinique. Je m'intéresse au développement web, aussi bien front-end que back-end, et je travaille quotidiennement sur Linux. Je consacre mon temps libre à la réalisation de projets personnels.",
  },
  work: {
    display: true,
    title: "Expériences Professionnelles",
    experiences: [
      {
        company: "BEEPWAY.COM",
        timeframe: "Janvier-février 2026 ; avril-mai 2026",
        role: "Développeur",
        achievements: [
          "Développement d'une application de gestion opérationnelle en PHP/Laravel, utilisée en production par l'entreprise, afin de structurer l'organisation interne, centraliser les ressources et piloter les activités quotidiennes.",
          "Conception et implémentation de modules clés : gestion des utilisateurs et des rôles, suivi des tâches et plannings, gestion documentaire, sécurisation des accès.",
          "Amélioration continue de l'API et adaptation des fonctionnalités aux besoins métier.",
          "Développement de scripts de scraping en Python pour la collecte et l'exploitation de données.",
          "Montage, installation et configuration de serveurs Linux.",
          "Mise en place d'automatisations IA avec OpenClaw.",
        ],
      },
      {
        company: "Kweevo",
        timeframe: "14 Avril - 6 Juin 2025",
        role: "Développeur DevOps/DataOps Junior",
        achievements: [
          "Développement d'API Python pour la gestion et l'analyse des données opérationnelles.",
          "Intégration de systèmes d'IA pour automatiser et optimiser les flux de travail de données.",
          "Création d'API d'IA pour permettre l'accès et l'utilisation des modèles d'apprentissage automatique dans les applications.",
        ],
      },
      {
        company: "IUT de la Martinique : L3MA",
        timeframe: "Juin 2024",
        role: "Développeur",
        achievements: [
          "Développement d'une interface interactive utilisant des bibliothèques Python pour la visualisation des données côtières de la Martinique.",
          "Création d'un système de modélisation pour analyser l'érosion des plages et l'évolution des zones côtières via la télédétection.",
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Éducation",
    institutions: [
      {
        name: "IUT de la Martinique : 2023 -> 2026",
        description: "Bachelor universitaire de technologie Informatique.",
      },
      {
        name: "Lycée de Bellevue : 2020 -> 2023",
        description:
          "Baccalauréat en Sciences Économiques et Sociales et Numérique Science Informatique.",
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Front-end",
        images: [
          { src: "/images/skills/html.png", alt: "HTML" },
          { src: "/images/skills/css.png", alt: "CSS" },
          { src: "/images/skills/js.png", alt: "JavaScript" },
          { src: "/images/skills/react.svg", alt: "React" },
          { src: "/images/skills/vue.png", alt: "Vue.js" },
          { src: "/images/skills/tailwind.png", alt: "Tailwind CSS" },
        ],
      },
      {
        title: "Back-end",
        images: [
          { src: "/images/skills/php.png", alt: "PHP" },
          { src: "/images/skills/python.png", alt: "Python" },
          { src: "/images/skills/laravel.png", alt: "Laravel" },
          { src: "/images/skills/nestjs.png", alt: "NestJS" },
          { src: "/images/skills/mysql.png", alt: "MySQL" },
          { src: "/images/skills/postgresql.svg", alt: "PostgreSQL" },
         
        ],
      },
      {
        title: "DevOps & Outils",
        images: [
          { src: "/images/skills/git.png", alt: "Git" },
          { src: "/images/skills/github.svg", alt: "GitHub" },
          { src: "/images/skills/docker.png", alt: "Docker" },
          { src: "/images/skills/arch.png", alt: "Arch Linux" },
          { src: "/images/skills/bash.png", alt: "Bash" },
          // { src: "/images/skills/figma.png", alt: "Figma" },
        ],
      },
      // {
      //   title: "Langages de programmation",
      //   images: [
      //     { src: "/images/skills/js.png", alt: "JavaScript" },
      //     { src: "/images/skills/python.png", alt: "Python" },
      //     { src: "/images/skills/php.png", alt: "PHP" },
      //   ],
      // },
    ],
  },
} as const;

export const structure = [
  {
    title: about.intro.title,
    display: about.intro.display,
    items: [],
  },
  {
    title: about.work.title,
    display: about.work.display,
    items: about.work.experiences.map((experience) => experience.company),
  },
  {
    title: about.studies.title,
    display: about.studies.display,
    items: about.studies.institutions.map((institution) => institution.name),
  },
  {
    title: about.technical.title,
    display: about.technical.display,
    items: about.technical.skills.map((skill) => skill.title),
  },
] as const;
