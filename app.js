import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from "lenis";

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0);
    let whoiam = document.querySelector(".whoiam-pre");
    let svgs = whoiam.querySelectorAll(".whoiam-svg");

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: whoiam,
            start: "top top",
            end: innerWidth * 4,
            pin: true,
            scrub: true
        }
    });
    svgs.forEach((svg, i) => {
        tl.to(svg, {
            x: "0%",
        }, 0);
    });
    tl.to(svgs[0].querySelector("svg"), {
        x: "0%",
        y: "100%",
        opacity: 0,
    }, 0.5);
    tl.to(svgs[2].querySelector("svg"), {
        x: "0%",
        y: "-100%",
        opacity: 0,
    }, 0.5);
    tl.to(svgs[1], {
        scale: 0.1,
    }, 0.9);

    let target = document.querySelector(".target");
    tl.to(target, {
        y: -innerHeight / 2 + 100,
    }, 1.3);
    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: whoiam,
            start: "bottom bottom",
            end: "+=" + innerHeight * 3,
            scrub: true,
            pin: true,
        }
    });
    tl2.to(".trait", {
        position: "relative",
        scale: 150,
        ease: "none",
    }, 0);
    // tl2.to(".bright-section", {
    //     y: "-40%",
    //     ease: "none",
    // }, 0);
    let slider = document.querySelector(".img-slider");
    ScrollTrigger.create({
        trigger: slider,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
            gsap.to(slider.querySelector(".images:nth-child(1)"), {
                x: self.progress * -100 + "%",
                ease: "power3.out",
            })
            gsap.to(slider.querySelector(".images-2"), {
                translateX: (self.progress * 100 - 80) + "%",
                ease: "power3.out",
            })
        }
    })
    ScrollTrigger.create({
        trigger: ".teams-pc",
        start: "top top",
        end: `+=${innerWidth}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
            gsap.to(".teams-pc", {
                translateX: (-2 * innerWidth * self.progress) + "px",
                ease: "power3.out",
            })
        }
    })

    let allSections = document.querySelectorAll("section");
    Array.from(allSections).forEach((section) => {
        // char split
        let allCSplit = section.querySelectorAll(".char-split");
        Array.from(allCSplit).forEach((heading) => {
            let Split = SplitText.create(heading, {
                type: "chars",
                mask: "chars"
            })
            gsap.set(Split.chars, {
                y: "125%",
            });
            ScrollTrigger.create({
                trigger: heading,
                start: heading.dataset.start ? heading.dataset.start : `top-=${innerHeight / 2} top`,
                onEnter: () => {
                    gsap.to(Split.chars, {
                        y: "0%",
                        duration: 0.7,
                        ease: "power3.out",
                        stagger: 0.02
                    })
                },
            })
        })
        // line split
        let allLSplit = section.querySelectorAll(".line-split");
        Array.from(allLSplit).forEach((heading) => {
            let Split = SplitText.create(heading, {
                type: "lines",
                mask: "lines"
            })
            gsap.set(Split.lines, {
                y: "125%",
            });
            ScrollTrigger.create({
                trigger: heading,
                start: heading.dataset.start ? heading.dataset.start : `top-=${innerHeight / 2} top`,
                onEnter: () => {
                    gsap.to(Split.lines, {
                        y: "0%",
                        duration: 0.7,
                        ease: "power3.out",
                        stagger: 0.09
                    })
                },
            })
        })
        let allSkewElements = section.querySelectorAll(".scroll-skew");
        let startScrollSkew = 0
        var timerSkew = null;
        function doAfterStoppedSkew() {
            startScrollSkew = false
            allSkewElements.forEach((e) => {
                gsap.to(e, {
                    transform: "skew(0deg, 0deg)",
                    duration: 0.5,
                    ease: "none",
                })

            })
        }
        window.addEventListener('scroll', function() {
            if (!startScrollSkew) {
                startScrollSkew = this.scrollY
            }
            allSkewElements.forEach((e) => {
                let calcSkew = (startScrollSkew - this.scrollY) * 0.004
                calcSkew = calcSkew > 3 ? 3 : calcSkew
                calcSkew = calcSkew < -3 ? -3 : calcSkew
                gsap.to(e, {
                    transform: `skew(0deg, ${calcSkew}deg)`,
                    duration: 0.5,
                    ease: "none",
                })
            })
            if (timerSkew !== null) {
                clearTimeout(timerSkew);
            }
            timerSkew = setTimeout(doAfterStoppedSkew, 20);
        }, false);
    })


    fillBg(".mission", "`top+=${i * 80 - 805} top`", "`top+=${i * 80 - 605} top`", "linear-gradient(90deg, rgb(275, 178, 97) 50%, rgb(78, 78, 78) 0px)")
    fillBg(".bright-section", "`top+=${i * 30 - innerHeight + 100} top`", "`top+=${i * 30 - innerHeight + 250 } top`", "linear-gradient(90deg,rgb(239,81,67) 50%,rgba(239,81,67,.2) 0)")

    // this line
    // fillBg(".whoiam-pre", "`top+=${i * 70 - 100} top`", "`top+=${i * 70} top`", "linear-gradient(90deg, rgb(254 233 206) 50%, rgb(78, 78, 78) 0px)")

})

function fillBg(section, start, end, bg) {
    document.querySelector(section).querySelectorAll(".fill-bg").forEach((heading) => {
        let Split = SplitText.create(heading, {
            type: "words",
            mask: "words"
        })
        Array.from(Split.words).forEach((word, i) => {
            word.style.backgroundClip = "text"
            word.style.backgroundRepeat = "no-repeat"
            word.style.color = "transparent"
            word.style.backgroundImage = bg,
                word.style.backgroundSize = "200% 100%"
            word.style.backgroundPosition = "100% 0"
            ScrollTrigger.create({
                trigger: section,
                start: eval(start),
                end: eval(end),
                scrub: true,
                animation: gsap.fromTo(word, {
                    backgroundPosition: "100% 0",
                    ease: "power3.out",
                }, {
                    backgroundPosition: "0% 0",
                    ease: "power3.out",
                })
            })
        })
    })
}
window.addEventListener("load", () => {
    const load = document.querySelector(".loader");
    gsap.to(load, {
        translateY: "-200%",
        opacity: 1,
        duration: 2,
        ease: "power3.inOut",
    });
    // restore scroll after loader finishes
    document.body.style.overflow = "auto";
    document.body.style.overflowX = "hidden";
});
