// SMART JOB & PLACEMENT PORTAL
// JavaScript Source Code

const jobs = [

    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        location: "Noida",
        type: "Internship",
        salary: "₹8,000–12,000 / month",
        skills: "HTML, CSS, JavaScript",
        description: "Work with the UI team to build responsive web pages and improve user experience.",
        logo: "T"
    },

    {
        id: 2,
        title: "Junior Web Developer",
        company: "BrightByte Technologies",
        location: "Bareilly",
        type: "Full-time",
        salary: "₹2.4–3.2 LPA",
        skills: "HTML, CSS, JavaScript",
        description: "Create and maintain websites while learning modern frontend development practices.",
        logo: "B"
    },

    {
        id: 3,
        title: "Python Developer Trainee",
        company: "NextGen Systems",
        location: "Delhi",
        type: "Full-time",
        salary: "₹2.8–3.6 LPA",
        skills: "Python, SQL, Problem Solving",
        description: "Assist in developing Python applications, testing features and writing documentation.",
        logo: "N"
    },

    {
        id: 4,
        title: "UI/UX Design Intern",
        company: "CloudWorks Studio",
        location: "Remote",
        type: "Internship",
        salary: "₹6,000–10,000 / month",
        skills: "Figma, Wireframes, UI Design",
        description: "Support the design team with wireframes, prototypes and clean interface layouts.",
        logo: "C"
    },

    {
        id: 5,
        title: "PHP Developer",
        company: "CodeBridge India",
        location: "Noida",
        type: "Full-time",
        salary: "₹3–4 LPA",
        skills: "PHP, MySQL, HTML, CSS",
        description: "Build and maintain web applications and work with relational databases.",
        logo: "C"
    },

    {
        id: 6,
        title: "Data Analyst Intern",
        company: "Insight Analytics",
        location: "Delhi",
        type: "Internship",
        salary: "₹10,000 / month",
        skills: "Excel, SQL, Data Analysis",
        description: "Help prepare reports, clean datasets and identify useful business insights.",
        logo: "I"
    }

];

// GET HTML ELEMENTS

const jobGrid = document.getElementById("jobGrid");

const searchInput =
    document.getElementById("searchInput");

const locationFilter =
    document.getElementById("locationFilter");

const jobCount =
    document.getElementById("jobCount");

const emptyState =
    document.getElementById("emptyState");

const modal =
    document.getElementById("authModal");

const authForm =
    document.getElementById("authForm");

let authMode = "register";

let toastTimer;


// SHOW NOTIFICATION

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2600);

}


// DISPLAY JOBS

function renderJobs(list) {

    jobGrid.innerHTML = "";

    jobCount.textContent =
        `${list.length} job${list.length === 1 ? "" : "s"} available`;

    emptyState.classList.toggle(
        "hidden",
        list.length !== 0
    );

    list.forEach(job => {

        const card = document.createElement("article");

        card.className = "job-card";

        card.innerHTML = `

            <div class="job-card-head">

                <div class="job-logo">
                    ${job.logo}
                </div>

                <span class="job-type">
                    ${job.type}
                </span>

            </div>

            <h3>${job.title}</h3>

            <div class="company-name">
                ${job.company}
            </div>

            <div class="job-meta">

                <span>⌖ ${job.location}</span>

                <span>▣ ${job.skills}</span>

            </div>

            <p class="job-description">
                ${job.description}
            </p>

            <div class="job-card-bottom">

                <span class="salary">
                    ${job.salary}
                </span>

                <button
                    class="apply-btn"
                    data-job-id="${job.id}">

                    Apply Now →

                </button>

            </div>

        `;

        jobGrid.appendChild(card);

    });

}


// SEARCH AND FILTER JOBS

function filterJobs() {

    const term =
        searchInput.value.trim().toLowerCase();

    const place =
        locationFilter.value;

    const filtered = jobs.filter(job => {

        const searchable = `

            ${job.title}
            ${job.company}
            ${job.skills}
            ${job.description}

        `.toLowerCase();

        return searchable.includes(term)
            && (!place || job.location === place);

    });

    renderJobs(filtered);

}


// OPEN LOGIN / REGISTER MODAL

function openModal(mode) {

    authMode = mode;

    modal.classList.remove("hidden");

    document.getElementById("modalTitle").textContent =

        mode === "register"
        ? "Create your account"
        : "Welcome back";

    document.getElementById("modalSubtitle").textContent =

        mode === "register"
        ? "Register as a student to explore opportunities."
        : "Login to view your demo portal account.";

    document.getElementById("authSubmit").textContent =

        mode === "register"
        ? "Create Account"
        : "Login";

    document.getElementById("fullName")
        .closest("label")
        .classList.toggle("hidden", mode === "login");

    document.getElementById("roleLabel")
        .classList.toggle("hidden", mode === "login");

    document.getElementById("switchAuth").innerHTML =

        mode === "register"

        ? 'Already registered? <button type="button" id="switchMode">Login</button>'

        : 'New here? <button type="button" id="switchMode">Create account</button>';

    document.getElementById("formMessage").textContent = "";

    authForm.reset();

}


// CLOSE MODAL

function closeModal() {

    modal.classList.add("hidden");

}


// BUTTON EVENTS

document.getElementById("loginBtn")
    .addEventListener("click", () => openModal("login"));

document.getElementById("registerBtn")
    .addEventListener("click", () => openModal("register"));

document.getElementById("heroRegister")
    .addEventListener("click", () => openModal("register"));

document.getElementById("closeModal")
    .addEventListener("click", closeModal);


// CLICK OUTSIDE MODAL

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


// SWITCH LOGIN AND REGISTER

document.getElementById("switchAuth")
    .addEventListener("click", event => {

        if (event.target.id === "switchMode") {

            openModal(
                authMode === "register"
                ? "login"
                : "register"
            );

        }

    });


// REGISTRATION AND LOGIN SYSTEM

authForm.addEventListener("submit", event => {

    event.preventDefault();

    const email = document.getElementById("email")
        .value.trim().toLowerCase();

    const password = document.getElementById("password")
        .value;

    const users = JSON.parse(
        localStorage.getItem("sjp_users") || "[]"
    );


    // REGISTER NEW USER

    if (authMode === "register") {

        const name = document.getElementById("fullName")
            .value.trim();

        const role = document.getElementById("role")
            .value;

        if (users.some(user => user.email === email)) {

            document.getElementById("formMessage").textContent =
                "This email is already registered. Please login.";

            return;

        }

        users.push({

            name,
            email,
            password,
            role

        });

        localStorage.setItem(
            "sjp_users",
            JSON.stringify(users)
        );

        localStorage.setItem(
            "sjp_current_user",
            JSON.stringify({name, email, role})
        );

        document.getElementById("formMessage").textContent =
            "Account created successfully!";

        showToast(`Welcome, ${name}! Your demo account is ready.`);

        setTimeout(closeModal, 900);

    }


    // LOGIN EXISTING USER

    else {

        const user = users.find(item =>

            item.email === email &&
            item.password === password

        );

        if (!user) {

            document.getElementById("formMessage").textContent =
                "Account not found. Check details or register first.";

            return;

        }

        localStorage.setItem(

            "sjp_current_user",

            JSON.stringify({

                name: user.name,
                email: user.email,
                role: user.role

            })

        );

        showToast(`Welcome back, ${user.name}!`);

        closeModal();

    }

});


// APPLY FOR JOB

jobGrid.addEventListener("click", event => {

    const button = event.target.closest("[data-job-id]");

    if (!button) return;

    const currentUser = JSON.parse(

        localStorage.getItem("sjp_current_user") || "null"

    );


    // CHECK LOGIN

    if (!currentUser) {

        showToast("Please login or register before applying.");

        openModal("login");

        return;

    }


    const job = jobs.find(item =>

        item.id === Number(button.dataset.jobId)

    );


    const applications = JSON.parse(

        localStorage.getItem("sjp_applications") || "[]"

    );


    // PREVENT DUPLICATE APPLICATION

    if (applications.some(app =>

        app.email === currentUser.email &&
        app.jobId === job.id

    )) {

        showToast("You have already applied for this job.");

        return;

    }


    // SAVE APPLICATION

    applications.push({

        email: currentUser.email,

        jobId: job.id,

        title: job.title,

        company: job.company,

        appliedOn: new Date().toLocaleDateString(),

        status: "Submitted"

    });


    localStorage.setItem(

        "sjp_applications",

        JSON.stringify(applications)

    );

    showToast(`Demo application submitted for ${job.title}.`);

});


// SEARCH BUTTON

document.getElementById("searchBtn")
    .addEventListener("click", filterJobs);


// LIVE SEARCH

searchInput.addEventListener("input", filterJobs);


// LOCATION FILTER

locationFilter.addEventListener("change", filterJobs);


// MOBILE MENU

document.getElementById("menuToggle")
    .addEventListener("click", () => {

        document.getElementById("mainNav")
            .classList.toggle("open");

    });


// NAVIGATION ACTIVE LINK

document.querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            document.querySelectorAll(".nav-link")
                .forEach(item => {

                    item.classList.remove("active");

                });

            link.classList.add("active");

            document.getElementById("mainNav")
                .classList.remove("open");

        });

    });


// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// INITIAL JOB DISPLAY

renderJobs(jobs);