"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import useDeviceDetect from "../hooks/useDeviceDetect";

// ─── Variables d'ajustement ───────────────────────────────────────────────────
const COLOR_PINK = "rgb(255, 93, 112)"; // couleur de l'eau rose (fond bas de page) — défaut si randomizeColors=false
const COLOR_BLUE = "rgb(146, 184, 204)"; // couleur de l'eau bleue (reflet sur le logo) — défaut si randomizeColors=false
// const VISCOSITY = 0.98; // amortissement : 0 = très fluide, 1 = rigide (0.90–0.98)
const VISCOSITY = 0.85; // amortissement : 0 = très fluide, 1 = rigide (0.90–0.98)
const GYRO_SENSITIVITY = 2; // pixels de décalage par degré de tilt (verre incliné)
const MOUSE_FORCE = 3; // amplitude des vagues souris (1–22, était 22 trop haut)
// ─────────────────────────────────────────────────────────────────────────────

// ─── Palette de randomisation (web/app/global.css) ─────────────────────────
// Deux groupes (chaud / froid) pour garder du contraste entre l'eau (rose)
// et le reflet du logo (bleu) même quand les couleurs sont tirées au hasard.
const PINK_PALETTE = [
  // "rgb(255, 140, 113)", // --color-red-50
  "rgb(255, 93, 112)", // --color-red-100
  "rgb(255, 141, 244)", // --color-pink-50
  "rgb(255, 94, 244)", // --color-pink-100
  "rgb(255, 255, 36)", // --color-yellow-100
];
const BLUE_PALETTE = [
  "rgb(146, 184, 204)", // --color-blue-50
  "rgb(119, 181, 254)", // --color-blue-100
  // "rgb(10, 5, 240)", // --color-blue-200
  "rgb(161, 178, 0)", // --color-lime-100
  "rgb(54, 148, 0)", // --color-green-100
  "rgb(140, 77, 239)", // --color-purple-100
];
const pickRandom = (palette: string[]) =>
  palette[Math.floor(Math.random() * palette.length)];
// ─────────────────────────────────────────────────────────────────────────────

interface DryWatterProps {
  logoRef: React.RefObject<HTMLDivElement | null>;
  /** Pioche une couleur au hasard dans la palette (contrastée) à chaque montage. Défaut: true. */
  randomizeColors?: boolean;
}

const DryWatter = ({ logoRef, randomizeColors = true }: DryWatterProps) => {
  const pinkCanvasRef = useRef<HTMLCanvasElement>(null);
  const grayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [colors] = useState(() =>
    randomizeColors
      ? { pink: pickRandom(PINK_PALETTE), blue: pickRandom(BLUE_PALETTE) }
      : { pink: COLOR_PINK, blue: COLOR_BLUE },
  );
  // const [strokeSize, setStrokeSize] = useState<number>(3);
  const { isMobile } = useDeviceDetect();
  // let strokeSize = isMobile ? 2 : 3;
  // useEffect(() => {
  //   setStrokeSize(isMobile ? 1 : 3);
  // }, [isMobile]);

  useEffect(() => {
    const pinkCanvas = pinkCanvasRef.current;
    const grayCanvas = grayCanvasRef.current;
    if (!pinkCanvas || !grayCanvas) return;

    const pinkCtx = pinkCanvas.getContext("2d");
    const grayCtx = grayCanvas.getContext("2d");
    if (!pinkCtx || !grayCtx) return;

    let animationFrameId = 0;
    let isRunning = false;
    // Cap DPR: on 3x+ screens the uncapped backing-store area (and the
    // per-frame clear/fill/stroke cost of two full-viewport canvases)
    // roughly triples for no visible gain.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const applyDpr = () => {
      pinkCanvas.width = grayCanvas.width = width * dpr;
      pinkCanvas.height = grayCanvas.height = height * dpr;
      pinkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applyDpr();

    // --- Physique partagée ---
    const numPoints = 40;
    const points: { x: number; y: number; targetY: number; vy: number }[] = [];
    const tension = 0.025;
    const damping = VISCOSITY;
    const spread = 0.18;
    const mouseForce = MOUSE_FORCE;
    const mouseRadius = 180;

    const mouse: {
      x: number | null;
      y: number | null;
      oldX: number | null;
      oldY: number | null;
    } = { x: null, y: null, oldX: null, oldY: null };

    let waterLevel = height * 1.1; // start below screen (empty glass)

    // Tilt courant du gyroscope (gamma : −90° gauche → +90° droite)
    let tiltGamma = 0;
    let gyroGranted = false;
    let idleTime = 0;

    // --- Masque logo (CSS mask sur le canvas bleu) ---
    let maskBlobUrl: string | null = null;

    const getSvgEl = () =>
      logoRef.current?.querySelector("svg") as SVGElement | null;

    const applyLogoMask = () => {
      const svgEl = getSvgEl();
      if (!svgEl) return;
      const svgRect = svgEl.getBoundingClientRect();
      const canvasRect = grayCanvas.getBoundingClientRect();
      // Position and size in CSS pixels, relative to the canvas element
      const maskX = svgRect.left - canvasRect.left;
      const maskY = svgRect.top - canvasRect.top;
      const maskW = svgRect.width;
      const maskH = svgRect.height;

      if (maskBlobUrl) URL.revokeObjectURL(maskBlobUrl);
      const blob = new Blob([new XMLSerializer().serializeToString(svgEl)], {
        type: "image/svg+xml",
      });
      maskBlobUrl = URL.createObjectURL(blob);

      const val = `url("${maskBlobUrl}")`;
      const sz = `${maskW}px ${maskH}px`;
      const pos = `${maskX}px ${maskY}px`;
      grayCanvas.style.maskImage = val;
      grayCanvas.style.maskSize = sz;
      grayCanvas.style.maskPosition = pos;
      grayCanvas.style.maskRepeat = "no-repeat";
      (grayCanvas.style as CSSStyleDeclaration & Record<string, string>)[
        "webkitMaskImage"
      ] = val;
      (grayCanvas.style as CSSStyleDeclaration & Record<string, string>)[
        "webkitMaskSize"
      ] = sz;
      (grayCanvas.style as CSSStyleDeclaration & Record<string, string>)[
        "webkitMaskPosition"
      ] = pos;
      (grayCanvas.style as CSSStyleDeclaration & Record<string, string>)[
        "webkitMaskRepeat"
      ] = "no-repeat";
    };

    // Defer one frame so CSS transforms (e.g. translateY on mobile) are applied
    requestAnimationFrame(applyLogoMask);

    const initPoints = () => {
      points.length = 0;
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: (width / (numPoints - 1)) * i,
          y: waterLevel,
          targetY: waterLevel,
          vy: 0,
        });
      }
    };
    initPoints();

    // Fill-up on load: animate water level from bottom to 50% window height
    const wlObj = { value: waterLevel };
    gsap.to(wlObj, {
      value: height * 0.5,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        waterLevel = wlObj.value;
      },
    });

    // --- Souris ---
    const handleMouseMove = (e: MouseEvent) => {
      mouse.oldX = mouse.x;
      mouse.oldY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const mouseSpeedY = mouse.oldY !== null ? mouse.y - mouse.oldY : 0;
      if (
        mouse.y !== null &&
        mouse.x !== null &&
        mouse.y > waterLevel - 150 &&
        mouse.y < waterLevel + 150
      ) {
        points.forEach((p) => {
          const dist = Math.abs((mouse.x as number) - p.x);
          if (dist < mouseRadius)
            p.vy += mouseSpeedY * 0.1 * (1 - dist / mouseRadius) * mouseForce;
        });
      }
    };

    // --- Gyroscope ---
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null) {
        tiltGamma = e.gamma;
        gyroGranted = true;
      }
    };

    const setupGyroscope = () => {
      if (typeof DeviceOrientationEvent === "undefined") return;

      type DOEWithPermission = typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<string>;
      };
      const DOE = DeviceOrientationEvent as DOEWithPermission;

      if (typeof DOE.requestPermission === "function") {
        // iOS 13+ : demander la permission au premier touch
        document.addEventListener(
          "touchstart",
          () => {
            DOE.requestPermission!()
              .then((state) => {
                if (state === "granted")
                  window.addEventListener(
                    "deviceorientation",
                    handleOrientation,
                  );
              })
              .catch(console.error);
          },
          { once: true },
        );
      } else {
        // Android / autres — permission implicite
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    setupGyroscope();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      applyDpr();
      waterLevel = height * 0.5;
      initPoints();
      applyLogoMask();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const drawWavePath = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(points[0].x, points[0].y);
      for (let i = 0; i < numPoints - 1; i++) {
        const p1 = points[i],
          p2 = points[i + 1];
        ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
      }
      ctx.lineTo(width, points[numPoints - 1].y);
      ctx.lineTo(width, height);
      ctx.closePath();
    };

    // Open path — wave surface only, used for stroke so no side/bottom lines are drawn
    const drawWaveLine = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < numPoints - 1; i++) {
        const p1 = points[i],
          p2 = points[i + 1];
        ctx.quadraticCurveTo(p1.x, p1.y, (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
      }
      ctx.lineTo(width, points[numPoints - 1].y);
    };

    const animate = () => {
      idleTime += 0.012;

      // Idle waves when gyro is not active (no permission or desktop)
      if (!gyroGranted) {
        for (let i = 0; i < numPoints; i++) {
          const phase = (i / numPoints) * Math.PI * 2;
          const slow = Math.sin(idleTime * 0.7 + phase) * 0.18;
          const fast = Math.sin(idleTime * 1.9 + phase * 1.3) * 0.07;
          points[i].vy += slow + fast;
        }
      }

      // 1. targetY : position d'équilibre inclinée selon le gyroscope
      //    gamma > 0 (incliné à droite) → eau se déplace à droite → droite plus basse (y plus grand)
      for (let i = 0; i < numPoints; i++) {
        points[i].targetY =
          waterLevel -
          tiltGamma * GYRO_SENSITIVITY * (points[i].x / width - 0.5) * 2;
      }

      // 2. Ressort vers targetY
      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        p.vy += (p.targetY - p.y) * tension;
        p.vy *= damping;
      }

      // 3. Propagation horizontale
      for (let i = 0; i < numPoints; i++) {
        if (i > 0) points[i].vy += (points[i - 1].y - points[i].y) * spread;
        if (i < numPoints - 1)
          points[i].vy += (points[i + 1].y - points[i].y) * spread;
      }

      // 4. Appliquer vélocités
      for (let i = 0; i < numPoints; i++) points[i].y += points[i].vy;

      const strokeSize = isMobile ? 2 : 3;
      // --- Canvas rose ---
      pinkCtx.clearRect(0, 0, width, height);
      drawWavePath(pinkCtx);
      pinkCtx.fillStyle = colors.pink;
      pinkCtx.fill();
      drawWaveLine(pinkCtx);
      pinkCtx.strokeStyle = "#000000";
      pinkCtx.lineWidth = strokeSize;
      pinkCtx.stroke();

      // --- Canvas bleu (clipping géré par CSS mask sur l'élément) ---
      grayCtx.clearRect(0, 0, width, height);
      drawWavePath(grayCtx);
      grayCtx.fillStyle = colors.blue;
      grayCtx.fill();
      drawWaveLine(grayCtx);
      grayCtx.strokeStyle = "#000000";
      grayCtx.lineWidth = strokeSize;
      grayCtx.stroke();
      animationFrameId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      animate();
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    // Pause the render loop entirely while the section is scrolled out of
    // view — this is the actual CPU/GPU cost (two full-viewport canvases
    // redrawn every frame), not something rAF's own tab-hidden throttling
    // covers.
    const observerTarget = pinkCanvas.parentElement ?? pinkCanvas;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(observerTarget);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("deviceorientation", handleOrientation);
      intersectionObserver.disconnect();
      stopLoop();
      gsap.killTweensOf(wlObj);
      if (maskBlobUrl) URL.revokeObjectURL(maskBlobUrl);
    };
  }, [logoRef, isMobile, colors]);

  const base: React.CSSProperties = {
    position: "absolute",
    top: 0,
    // left: "-1%",
    // width: "102%",
    // height: "102%",
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  };

  return (
    <>
      <canvas
        ref={pinkCanvasRef}
        style={{ ...base, zIndex: 1, mixBlendMode: "normal" }}
      />
      <canvas
        ref={grayCanvasRef}
        style={{ ...base, zIndex: 3, mixBlendMode: "multiply" }}
      />
    </>
  );
};

export default DryWatter;
