"use client";

import Script from "next/script";
import {
  getPersonStructuredData,
  getWebsiteStructuredData,
  getProfessionalServiceStructuredData,
} from "../../lib/structured-data";

export default function StructuredData() {
  return (
    <>
      <Script
        id="person-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPersonStructuredData()),
        }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteStructuredData()),
        }}
      />
      <Script
        id="professional-service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProfessionalServiceStructuredData()),
        }}
      />
    </>
  );
}
