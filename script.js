// Scroll section active link

let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let top = window.scrollY;

  sections.forEach((sec) => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navlinks.forEach((link) => {
        link.classList.remove("active");
      });

      document
        .querySelector('header nav a[href*="' + id + '"]')
        .classList.add("active");
    }
  });
});
