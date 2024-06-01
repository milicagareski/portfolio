window.addEventListener("load", init);
window.addEventListener("resize", changeNavbar);

const btn = document.getElementById("nav_btn");
btn.addEventListener("click", toggleNav);
const items = document.querySelector(".nav-items");
const nav = document.getElementById("navbar");
const nav_items = document.querySelectorAll(".item");
nav_items.forEach((item) => {
  item.addEventListener("click", onLoad);
});

function changeNavbar() {
  if (window.innerWidth > 750) {
    onLoad();
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
          console.error(`Error loading HTML for ${page}`, error);
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
          console.error(`Error loading HTML for ${page}`, error);
          handleError();
        });
      break;

    case "my_work":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((my_work) => {
          container.innerHTML = my_work;
          getApiFromGithub();
        })
        .catch((error) => {
          console.error(`Error loading HTML for ${page}`, error);
          handleError();
        });
      break;

    case "contact":
      fetch(`../templates/${page}.html`)
        .then((response) => response.text())
        .then((contact) => {
          container.innerHTML = contact;
          const contactBtn = document.getElementById("sent_btn");
          contactBtn.addEventListener("click", function (event) {
            event.preventDefault();
            sendMessage();
          });
        })
        .catch((error) => {
          console.error(`Error loading HTML for ${page}`, error);
          handleError();
        });
      break;

    case "admin":
      const session = JSON.parse(localStorage.getItem("appSession"));
      if (session && session.loggedIn === "true") {
        fetch(`../templates/dashboard.html`)
          .then((response) => response.text())
          .then((admin) => {
            container.innerHTML = admin;
            openDashboard();
          })
          .catch((error) => {
            console.error(`Error loading HTML for dashboard`, error);
            handleError();
          });
      } else {
        fetch(`../templates/admin.html`)
          .then((response) => response.text())
          .then((admin) => {
            container.innerHTML = admin;
            const loginBtn = document.getElementById("login_btn");
            loginBtn.addEventListener("click", function (event) {
              event.preventDefault();
              login();
            });
          })
          .catch((error) => {
            console.error(`Error loading HTML for admin`, error);
            handleError();
          });
      }
      break;

    default:
      console.log("Page does not exist");
  }
}

function login() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  fetch("https://portfolio-backend-milicagareski.onrender.com/login", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: [
      `username=${encodeURIComponent(username.value)}`,
      `password=${encodeURIComponent(password.value)}`,
    ].join("&"),
  })
    .then((response) => response.text())
    .then((data) => {
      const session = {
        loggedIn: data,
      };

      localStorage.setItem("appSession", JSON.stringify(session));

      if (data === "true") {
        router("admin");
      } else {
        const wrongLogin = document.getElementById("wrong_login");
        wrongLogin.textContent = "Invalid login. Try again.";
      }
    })
    .catch((error) => {
      console.log(error);
      handleError();
    });
}

function logout() {
  fetch(`https://portfolio-backend-milicagareski.onrender.com/logout`)
    .then((response) => response.text())
    .then(() => {
      localStorage.removeItem("appSession");
      router("admin");
    })
    .catch((error) => {
      console.log(error);
      handleError();
    });
}

function sendMessage() {
  const firstname = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const provideName = document.getElementById("provideName");
  const provideEmail = document.getElementById("provideEmail");
  const provideMessage = document.getElementById("provideMessage");

  if (firstname.value && email.value && message.value) {
    requestObj = [
      `name=${encodeURIComponent(firstname.value)}`,
      `email=${encodeURIComponent(email.value)}`,
      `message=${encodeURIComponent(message.value)}`,
    ];

    fetch("https://portfolio-backend-milicagareski.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: requestObj.join("&"),
    })
      .then((response) => response.text())
      .then((data) => {
        const successMessage = document.getElementById("success");
        successMessage.textContent = data;
        setTimeout(() => {
          firstname.value = "";
          email.value = "";
          message.value = "";
          successMessage = "";
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
        handleError();
      });
  } else {
    provideName.textContent = "Write your name";
    provideEmail.textContent = "Write your email";
    provideMessage.textContent = "Write your message";

    setTimeout(() => {
      provideName.textContent = "";
      provideEmail.textContent = "";
      provideMessage.textContent = "";
    }, 4000);
  }
}

function openDashboard() {
  fetch("https://portfolio-backend-milicagareski.onrender.com/contact", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      const messages = document.getElementById("messages");
      for (let item of data) {
        mainElement = document.createElement("div");
        mainElement.setAttribute("class", "message_item");
        const nameElement = document.createElement("h2");
        nameElement.textContent = `From: ${item.firstname || ""}`;
        mainElement.appendChild(nameElement);
        const emailElement = document.createElement("h3");
        emailElement.textContent = `Email: ${item.email || ""}`;
        mainElement.appendChild(emailElement);
        const messageElement = document.createElement("p");
        messageElement.textContent = `${item.message || ""}`;
        mainElement.appendChild(messageElement);
        const dividerElement = document.createElement("br");
        mainElement.appendChild(dividerElement);
        messages.appendChild(mainElement);
      }
    })
    .catch((error) => {
      console.log(error);
      handleError();
    });
}

function deleteMessages() {
  fetch(`https://portfolio-backend-milicagareski.onrender.com/delete`, {
    credentials: "include",
  })
    .then((response) => response.text())
    .then((data) => {
      const messages = document.getElementById("messages");
      if (data) {
        messages.innerHTML = "";
      } else {
        throw new Error("Could not delete messages");
      }
    })
    .catch((error) => {
      console.log(error);
      handleError();
    });
}

function handleError() {
  const container = document.getElementById("container");
  const msgContent = `<h1 id="error">An Error Ocurred</h1>`;
  container.innerHTML = msgContent;
  localStorage.removeItem("appSession");
}

function setMySkills() {
  const html = `<i class="fa-brands fa-html5"></i>`;
  const css = `<i class="fa-brands fa-css3"></i>`;
  const bootstrap = `<i class="fa-brands fa-bootstrap"></i>`;
  const javascript = `<i class="fa-brands fa-js"></i>`;
  const github = `<i class="fa-brands fa-github"></i>`;
  const git = `<i class="fa-brands fa-git"></i>`;
  const node = `<i class="fa-brands fa-node"></i>`;
  const react = `<i class="fa-brands fa-react"></i>`;
  const python = `<i class="fa-brands fa-python"></i>`;

  const icons = [
    html,
    css,
    bootstrap,
    javascript,
    github,
    git,
    node,
    react,
    python,
  ];

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

function contactMe() {
  fetch(`../templates/contact.html`)
    .then((response) => response.text())
    .then((contact) => {
      container.innerHTML = contact;
    })
    .catch((error) => {
      console.log(error);
      handleError();
    });
}

async function getApiFromGithub() {
  const apiUrl = "https://api.github.com/users/milicagareski/repos";
  let myProjects = document.querySelector(".work_wrapper");
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const projects = await response.json();
    renderProjects(projects);
  } catch (error) {
    console.error("Error:", error);
  }

  function renderProjects(projects) {
    let allProjects = [];

    for (let project of projects) {
      for (let key in project) {
        if (key === "html_url") {
          allProjects.push(project[key]);
        }
      }
    }

    allProjects.map((project, index) => {
      const element = document.createElement("div");
      element.setAttribute("class", "project-info");
      const img = document.createElement("img");
      img.src = `../img/img-${index}.png`;
      img.alt = `project-photo`;

      const link = document.createElement("a");
      link.href = project;
      link.setAttribute("target", "_blank");
      link.setAttribute("class", "github_link");
      link.innerHTML = "view github repo";

      element.appendChild(img);
      element.appendChild(link);
      myProjects.appendChild(element);
    });
  }
}

function init() {
  setDate();
  onLoad();
  router("home");
}
