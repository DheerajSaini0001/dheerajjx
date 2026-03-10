import { useEffect } from 'react';

const useSEO = (title, description) => {
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
    }, [title, description]);
};

export default useSEO;
