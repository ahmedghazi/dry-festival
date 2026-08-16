import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "./sanity-utils";
import Image from "next/image";
import Link from "next/link";
import { _linkResolver } from "./utils";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    "text-display-lg": ({ children }) => (
      <p className='text-body-md md:text-display-lg'>{children}</p>
    ),
  },
  types: {
    // image: ({ value }) => {
    //   console.log(value)
    //   return <img src={urlFor(value.asset)} alt="some image" />
    // },
    textIcon: ({ value }) => {
      return (
        <Image
          src={urlFor(value.icon.asset, 60)}
          alt='icon'
          width={60}
          height={60}
        />
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
    align_left: ({ children, value }) => (
      <p className='text-left'>{children}</p>
    ),
    align_center: ({ children, value }) => (
      <p className='text-center'>{children}</p>
    ),
    align_right: ({ children, value }) => (
      <p className='text-right'>{children}</p>
    ),
    "text-muted": ({ children, value }) => (
      <span className='text-muted'>{children}</span>
    ),
  },
};

export default portableTextComponents;
