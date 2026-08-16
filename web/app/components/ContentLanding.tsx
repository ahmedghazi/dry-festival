"use client";
import React, { useEffect, useRef, useState } from "react";
import LogoDry from "./LogoDry";
import DryWatter from "./DryWatter";
import useDeviceDetect from "../hooks/useDeviceDetect";
import LogoDryMobile from "./LogoDryMobile";

const ContentLanding = () => {
  const { isMobile } = useDeviceDetect();
  const [mounted, setMounted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className='content--landing px-md '>
      {mounted && (
        <div className='inner'>
          <div className='header'>more coming soon…</div>
          <div ref={logoRef}>
            {!isMobile && <LogoDry />}
            {isMobile && <LogoDryMobile />}
          </div>
          <div className='footer'>
            <p>
              {" "}
              <strong>dry festival</strong>
            </p>
            {/* <p style={{ fontSize: "4rem" }}>GRaj</p> */}
            <p>un nouveau salon entièrement dédié aux boissons sans alcool</p>
            <p>
              9, 10 + 11 Janvier 2027 | Carreau du Temple, Paris |{" "}
              <a href='mailto:bonjour@dryfestival.com'>
                bonjour@dryfestival.com
              </a>
            </p>
          </div>
          <DryWatter logoRef={logoRef} />
        </div>
      )}
    </div>
  );
};

export default ContentLanding;
