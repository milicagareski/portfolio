const btn = document.getElementById("nav_btn");
let items = document.querySelector(".nav-items");
let nav = document.getElementById("navbar");
const home = document.getElementById("home_link");
const nav_items = document.querySelectorAll("nav_link");

btn.addEventListener("click", toggleNav);
window.addEventListener("load", setNavbarOnLoadedPage);
// nav_items.map((item) => {
//   item.addEventListener("click", setNavbarOnLoadedPage);
// });
// window.addEventListener("resize", )

function setNavbarOnLoadedPage() {
  items.classList.remove("show_items");
  items.classList.add("hide_items");
  nav.classList.remove("show_nav");
  nav.classList.add("hide_nav");
}

function toggleNav() {
  if (items.classList.contains("hide_items")) {
    items.classList.remove("hide_items");
    items.classList.add("show_items");
    nav.classList.remove("hide_nav");
    nav.classList.add("show_nav");
  } else {
    items.classList.remove("show_items");
    items.classList.add("hide_items");
    nav.classList.remove("show_nav");
    nav.classList.add("hide_nav");
  }
}

(function setDate() {
  let date = document.getElementById("date");
  const getDate = new Date().getFullYear();
  date.innerHTML = getDate;
})();

(function setMySkills() {
  const html = `<i class="fa-brands fa-html5"></i>`;
  const css = `<i class="fa-brands fa-css3"></i>`;
  const bootstrap = `<i class="fa-brands fa-bootstrap"></i>`;
  const javascript = `<i class="fa-brands fa-js"></i>`;
  const github = `<i class="fa-brands fa-github"></i>`;
  const git = `<i class="fa-brands fa-git"></i>`;

  const icons = [html, css, bootstrap, javascript, github, git];

  const skills = document.querySelector(".skills-container");
  const ul = document.createElement("ul");
  ul.setAttribute("id", "icons");
  // skills.appendChild(ul);
  skills.insertBefore(ul, skills.children[1]);

  icons.map((icon) => {
    let element = document.createElement("li");
    element.setAttribute("class", "icon");
    element.innerHTML = icon;
    ul.appendChild(element);
  });
})();
