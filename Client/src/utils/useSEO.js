import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useSEO = (title, description, customSchema = null) => {
    const location = useLocation();

    useEffect(() => {
        // Set document title
        if (title) {
            document.title = title;
        }

        // Set meta description
        if (description) {
            let metaDescriptionTag = document.querySelector('meta[name="description"]');
            if (!metaDescriptionTag) {
                metaDescriptionTag = document.createElement('meta');
                metaDescriptionTag.name = 'description';
                document.head.appendChild(metaDescriptionTag);
            }
            metaDescriptionTag.content = description;

            // Also update Open Graph and Twitter Card descriptions for complete SEO consistency
            let ogDescTag = document.querySelector('meta[property="og:description"]');
            if (ogDescTag) ogDescTag.content = description;

            let twSiteDescTag = document.querySelector('meta[name="twitter:description"]');
            if (twSiteDescTag) twSiteDescTag.content = description;
        }
        // Self-Referential URL handling
        const canonicalUrl = window.location.origin + location.pathname;
        
        // Canonical Tag
        let canonicalTag = document.querySelector('link[rel="canonical"]');
        if (!canonicalTag) {
            canonicalTag = document.createElement('link');
            canonicalTag.rel = 'canonical';
            document.head.appendChild(canonicalTag);
        }
        canonicalTag.href = canonicalUrl;

        // Open Graph URL
        let ogUrlTag = document.querySelector('meta[property="og:url"]');
        if (!ogUrlTag) {
            ogUrlTag = document.createElement('meta');
            ogUrlTag.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrlTag);
        }
        ogUrlTag.content = canonicalUrl;

        // Twitter URL
        let twUrlTag = document.querySelector('meta[name="twitter:url"]');
        if (!twUrlTag) {
            twUrlTag = document.createElement('meta');
            twUrlTag.setAttribute('name', 'twitter:url');
            document.head.appendChild(twUrlTag);
        }
        twUrlTag.content = canonicalUrl;

        // Structured Data (JSON-LD)
        const defaultSchema = [
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Dheerajj.x",
                "url": window.location.origin,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${window.location.origin}/?s={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Dheerajj.x",
                "url": window.location.origin,
                "jobTitle": "Creative Professional",
                "description": description || "Creative professional portfolio and visual archives.",
                "sameAs": [
                    "https://instagram.com/dheerajj.x",
                    "https://github.com/DheerajSaini0001"
                ]
            }
        ];

        let schemaArray = [...defaultSchema];
        if (customSchema) {
            if (Array.isArray(customSchema)) {
                schemaArray = [...schemaArray, ...customSchema];
            } else {
                schemaArray.push(customSchema);
            }
        }

        let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
        if (!jsonLdScript) {
            jsonLdScript = document.createElement('script');
            jsonLdScript.setAttribute('type', 'application/ld+json');
            document.head.appendChild(jsonLdScript);
        }
        jsonLdScript.text = JSON.stringify(schemaArray);

    }, [title, description, location.pathname, customSchema]);
};

export default useSEO;
