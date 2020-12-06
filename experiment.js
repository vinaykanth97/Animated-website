// Scrolling Methods

const slider = document.querySelector(".hike a");

// Method one
// window.addEventListener("scroll", function () {
//   let sliderPos = slider.getBoundingClientRect().top;
//   let winHeight = window.innerHeight / 1.5;
//   console.log(sliderPos, winHeight);
//   if (winHeight > sliderPos) {
//     slider.style.color = "red";
//   } else {
//     slider.style.color = "white";
//   }
// });

// Method two(worst)
// let btnPos = slider.offsetTop;
// window.addEventListener("scroll", function () {
//   if (window.scrollY >= btnPos) {
//     slider.style.color = "red";
//   } else {
//     slider.style.color = "white";
//   }
//   console.log(window.scrollY, btnPos);
// });

// Method Three (New)
// let options = {
//   threshold: 0.88,
// };
// let observer = new IntersectionObserver(animator, options);
// observer.observe(slider);

// function animator(entries) {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       slider.querySelector("a").style.color = "red";
//     } else {
//       slider.querySelector("a").style.color = "white";
//     }
//   });
// }

// ScrollMagic Testing
let controller = new ScrollMagic.Controller();
let exploreScene = new ScrollMagic.Scene({
  triggerElement: slider,
  triggerHook: 0.5,
})
  // Debugging Tool
  .addIndicators({ colorStart: "#fff", colorTrigger: "#fff" })
  // Toggle class
  .setClassToggle(".hike-btn", "active")
  // Hook to controller Variable
  .addTo(controller);
