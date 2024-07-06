"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ImageField } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";
import { clsx } from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Avatar = ({
  image,
  className,
}: {
  image: ImageField;
  className: string;
}) => {
  const container = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { opacity: 0, scale: 1.4 },
        {
          opacity: 1,
          scale: 1,
          duration: prefersReducedMotion ? 0 : 1.3,
          ease: "power3.inOut",
        }
      );

      window.onmousemove = (e) => {
        if (!container.current) return; // no container no animation
        const containerRect = (
          container.current as HTMLDivElement
        ).getBoundingClientRect();
        const containerCenterX = containerRect.left + containerRect.width / 2;

        let containerPercent = {
          x: (e.clientX - containerCenterX) / (containerRect.width / 2),
        };

        let distFromCenterX = 1 - Math.abs(containerPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * containerPercent.x),
              duration: 0.5,
            },
            0
          )
          .to(
            ".highlight",
            {
              opacity: distFromCenterX - 0.7,
              x: -10 + 20 * containerPercent.x,
              duration: 0.5,
            },
            0
          );
      };
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div ref={container} className={clsx("relative w-full h-fit", className)}>
      <div
        className="avatar aspect-square rounded-xl border-2 border-slate-700 overflow-hidden opacity-1"
        style={{ perspective: "500px", perspectiveOrigin: "150% 150%" }}
      >
        <PrismicImage
          field={image}
          className="w-full h-full object-fill"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
};

export default Avatar;
