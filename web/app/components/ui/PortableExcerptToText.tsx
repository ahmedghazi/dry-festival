"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import { useEffect, useId, useMemo, useState } from "react";
import { publish, subscribe, unsubscribe } from "pubsub-js";
import { PortableText, type PortableTextComponents } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
import { BlockContent } from "@/app/sanity-api/types/sanity.types";
import "./PortableExcerptToText.scss";

const TOPIC_OPEN = "PORTABLE_EXCERPT.OPEN";

type Props = {
  value?: BlockContent | null;
  className?: string;
  components?: PortableTextComponents;
  moreLabel?: string;
  lessLabel?: string;
};

type PortableBlock = Extract<BlockContent[number], { _type: "block" }>;
type PortableSpan = NonNullable<PortableBlock["children"]>[number];

const isPortableBlock = (block: BlockContent[number]): block is PortableBlock =>
  block._type === "block" && !!block.children;

const getPlainText = (blocks: BlockContent): string =>
  blocks
    .filter(isPortableBlock)
    .map((block) =>
      (block.children as PortableSpan[])
        .map((child) => child.text ?? "")
        .join(""),
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

const getIsTruncated = (blocks: BlockContent): boolean => {
  const fullText = getPlainText(blocks);
  if (!fullText) return false;

  const [, ...rest] = fullText.split(".");
  return rest.some((part) => part.trim().length > 0);
};

// Truncates block/span structure at the first ".", preserving marks (bold, em, links…).
const getExcerptBlocks = (blocks: BlockContent): BlockContent => {
  const excerptBlocks: PortableBlock[] = [];
  let done = false;

  for (const block of blocks) {
    if (done) break;
    if (!isPortableBlock(block)) continue;

    const children = block.children as PortableSpan[];
    const newChildren: PortableSpan[] = [];

    for (const child of children) {
      if (done) break;
      if (child._type !== "span" || typeof child.text !== "string") {
        newChildren.push(child);
        continue;
      }
      const periodIndex = child.text.indexOf(".");
      if (periodIndex === -1) {
        newChildren.push(child);
        continue;
      }
      newChildren.push({
        ...child,
        text: child.text.slice(0, periodIndex + 1),
      });
      done = true;
    }

    excerptBlocks.push({ ...block, children: newChildren });
  }

  return excerptBlocks;
};

const PortableExcerptToText = ({
  value,
  className,
  components = portableTextComponents,
  moreLabel = "+",
  lessLabel = "−",
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const id = useId();

  const blocks = useMemo<BlockContent>(
    () => (Array.isArray(value) ? value : []),
    [value],
  );
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

  // if (!isTruncated) {
  //   return (
  //     <div className={clsx("portable-excerpt", className)}>
  //       <PortableText value={blocks} components={components} />
  //     </div>
  //   );
  // }

  return (
    <div
      className={clsx("portable-excerpt", className)}
      data-expanded={expanded}>
      <div
        className='portable-excerpt__excerpt text text-md'
        style={{ "--more-label": `"[${moreLabel}]"` } as CSSProperties}
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
          <div className='flex justify-center text-md'>
            <button
              type='button'
              className='portable-excerpt__toggle portable-excerpt__toggle--less'
              aria-expanded={expanded}
              tabIndex={expanded ? 0 : -1}
              onClick={() => setExpanded(false)}>
              [{lessLabel}]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortableExcerptToText;
