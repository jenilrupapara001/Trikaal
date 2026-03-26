import { Helmet } from 'react-helmet-async';

const SEOHead = ({
    title,
    description,
    image,
    url,
    type = 'website',
    schema
}) => {
    const siteName = 'CosmicGuru';
    const defaultImage = '/og-image.jpg';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title ? `${title} | ${siteName}` : siteName}</title>
            <meta name="description" content={description || 'Discover your cosmic destiny with expert Vedic astrology readings and cosmic guidance.'} />
            <meta name="keywords" content="astrology, vedic astrology, tarot, numerology, horoscope, cosmic guidance" />

            {/* Open Graph */}
            <meta property="og:title" content={title || siteName} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteName} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image || defaultImage} />

            {/* Canonical */}
            <link rel="canonical" href={url} />

            {/* Schema.org */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
