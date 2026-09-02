"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import { useEffect, useId, useMemo, useState } from "react";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import { PortableText, type PortableTextComponents } from "next-sanity";
import "./PortableExcerptToText.scss";

const TOPIC_OPEN = "PORTABLE_EXCERPT.OPEN";

// A minimal, structural subset of the Portable Text spec — deliberately not
// imported from @portabletext/types so this component has no schema/version
// coupling and can be dropped into any Sanity + next-sanity project as-is.
type PortableTextSpan = {
  _type: string;
  _key?: string;
  text?: string;
};

type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  children?: PortableTextSpan[];
};

type Props = {
  value?: PortableTextBlock[] | null;
  className?: string;
  components?: PortableTextComponents;
  /** Full glyph shown at the end of the excerpt, e.g. "[+]" or "Read more". */
  moreGlyph?: string;
  /** Full glyph shown at the end of the expanded text, e.g. "[−]" or "Read less". */
  lessGlyph?: string;
};

const isPortableBlock = (
  block: PortableTextBlock,
): block is PortableTextBlock & { children: PortableTextSpan[] } =>
  block._type === "block" && Array.isArray(block.children);

const getPlainText = (blocks: PortableTextBlock[]): string =>
  blocks
    .filter(isPortableBlock)
    .map((block) => block.children.map((child) => child.text ?? "").join(""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

const getIsTruncated = (blocks: PortableTextBlock[]): boolean => {
  const fullText = getPlainText(blocks);
  if (!fullText) return false;

  const [, ...rest] = fullText.split(".");
  return rest.some((part) => part.trim().length > 0);
};

// Truncates block/span structure at the first ".", preserving marks (bold, em, links…).
const getExcerptBlocks = (blocks: PortableTextBlock[]): PortableTextBlock[] => {
  const excerptBlocks: PortableTextBlock[] = [];
  let done = false;

  for (const block of blocks) {
    if (done) break;
    if (!isPortableBlock(block)) continue;

    const newChildren: PortableTextSpan[] = [];

    for (const child of block.children) {
      if (done) break;
      const text = child.text;
      if (typeof text !== "string") {
        newChildren.push(child);
        continue;
      }
      const periodIndex = text.indexOf(".");
      if (periodIndex === -1) {
        newChildren.push(child);
        continue;
      }
      newChildren.push({ ...child, text: text.slice(0, periodIndex + 1) });
      done = true;
    }

    excerptBlocks.push({ ...block, children: newChildren });
  }

  return excerptBlocks;
};

const PortableExcerptToText = ({
  value,
  className,
  components,
  moreGlyph = "[+]",
  lessGlyph = "[−]",
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  const blocks = useMemo(() => (Array.isArray(value) ? value : []), [value]);
  const isTruncated = useMemo(() => getIsTruncated(blocks), [blocks]);
  const excerptBlocks = useMemo(() => getExcerptBlocks(blocks), [blocks]);

  useEffect(() => {
    const token = subscribe(TOPIC_OPEN, (_msg, openedId) => {
      if (openedId !== id) setExpanded(false);
    });
    return () => {
      unsubscribe(token);
    };
  }, [id]);

  const _onExpand = () => {
    setExpanded(true);
    publish(TOPIC_OPEN, id);
  };

  if (!blocks.length) return null;

  if (!isTruncated) {
    return (
      <div className={clsx("portable-excerpt", className)}>
        <PortableText value={blocks} components={components} />
      </div>
    );
  }

  return (
    <div
      className={clsx("portable-excerpt", className)}
      data-expanded={expanded}>
      <div
        className='portable-excerpt__excerpt'
        style={{ "--more-glyph": `"${moreGlyph}"` } as CSSProperties}
        role='button'
        tabIndex={expanded ? -1 : 0}
        aria-expanded={expanded}
        aria-controls={id}
        aria-hidden={expanded}
        onClick={_onExpand}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            _onExpand();
          }
        }}>
        <PortableText value={excerptBlocks} components={components} />
      </div>
      <div className='portable-excerpt__full' id={id}>
        <div className='portable-excerpt__full-inner'>
          <PortableText value={blocks} components={components} />
          <button
            type='button'
            className='portable-excerpt__toggle'
            aria-expanded={expanded}
            tabIndex={expanded ? 0 : -1}
            onClick={() => setExpanded(false)}>
            {lessGlyph}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortableExcerptToText;
