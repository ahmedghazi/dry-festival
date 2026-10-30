import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "./sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { _linkResolver } from "./utils";
import EmbedComponent from "../components/ui/Embed";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    "text-lg": ({ children }) => <p className=' md:text-md'>{children}</p>,
  },
  types: {
    // image: ({ value }) => {
    //   console.log(value)
    //   return <img src={urlFor(value.asset)} alt="some image" />
    // },
    image: ({ value }) => {
      console.log(value);
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
      return <Link href={_linkResolver(value.reference)}>{children}</Link>;
    },
    linkExternal: ({ children, value }) => {
      const { href } = value;
      return (
        <a href={href} rel={"noreferrer noopener"} target='_blank'>
          <span>{children}</span>
        </a>
      );
    },
    linkWeezevent: ({ children, value }) => {
      const { link } = value;
      return (
        <a
          // className='btn btn--weezevent'
          href={link}
          rel={"noreferrer noopener"}
          target='_blank'
          title='Logiciel billetterie en ligne'
          //  href="https://widget.weezevent.com/ticket/E2155285/?code=45405&locale=fr-FR&width_auto=1&color_primary=FF6680"
          className='weezevent-widget-integration btn btn--weezevent'
          data-src={link}
          data-id='2155285'
          data-resize='1'
          data-width_auto='1'
          data-noscroll='0'
          data-use-container='yes'
          data-type='neo'>
          <span>{children}</span>
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
