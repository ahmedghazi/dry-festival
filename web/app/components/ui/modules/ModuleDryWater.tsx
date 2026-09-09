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
  randomizeColors?: boolean;
};

const ModuleDryWater = ({ input, randomizeColors }: Props) => {
  const { text } = input;

  const { isMobile } = useDeviceDetect();
  const [mounted, setMounted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    console.log(randomizeColors);
  }, []);
  return (
    <section className='module module--dry-water-ui '>
      <div className='dry-water rounded'>
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

            <DryWatter logoRef={logoRef} randomizeColors={true} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ModuleDryWater;
