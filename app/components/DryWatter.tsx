"use client";
import React, { useEffect, useRef } from "react";

// ─── Variables d'ajustement ───────────────────────────────────────────────────
const COLOR_PINK = "#FF6680"; // couleur de l'eau rose (fond bas de page)
const COLOR_BLUE = "#9DCBE1"; // couleur de l'eau bleue (reflet sur le logo)
const VISCOSITY = 0.98; // amortissement : 0 = très fluide, 1 = rigide (0.90–0.98)
const GYRO_SENSITIVITY = 4; // pixels de décalage par degré de tilt (verre incliné)
const MOUSE_FORCE = 3; // amplitude des vagues souris (1–22, était 22 trop haut)
// ─────────────────────────────────────────────────────────────────────────────

const DryWatter = () => {
  const pinkCanvasRef = useRef<HTMLCanvasElement>(null);
  const grayCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const pinkCanvas = pinkCanvasRef.current;
    const grayCanvas = grayCanvasRef.current;
    if (!pinkCanvas || !grayCanvas) return;

    const pinkCtx = pinkCanvas.getContext("2d");
    const grayCtx = grayCanvas.getContext("2d");
    if (!pinkCtx || !grayCtx) return;

    let animationFrameId: number;
    let width = (pinkCanvas.width = grayCanvas.width = window.innerWidth);
    let height = (pinkCanvas.height = grayCanvas.height = window.innerHeight);

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

    let waterLevel = height * 0.5;

    // Tilt courant du gyroscope (gamma : −90° gauche → +90° droite)
    let tiltGamma = 0;

    // --- Masque logo ---
    let logoImg: HTMLImageElement | null = null;
    let logoBounds = { left: 0, top: 0, width: 0, height: 0 };

    const updateLogoBounds = () => {
      const svgEl = document.querySelector(".logo-dry svg");
      if (!svgEl) return;
      const svgRect = svgEl.getBoundingClientRect();
      const canvasRect = pinkCanvas.getBoundingClientRect();
      const scaleX = pinkCanvas.width / canvasRect.width;
      const scaleY = pinkCanvas.height / canvasRect.height;
      logoBounds = {
        left: (svgRect.left - canvasRect.left) * scaleX,
        top: (svgRect.top - canvasRect.top) * scaleY,
        width: svgRect.width * scaleX,
        height: svgRect.height * scaleY,
      };
    };

    const loadLogoMask = () => {
      const svgEl = document.querySelector(".logo-dry svg");
      if (!svgEl || logoBounds.width === 0) return;
      const clone = svgEl.cloneNode(true) as SVGElement;
      clone.setAttribute("width", String(logoBounds.width));
      clone.setAttribute("height", String(logoBounds.height));
      const blob = new Blob([new XMLSerializer().serializeToString(clone)], {
        type: "image/svg+xml",
      });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        logoImg = img;
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    updateLogoBounds();
    loadLogoMask();

    const initPoints = () => {
      points.length = 0;
      waterLevel = height * 0.5;
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
      if (e.gamma !== null) tiltGamma = e.gamma;
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
        // Android / autres
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    setupGyroscope();

    const handleResize = () => {
      width = pinkCanvas.width = grayCanvas.width = window.innerWidth;
      height = pinkCanvas.height = grayCanvas.height = window.innerHeight;
      initPoints();
      updateLogoBounds();
      loadLogoMask();
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

    const animate = () => {
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

      // --- Canvas rose ---
      pinkCtx.clearRect(0, 0, width, height);
      drawWavePath(pinkCtx);
      pinkCtx.fillStyle = COLOR_PINK;
      pinkCtx.fill();
      pinkCtx.strokeStyle = "#000000";
      pinkCtx.lineWidth = 2;
      pinkCtx.stroke();

      // --- Canvas bleu (masqué sur le logo) ---
      grayCtx.clearRect(0, 0, width, height);
      drawWavePath(grayCtx);
      grayCtx.fillStyle = COLOR_BLUE;
      grayCtx.fill();
      grayCtx.strokeStyle = "#000000";
      grayCtx.lineWidth = 2;
      grayCtx.stroke();
      if (logoImg) {
        grayCtx.globalCompositeOperation = "destination-in";
        grayCtx.drawImage(
          logoImg,
          logoBounds.left,
          logoBounds.top,
          logoBounds.width,
          logoBounds.height,
        );
        grayCtx.globalCompositeOperation = "source-over";
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("deviceorientation", handleOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const base: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: "-1%",
    width: "102%",
    height: "102%",
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
