import { getPosts } from '@/app/utils/utils'
import { baseURL, routes as routesConfig } from '@/app/resources'

const oralCompetenceSlugs = ['01-realiser', '02-optimiser', '06-collaborer'] as const;

export default async function sitemap() {
    // Get blog posts
    const blogs = getPosts(['src', 'app', 'blog', 'posts', 'fr']).map((post) => ({
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }));

    // Get work projects
    const works = getPosts(['src', 'app', 'work', 'projects', 'fr']).map((post) => ({
        url: `${baseURL}/work/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }));

    // Get competences
    const competences = getPosts(['src', 'app', 'competences', 'posts', 'fr'])
        .filter((post) => oralCompetenceSlugs.some((slug) => slug === post.slug))
        .map((post) => ({
            url: `${baseURL}/competences/${post.slug}`,
            lastModified: new Date().toISOString().split('T')[0],
        }));

    // Get active routes
    const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);
    const routes = activeRoutes.map((route) => ({
        url: `${baseURL}${route !== '/' ? route : ''}`,
        lastModified: new Date().toISOString().split('T')[0],
    }));

    return [...routes, ...blogs, ...works, ...competences]
}
