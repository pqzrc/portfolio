const person = {
    firstName: 'Rénald',
    lastName:  'DESIRE',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Développeur backend',
    avatar:    '/images/avatar.JPEG',
    location:  'America/Martinique',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['French', 'English']  // optional: Leave the array empty if you don't want to display languages
}


const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
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
        name: 'Mon CV',
        icon: 'curriculum',
        link: 'https://drive.google.com/file/d/19zFY1rUKw8Qf7hudi9aFlycOBmXnN-x4/view?usp=sharing',
        download: true,
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:renalddesire55@gmail.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Bonjour,  je suis Rénald</>,
    subline: <>Actuellement en 3ème année de BUT Informatique, je suis un développeur backend passionné. Je consacre mon temps libre à la réalisation de projets personnels.</>
}

const about = {
    label: 'Moi',
    title: 'À propos de moi',
    description: `Rencontre ${person.name}, ${person.role} de ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
    },
    avatar: {
        display: true
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>
    Je m'intéresse au développement web, aussi bien front-end que back-end, et j'utilise Linux comme système d'exploitation au quotidien. Je consacre mon temps libre à la réalisation de projets personnels, en dehors de tout cela, je m'interesse beaucoup à la musique et je m'efforce egalement de me tenir en forme par la pratique de la musculation</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Expériences Professionnelles',
        experiences: [
            {
                company: 'Kweevo',
                timeframe: '14 Avril - 6 Juin 2025',
                role: 'Développeur DevOps/DataOps Junior',
                achievements: [
                    <>Développement d'API Python pour la gestion et l'analyse des données opérationnelles.</>,
                    <>Intégration de systèmes d'IA pour automatiser et optimiser les flux de travail de données.</>,
                    <>Création d'API d'IA pour permettre l'accès et l'utilisation des modèles d'apprentissage automatique dans les applications.</>
                ],
                images: [ ]
            },
            {
                company: 'IUT de la Martinique : L3MA',
                timeframe: 'Juin 2024 ',
                role: 'Développeur',
                achievements: [
                    <>Développement d'une interface interactive utilisant des bibliothèques Python pour la visualisation des données côtières de la Martinique.</>,
                    <>Création d'un système de modélisation pour analyser l'érosion des plages et l'évolution des zones côtières via la télédétection.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                ]
            },
            
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Education',
        institutions: [
            {
                name: 'IUT de la Martinique : 2023 -> 2026',
                description: <>3ème année de Bachelor universitaire de technologie Informatique.</>,
            },
,
            {
                name: 'Lycée de Bellevue : 2020 -> 2023',
                description: <>Baccalauréat en Sciences Économiques et Sociales et Numérique Science Informatique.</>,
            },

        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Skills',
        skills: [
            {
                title: 'Langages',
                description: <></>,
                images: [
                    { src: '/images/skills/python.png', alt: 'Python', width: 4, height: 4 },
                    { src: '/images/skills/js.png', alt: 'JavaScript', width: 4, height: 4 },
                    { src: '/images/skills/php.png', alt: 'PHP', width: 4, height: 4 }
                ]
            },
            {
                title: 'Front-end',
                description: <></>,
                images: [
                    { src: '/images/skills/react.svg', alt: 'React', width: 4, height: 4 },
                    { src: '/images/skills/vite.png', alt: 'Vite', width: 4, height: 4 },
                    { src: '/images/skills/tailwind.png', alt: 'Tailwind', width: 4, height: 4 },
                    { src: '/images/skills/js.png', alt: 'JavaScript', width: 4, height: 4 },
                    { src: '/images/skills/vue.png', alt: 'Vue.js', width: 4, height: 4 },
                    { src: '/images/skills/html.png', alt: 'HTML', width: 4, height: 4 },
                    { src: '/images/skills/css.png', alt: 'CSS', width: 4, height: 4 }
                ]
            },
            {
                title: 'Back-end',
                description: <></>,
                images: [
                    { src: '/images/skills/laravel.png', alt: 'Laravel', width: 4, height: 4 },
                    { src: '/images/skills/php.png', alt: 'PHP', width: 4, height: 4 },
                    { src: '/images/skills/mysql.png', alt: 'MySQL', width: 4, height: 4 },
                    { src: '/images/skills/postgresql.svg', alt: 'PostGreSQL', width: 4, height: 4 },
                    { src: '/images/skills/supabase.svg', alt: 'Supabase', width: 4, height: 4 }
                ]
            },
            {
                title: 'DevOps & Outils',
                description: <></>,
                images: [
                    { src: '/images/skills/docker.png', alt: 'Docker', width: 4, height: 4 },
                    { src: '/images/skills/git.png', alt: 'Git', width: 4, height: 4 },
                    { src: '/images/skills/bash.png', alt: 'Bash', width: 4, height: 4 },
                    { src: '/images/skills/github.svg', alt: 'GitHub', width: 4, height: 4 },
                    { src: '/images/skills/arch.png', alt: 'Arch Linux', width: 4, height: 4 }
                ]
            }
        ]
    }
    
    
}

const blog = {
    label: 'Competences',
    title: 'Compétences',
    description: ``
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Mes projets',
    title: 'Mes projets',
    description: `Design et développement de projets par ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}



export { person, social, home, about, blog, work };
