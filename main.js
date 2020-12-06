let controller;
let slideScene;
let pageScene;

let fashionScene;
let header = document.querySelector("header");
function homePageAnimations() {
  controller = new ScrollMagic.Controller();
  let sliders = document.querySelectorAll(".swipers");
  sliders.forEach((slider, index) => {
    let revealImg = slider.querySelector(".img-overlay");
    let revealContent = slider.querySelector(".content-overlay");
    let imageOfreveal = slider.querySelector("img");

    // Slide Animation
    let slideTl = gsap.timeline({
      defaults: {
        duration: "1",
        ease: Sine.easeOut,
      },
    });
    slideTl.fromTo(revealImg, 1, { x: "0%" }, { x: "100%" }, "+=1");
    slideTl.fromTo(revealContent, 1, { x: "0%" }, { x: "100%" }, "-=1");
    slideTl.fromTo(imageOfreveal, 1, { scale: 1.3 }, { scale: 1 });

    let headerAnim = gsap.fromTo(header, 1, { y: "-105%" }, { y: "0%" });
    headerAnim.delay(1.5);

    slideScene = new ScrollMagic.Scene({
      triggerHook: 0.3,
      triggerElement: slider,
      reverse: false,
    })

      .setTween(slideTl)
      .addTo(controller);

    // Page Animation
    let pageTl = gsap.timeline();
    let nextSlide = sliders.length - 1 === index ? "end" : sliders[index + 1];

    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slider, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" });
    pageScene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: slider,
      duration: "100%",
    })

      .setPin(slider, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}
let mouse = document.querySelector(".cursor");
let mouseText = mouse.querySelector(".cursor-txt");
let titleSwipe = document.querySelectorAll(".title-swipe");

function cursor(e) {
  mouse.style.top = `${e.pageY}px`;
  mouse.style.left = `${e.pageX}px`;
}
function cursorAnimation(e) {
  if (
    e.target.classList.contains("burger-menu") ||
    e.target === document.querySelector("h1")
  ) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }

  if (e.target.classList.contains("btn")) {
    mouseText.innerText = "Tap";
    mouse.classList.add("active-btn");
    gsap.to(".title-swipe", 1, { y: "0%" });
  } else {
    mouseText.innerText = "";
    mouse.classList.remove("active-btn");
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
let burger = document.querySelector(".burger-menu");
function burgerAnimation(e) {
  e.target.classList.toggle("active");
  if (e.target.classList.contains("active")) {
    gsap.to(".line-1", { rotate: "45", y: "5px", background: "#000" });
    gsap.to(".line-2", { rotate: "-45", y: "-5px", background: "#000" });
    gsap.to(".nav-sec", 1.3, { clipPath: "circle(2500px at 100%-10%)" });
    gsap.to("h1", { color: "#000" });
  } else {
    gsap.to(".line-1", { rotate: "0", y: "0", background: "#fff" });
    gsap.to(".line-2", { rotate: "0", y: "0", background: "#fff" });
    gsap.to(".nav-sec", 1, { clipPath: "circle(50px at 100%-10%)" });
    gsap.to("h1", { color: "#fff" });
  }
}

// Page Animation
let logo = document.querySelector(".header-title a");
barba.init({
  views: [
    {
      namespace: "home",

      beforeEnter() {
        homePageAnimations();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "fashion",
      beforeEnter() {
        window.scrollTo(0, 0);
        let headerAnim = gsap.fromTo(header, 1, { y: "-105%" }, { y: "0%" });
        headerAnim.delay(1.5);
        logo.href = "../index.html";
        fashionPageAnimation();
      },

      beforeLeave() {
        controller.destroy();
        fashionScene.destroy();
      },
    },
  ],
  transitions: [
    {
      leave(data) {
        let done = this.async;
        let tl = gsap.timeline({
          defaults: {
            duration: 0.5,
            ease: Sine.easeInOut,
          },
        });

        tl.fromTo(
          ".loader",
          { y: "-100%" },
          { y: "0%", stagger: 0.2 },
          { onComplete: done }
        );
        tl.fromTo(data.current.container, { opacity: 1 }, { opacity: 0 });
      },
      enter(data) {
        window.scrollTo(0, 0);
        let done = this.async;
        let tl = gsap.timeline({
          defaults: {
            ease: Sine.easeInOut,
          },
        });

        tl.fromTo(
          ".loader",
          { y: "0%" },
          { y: "100%", stagger: 0.2 },
          { onComplete: done }
        );
        tl.fromTo(data.next.container, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});
function fashionPageAnimation() {
  controller = new ScrollMagic.Controller();
  let sliders = document.querySelectorAll(".fashion-slides");
  sliders.forEach((slider, index) => {
    let nextSlide = sliders.length - 1 === index ? "end" : sliders[index + 1];
    let crossImage = nextSlide.querySelector("img");
    let ftl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: Power1.easeInOut,
      },
    });
    ftl.fromTo(slider, 1, { opacity: "1" }, { opacity: "0" });
    ftl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    ftl.fromTo(crossImage, 1, { x: "50%" }, { x: "0" });
    fashionScene = new ScrollMagic.Scene({
      triggerHook: 0,
      triggerElement: slider,
      duration: "100%",
    })

      .setPin(slider, { pushFollowers: false })
      .setTween(ftl)
      .addTo(controller);
  });
}

burger.addEventListener("click", burgerAnimation);
window.addEventListener("mousemove", cursorAnimation);
window.addEventListener("mousemove", cursor);
