import { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  schemaJson?: object | object[] | null;
}

export function SeoHead({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
  ogType = 'website',
  schemaJson,
}: SeoHeadProps) {
  const fullTitle = title.includes("L'ÉLIXIR")
    ? title
    : `${title} | L'ÉLIXIR Atelier Hair Studio`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Update Description meta tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Canonical link tag
    const currentUrl = canonicalUrl || window.location.href;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('content', currentUrl);

    // 4. Update OpenGraph tags
    const updateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaProperty('og:title', fullTitle);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:url', currentUrl);
    updateMetaProperty('og:type', ogType);

    // 5. Injected JSON-LD structured data script
    const scriptId = 'dynamic-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schemaJson) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaJson);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Cleanup injected JSON-LD script if needed
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, schemaJson]);

  return null;
}

