"use client";
import Link from "next/link";
import React, { useState } from "react";
import website from "../config/website";
import { useScroll } from "../hooks/useScroll";

const Header = () => {
  const [active, setActive] = useState<boolean>(false);
  const { scrollDirection } = useScroll();
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
            <li>
              <Link href='/' data-text='accueil'>
                <span>accueil</span>
              </Link>
            </li>
            <li>
              <Link href='/programmation' data-text='programmation'>
                <span>programmation</span>
              </Link>
            </li>
            <li>
              <Link href='/projet' data-text='projet'>
                <span>projet</span>
              </Link>
            </li>
            <li>
              <Link href='/exposants' data-text='exposants'>
                <span>exposants</span>
              </Link>
            </li>
            <li>
              <Link href='/partenaires' data-text='partenaires'>
                <span>partenaires</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
