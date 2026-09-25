import { author, education, sameAs, site, siteKeywords } from "@/lib/site";
import { skillGroups } from "@/lib/stack";
import { featuredProjects, supportingProjects } from "@/lib/projects";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;
const profilePageId = `${site.url}/#profilepage`;
const projectListId = `${site.url}/#projects`;

const technologies = [
  ...new Set(skillGroups.flatMap((group) => group.items)),
].toSorted((first, second) => first.localeCompare(second));

const projects = [...featuredProjects, ...supportingProjects];

export function getStructuredData(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: author.name,
        url: site.url,
        email: `mailto:${author.email}`,
        jobTitle: author.jobTitle,
        description: site.description,
        sameAs: [...sameAs],
        knowsAbout: technologies,
        knowsLanguage: [site.language],
        homeLocation: {
          "@type": "Place",
          name: `${author.location.locality}, ${author.location.country}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: author.location.locality,
            addressCountry: author.location.country,
          },
        },
        alumniOf: education.map((entry) => ({
          "@type": "CollegeOrUniversity",
          name: entry.fullName,
          alternateName: entry.name === entry.fullName ? undefined : entry.name,
        })),
        mainEntityOfPage: { "@id": profilePageId },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: site.language,
        keywords: siteKeywords.join(", "),
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "ItemList",
        "@id": projectListId,
        name: "Selected work",
        description: site.description,
        inLanguage: site.language,
        numberOfItems: projects.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.title,
            description: project.summary,
            url: project.repository,
            codeRepository: project.repository,
            keywords: project.technologies.join(", "),
            creator: { "@id": personId },
          },
        })),
      },
    ],
  };
}

export function serializeStructuredData(data: JsonLdValue): string {
  return JSON.stringify(data)
    .replaceAll("<", String.raw`\u003c`)
    .replaceAll(">", String.raw`\u003e`)
    .replaceAll("&", String.raw`\u0026`)
    .replaceAll("\u{2028}", String.raw`\u2028`)
    .replaceAll("\u{2029}", String.raw`\u2029`);
}
