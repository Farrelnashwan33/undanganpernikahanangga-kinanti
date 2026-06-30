import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ data }) => {
  const { groom, bride } = data.couple;
  const title = `The Wedding of ${groom.nickname} & ${bride.nickname}`;
  const description = `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.`;
  const url = window.location.origin;
  const image = data.cover.image; // Or any specific OG image you want

  // Schema.org structured data for WeddingEvent
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": title,
    "startDate": data.hero.date,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": data.events[1].title,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.events[1].address
      }
    },
    "image": [image],
    "description": description
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="theme-color" content={data.theme.colors.primary} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEO;
