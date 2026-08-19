"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import website from "../config/website";
import { useScroll } from "../hooks/useScroll";
import { SETTINGS_QUERY_RESULT } from "../sanity-api/types/sanity.types";
import { _linkResolver } from "../sanity-api/utils";
import { usePathname } from "next/navigation";

type Props = {
  settings: SETTINGS_QUERY_RESULT;
};
const Header = ({ settings }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const { scrollDirection } = useScroll();
  const pathname = usePathname();
  useEffect(() => {
    setActive(false);
  }, [pathname]);
  return (
    <header className={scrollDirection ? `is-${scrollDirection}` : ""}>
      <div className='inner'>
        <div className='sm-only'>
          <ul className='menu-mobile flex justify-between'>
            <li>
              <Link href='/'>
                <span>contact</span>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <span className='strong'>{website.title}</span>
              </Link>
            </li>
            <li>
              <button className='nav-toggle' onClick={() => setActive(!active)}>
                menu
              </button>
            </li>
          </ul>
        </div>
        <nav className={active ? "is-active" : ""}>
          <ul>
            {settings?.navPrimary?.map((item) => (
              <li key={item._key}>
                {item._type === "linkInternal" && (
                  <Link href={_linkResolver(item?.link)} data-text={item.label}>
                    <span className='medium'>{item.label}</span>
                    <span className='strong'>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
