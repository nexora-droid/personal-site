const data = {
    1: {
        title: "First Discovered Python and HTML",
        text: "It was in 5th grade when my love for programming blew up. The times during COVID allowed me access to more resources to learn programming and I started a slow journey in HTML, CSS and Python."
    },
    2: {
        title: "Started exploring more in HTML and CSS",
        text: "Being awestruck by what HTML and CSS could make, I started building simple webpages - now lost to time. Yet, the creativity I could show through it was something that kept me going"
    },
    3: {
        title: "Delved deeper into Python",
        text: "After a few years, I started going deeper into Python. Stepping outside of Turtle, I discovered stuff like Flask, Discordpy and more. The newfound stuff propelled me to dive deeper into Python and incorporate it with my HTML design."
    },
    4: {
        title: "Present",
        text: "Now, after all the new stuff I had access to - I started building larger projects like webpages integrated with Flask or JS to give life and depth to my websites."
    },
    5: {
        title: "Whats to come?",
        text: "I want to really go deeper into Python and enhance my skills to the level of a professional. That's all I plan for - at least for now."
    }
}
const popup = document.getElementById("popup");
const overlay = document.getElementById("popup-overlay");
document.querySelectorAll(".node").forEach(node => {
    node.addEventListener("click", (e) => {
        e.stopPropagation();
        const info = data[node.dataset.id];
        popup.innerHTML = `<h2>${info.title}</h2><p>${info.text}</p>`;
        popup.classList.add("show");
        overlay.classList.add("show");
    })
});
overlay.addEventListener("click", ()=>{
    popup.classList.remove("show");
    overlay.classList.remove("show");
})