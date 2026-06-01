import { Helmet } from "react-helmet-async";

type SEOProps = {
    title: string;
    description: string;
    canonical: string;
};

const SEO = ({ title, description, canonical }: SEOProps) => (
    <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />
        <meta name="description" content={description} />
        <meta name="keywords" content="Full-Stack Developer Bangladesh, MERN Stack Developer, React Developer for hire, Next.js developer freelance, hire full-stack developer, Figma to React developer, landing page developer, PERN stack developer, Node.js Express developer, MongoDB PostgreSQL developer, Full-Stack Developer Rajshahi Bangladesh, freelance React Next.js developer Bangladesh, hire MERN developer Fiverr, affordable full-stack web developer" />
        <meta name="author" content="Md. Refat Al Hasan Kaif" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://i.ibb.co.com/qYBrSpkm/icon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Md. Refat Al Hasan Kaif | Full-Stack Developer Bangladesh" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://i.ibb.co.com/qYBrSpkm/icon.png" />
        <meta name="twitter:site" content="@refatalhasank" />
        <meta name="twitter:creator" content="@refatalhasank" />
        <meta name="category" content="Web Development, Freelance, Full-Stack Development" />
    </Helmet>
);

export default SEO;
