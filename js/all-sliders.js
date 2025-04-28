
function initAllSliders() {
  document.querySelectorAll(".sidebar-left, .sidebar-right, .top-ad").forEach(container => {
    const slides = container.querySelectorAll(".ad-slide");
    if (!slides.length) return;

    let currentAd = 0;
    slides.forEach((slide, i) => {
      slide.style.display = i === currentAd ? "block" : "none";
    });

    setInterval(() => {
      slides[currentAd].style.display = "none";
      currentAd = (currentAd + 1) % slides.length;
      slides[currentAd].style.display = "block";
    }, 15000);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(initAllSliders, 500); // ensure HTML includes are loaded first
});
