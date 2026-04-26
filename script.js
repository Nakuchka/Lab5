document.addEventListener("DOMContentLoaded", () => {

    const osInfo = navigator.platform || "Unknown OS";
    const browserInfo = navigator.userAgent || "Unknown Browser";

    localStorage.setItem("User_OS", osInfo);
    localStorage.setItem("User_Browser", browserInfo);

    const footerContainer = document.getElementById("local-storage-info");
    footerContainer.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const p = document.createElement("p");
        p.textContent = `${key}: ${value}`;
        footerContainer.appendChild(p);
    }

    const variantNumber = 3;
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${variantNumber}/comments`;
    const commentsContainer = document.getElementById("comments-container");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            commentsContainer.innerHTML = "";
            data.forEach(comment => {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment-card");
                commentDiv.innerHTML = `
                    <h4>${comment.name} (${comment.email})</h4>
                    <p>"${comment.body}"</p>
                `;
                commentsContainer.appendChild(commentDiv);
            });
        })
        .catch(error => {
            commentsContainer.innerHTML = "<p>Помилка при завантаженні коментарів.</p>";
            console.error("Error fetching comments:", error);
        });

    const modal = document.getElementById("feedback-modal");
    const closeModalBtn = document.getElementById("close-modal");

    setTimeout(() => {
        modal.style.display = "block";
    }, 60000);

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");

    function applyThemeBasedOnTime() {
        const currentHour = new Date().getHours();
        if (currentHour >= 7 && currentHour < 21) {
            body.classList.remove("dark-mode");
        } else {
            body.classList.add("dark-mode");
        }
    }

    applyThemeBasedOnTime();

    themeToggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
    });
});