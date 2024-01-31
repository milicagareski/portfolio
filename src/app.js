const btn = document.getElementById("nav_btn");
let items = document.querySelector(".nav-items");
let nav = document.getElementById("navbar");
const nav_items = document.querySelectorAll(".item");

window.addEventListener("load", init);
window.addEventListener("resize", changeNavbar);
nav_items.forEach((item) => {
  item.addEventListener("click", onLoad);
});
btn.addEventListener("click", toggleNav);

function changeNavbar() {
  if (window.innerWidth > 750) {
    setNavbar();
  }
}
function onLoad() {
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

function setDate() {
  let date = document.getElementById("date");
  const getDate = new Date().getFullYear();
  date.innerHTML = getDate;
}

function router(page) {
  const container = document.getElementById("container");
  switch (page) {
    case "home":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((html) => {
          container.innerHTML = html;
        })
        .catch((error) => {
          console.error(`Error loading HTML for ${page}`, error);
          handleError();
        });
      break;

    case "about":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((about) => {
          container.innerHTML = about;
        })
        .catch((error) => {
          handleError();
        });
      break;

    case "skills":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((skills) => {
          container.innerHTML = skills;
          setMySkills();
        })
        .catch((error) => {
          handleError();
        });
      break;
    case "my_work":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((my_work) => {
          container.innerHTML = my_work;
        })
        .catch((error) => {
          handleError();
        });
      break;
    case "contact":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((contact) => {
          container.innerHTML = contact;
          // postMessegesToDashboard();
        })
        .catch((error) => {
          handleError();
        });
      break;
    case "admin":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((admin) => {
          container.innerHTML = admin;
          openDashboard();
        })
        .catch((error) => {
          handleError();
        });
      break;
    case "dashboard":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((dashboard) => {
          container.innerHTML = dashboard;
          fromDashboardToHomePage();
        })
        .catch((error) => {
          handleError();
        });
      break;

    default:
      console.log("Page does not exist");
  }
}

function handleError(msg = "404 Page Not Found") {
  const container = document.getElementById("container");
  const msgContent = `<h1 id="error">${msg}</h1>`;
  container.innerHTML = msgContent;
}

function setMySkills() {
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
  skills.insertBefore(ul, skills.children[1]);

  icons.map((icon) => {
    let element = document.createElement("li");
    element.setAttribute("class", "icon");
    element.innerHTML = icon;
    ul.appendChild(element);
  });
}

function openDashboard() {
  const btn = document.getElementById("login_btn");
  btn.addEventListener("click", changePage);

  function changePage() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const wrong_login = document.getElementById("wrong_login");
    const admin = document.getElementById("admin");

    if (username === "milicagareski" && password === "123456789") {
      fetch(`../templates/dashboard.html`)
        .then((response) => response.text())
        .then((dashboard) => {
          admin.innerHTML = dashboard;
          fromDashboardToHomePage();
        })
        .catch((error) => {
          handleError();
        });
    } else {
      wrong_login.innerHTML =
        "Please write your username and password correctly";
    }
  }
  function fromDashboardToHomePage() {
    const btn = document.getElementById("dashboard_btn");
    btn.addEventListener("click", init);
  }
}

function init() {
  setDate();
  router("home");
  onLoad();
}
