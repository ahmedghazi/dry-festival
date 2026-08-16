"use client";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import React, { useEffect, useRef, useState } from "react";
import LogoDry from "../../LogoDry";
import LogoDryMobile from "../../LogoDryMobile";
import DryWatter from "../../DryWatter";
import { DryWaterUI } from "@/app/sanity-api/types/sanity.types";
import { PortableText } from "next-sanity";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";

type Props = {
  input: DryWaterUI;
};

const ModuleDryWater = ({ input }: Props) => {
  const { text } = input;

  const { isMobile } = useDeviceDetect();
  const [mounted, setMounted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className='module module--dry-water-ui rounded'>
      <div className='dry-water'>
        {mounted && (
          <div className='inner'>
            <div ref={logoRef}>
              {!isMobile && <LogoDry />}
              {isMobile && <LogoDryMobile />}
            </div>

            <div className='footer'>
              <div className='text'>
                <div className='module__text text'>
                  <PortableText
                    value={text}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </div>

            <DryWatter logoRef={logoRef} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ModuleDryWater;
