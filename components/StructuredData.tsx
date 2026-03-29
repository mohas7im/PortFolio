export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hashim",
    "alternateName": ["Hashim developer", "Hashim full stack developer", "Hashim website developer"],
    "jobTitle": "Full Stack Developer",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "url": "https://mohashim.netlify.app",
    "sameAs": [
      "https://linkedin.com/in/YOUR_LINKEDIN",
      "https://github.com/YOUR_GITHUB"
    ],
    "knowsAbout": [
      "React", "Next.js", "Django", "Python",
      "TypeScript", "JavaScript", "Tailwind CSS",
      "GSAP Animation", "Full Stack Development",
      "Website Development", "Software Development",
      "SaaS Development", "AI Integration",
      "Web Development", "Freelance Development",
      "REST APIs", "Frontend Development",
      "Backend Development", "Custom Website Development"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Hashim — Freelance Full Stack & Website Developer",
    "description": "Freelance full stack development and website development services by Hashim, Kerala India. Specializing in React, Next.js, Django, Python, TypeScript, GSAP animations, custom websites, and SaaS product development.",
    "url": "https://mohashim.netlify.app",
    "areaServed": [
      { "@type": "State", "name": "Kerala" },
      { "@type": "Country", "name": "India" }
    ],
    "serviceType": [
      "Full Stack Development",
      "Website Development",
      "Frontend Development",
      "Backend Development",
      "Software Development",
      "Web Development",
      "SaaS Development",
      "Freelance Development",
      "AI Integration",
      "Custom Website Development"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "priceRange": "$$",
    "founder": { "@type": "Person", "name": "Hashim" }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mohashim.netlify.app" },
      { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://mohashim.netlify.app/projects" },
      { "@type": "ListItem", "position": 3, "name": "Dental EMR", "item": "https://mohashim.netlify.app/projects/dental-emr" },
      { "@type": "ListItem", "position": 4, "name": "About", "item": "https://mohashim.netlify.app/about" },
      { "@type": "ListItem", "position": 5, "name": "Contact", "item": "https://mohashim.netlify.app/contact" }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Hashim — Full Stack & Website Developer Portfolio",
    "url": "https://mohashim.netlify.app",
    "description": "Personal portfolio of Hashim, a full stack and website developer from Kerala India. Specializing in React, Next.js, Django, Python, GSAP, and custom website development.",
    "author": { "@type": "Person", "name": "Hashim" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mohashim.netlify.app/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    </>
  );
}
