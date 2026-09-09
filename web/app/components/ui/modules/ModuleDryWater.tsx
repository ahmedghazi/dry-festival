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

// - Vert kaki : #a1b200
//   - Vert foncé : #369300

//   - Rose clair : #ff8df4
//   - Rose magenta : #ff5ff4

//   - Rouge corail : #ff8c71
//   - Rouge : #ff5d71

const colors = [
  {
    air: "#a1b200",
    water: "#369300",
  },
  {
    air: "#ff8df4",
    water: "#ff5ff4",
  },
  {
    air: "#ff8c71",
    water: "#ff5d71",
  },
];

const ModuleDryWater = ({ input, randomizeColors }: Props) => {
  const { text } = input;

  const { isMobile } = useDeviceDetect();
  const [mounted, setMounted] = useState(false);
  const [colorSet, setColorSet] = useState(() => colors[0]);
  const logoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setMounted(true);
    if (randomizeColors) {
      setColorSet(colors[Math.floor(Math.random() * colors.length)]);
    }
  }, [randomizeColors]);
  return (
    <section className='module module--dry-water-ui '>
      <div
        className='dry-water rounded'
        style={{ "--dry-water-air": colorSet.air } as React.CSSProperties}>
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

            <DryWatter logoRef={logoRef} waterColor={colorSet.water} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ModuleDryWater;
