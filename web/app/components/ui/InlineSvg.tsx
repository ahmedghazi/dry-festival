import type { CSSProperties } from "react";

type InlineSvgProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

function sanitizeSvgMarkup(raw: string): string | null {
  const svg = raw
    .replace(/<\?xml[\s\S]*?\?>/gi, "")
    .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/((?:xlink:)?href)\s*=\s*"javascript:[^"]*"/gi, '$1="#"')
    .trim();

  // strip fixed width/height off the root <svg> only, so it scales via CSS
  const openTag = svg.match(/<svg\b[^>]*>/i)?.[0];
  if (!openTag) return null;

  const cleanedOpenTag = openTag
    .replace(/\swidth="[^"]*"/i, "")
    .replace(/\sheight="[^"]*"/i, "");

  return svg.replace(openTag, cleanedOpenTag);
}

async function fetchSvgMarkup(src: string) {
  try {
    const res = await fetch(src, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return sanitizeSvgMarkup(await res.text());
  } catch {
    return null;
  }
}

// Renders a remote SVG inline in the DOM (instead of behind an <img> src) so
// CSS can reach its path/rect stroke-width — an <img> renders the SVG in a
// separate document and ignores any styling of its internals.
export default async function InlineSvg({
  src,
  className,
  style,
}: InlineSvgProps) {
  const markup = await fetchSvgMarkup(src);
  if (!markup) return null;

  return (
    <span
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
