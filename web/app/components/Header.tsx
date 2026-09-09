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
  // const { scrollDirection } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    setActive(false);
  }, [pathname]);

  const _scrollToFooter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className={""}>
      <div className='inner'>
        <div className='sm-only'>
          <ul className='menu-mobile flex justify-between'>
            <li>
              <Link href='/' onClick={_scrollToFooter}>
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
                {active ? "fermer" : "menu"}
              </button>
            </li>
          </ul>
        </div>
        <nav className={active ? "is-active" : ""}>
          <ul>
            {settings?.navPrimary?.map((item) => {
              if (item._type !== "linkInternal") return null;
              const href = _linkResolver(item?.link);
              return (
                <li key={item._key}>
                  <Link
                    href={href}
                    data-text={item.label}
                    aria-current={pathname === href ? "page" : undefined}>
                    <span className='medium'>{item.label}</span>
                    <span className='strong'>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
