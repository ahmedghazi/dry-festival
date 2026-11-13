import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "./sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { _linkResolver } from "./utils";
import EmbedComponent from "../components/ui/Embed";
import clsx from "clsx";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    "text-lg": ({ children }) => <p className=' md:text-md'>{children}</p>,
  },
  types: {
    image: ({ value }) => {
      return (
        <div className='media rounded'>
          <Image
            src={urlFor(value.asset, 1200)}
            alt='icon'
            width={1200}
            height={1200}
          />
        </div>
      );
    },
    hr: () => <hr />,
    embed: ({ value }) => {
      return (
        <div className='media rounded'>
          <EmbedComponent input={value} />
        </div>
      );
    },
  },

  marks: {
    linkInternal: ({ children, value }) => {
      const { reference, cta, color } = value;
      return (
        <Link
          className={clsx(
            cta ? "btn btn--cta" : "",
            // color ? `btn--${color}` : "",
          )}
          style={{
            backgroundColor: `var(--color-${color})`,
          }}
          href={_linkResolver(reference)}>
          {children}
        </Link>
      );
    },
    linkExternal: ({ children, value }) => {
      const { href, cta } = value;
      return (
        <a
          className={cta ? "btn btn--cta" : ""}
          href={href}
          rel={"noreferrer noopener"}
          target='_blank'>
          <span>{children}</span>
        </a>
      );
    },
    linkWeezevent: ({ children, value }) => {
      /*
<a
title="Logiciel billetterie en ligne"
href="https://widget.weezevent.com/ticket/38b56177-8b10-4bf7-a29a-c3eae8aff1d4?locale=fr-fr"
class="weezevent-widget-integration"
target="_blank"
data-src="https://widget.weezevent.com/ticket/38b56177-8b10-4bf7-a29a-c3eae8aff1d4?locale=fr-fr"
data-width="650"
data-height="600"
data-resize="1"
data-nopb="1"
data-type="neo"
data-width_auto="1"
>Billetterie Weezevent</a>
<script type="text/javascript" src="https://widget.weezevent.com/weez.js"  async defer></script>
      */
      const { link } = value;
      return (
        <a
          target='_blank'
          href={link}
          rel={"noreferrer noopener"}
          title='Logiciel billetterie en ligne'
          //  href="https://widget.weezevent.com/ticket/E2155285/?code=45405&locale=fr-FR&width_auto=1&color_primary=FF6680"
          className='weezevent-widget-integration'
          data-src={link}
          data-width='650'
          data-height='600'
          data-resize='1'
          data-nopb='1'
          data-type='neo'
          data-width_auto='1'>
          <span>{children} </span>
        </a>
      );
    },
    align_left: ({ children, value }) => (
      <p className='text-left'>{children}</p>
    ),
    align_center: ({ children, value }) => (
      <p className='text-center'>{children}</p>
    ),
    align_right: ({ children, value }) => (
      <p className='text-right'>{children}</p>
    ),
  },
};

export default portableTextComponents;
