"use client";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";
import React, { useEffect, useRef, useState } from "react";
import LogoDry from "../../LogoDry";
import LogoDryMobile from "../../LogoDryMobile";
import DryWatter from "../../DryWatter";

type Props = {};

const ModuleDryWater = (props: Props) => {
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
                <p>
                  {" "}
                  <strong>dry festival</strong>
                </p>
                <p>
                  Le nouveau salon entièrement dédié aux boissons sans alcool.
                  Pendant trois jours, le Carreau du Temple devient le
                  rendez-vous de la boisson sans alcool. Ici, le sans alcool
                  n’est ni un substitut ni un compromis. C’est une catégorie à
                  part entière, exigeante, créative, et pleinement assumée.
                </p>
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
