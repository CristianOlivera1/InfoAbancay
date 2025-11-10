import { gsap } from 'gsap';

export type AnimationType = 'like' | 'dislike' | 'comment' | 'bookmark' | 'share';

export function animateButton(element: HTMLElement, type: AnimationType) {
    const tl = gsap.timeline();
    switch (type) {
        case 'like':
            tl.to(element, {
                scale: 0.8,
                duration: 0.1
            })
                .to(element, {
                    scale: 1.2,
                    duration: 0.15,
                    ease: "back.out(1.7)"
                })
                .to(element, {
                    scale: 1,
                    duration: 0.1
                });
            break;
        case 'dislike':
            tl.to(element, {
                rotationY: 180,
                duration: 0.3,
                ease: "power2.inOut"
            })
                .to(element, {
                    rotationY: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
            break;
        case 'comment':
            tl.to(element, {
                rotation: -10,
                duration: 0.1
            })
                .to(element, {
                    rotation: 10,
                    duration: 0.1
                })
                .to(element, {
                    rotation: -10,
                    duration: 0.1
                })
                .to(element, {
                    rotation: 0,
                    duration: 0.1
                });
            break;
        case 'bookmark': {
            const svg = element.querySelector('svg');
            if (svg) {
                tl.to(svg, {
                    scale: 0.9,
                    rotate: -10,
                    duration: 0.1,
                    transformOrigin: "center center"
                })
                    .to(svg, {
                        scale: 1.2,
                        rotate: 10,
                        duration: 0.2,
                        ease: "elastic.out(1, 0.4)"
                    })
                    .to(svg, {
                        scale: 1,
                        rotate: 0,
                        duration: 0.15,
                        ease: "power2.out"
                    });
            }
            break;
        }
        case 'share':
            tl.to(element, {
                scale: 0.85,
                rotate: -15,
                opacity: 0.9,
                duration: 0.12,
                transformOrigin: "center center"
            })
                .to(element, {
                    rotate: 360,
                    scale: 1.25,
                    opacity: 1,
                    duration: 0.5,
                    ease: "expo.out"
                })
                .to(element, {
                    scale: 1,
                    rotate: 0,
                    duration: 0.25,
                    ease: "back.out(1.8)"
                });
            break;
    }
}
