const menu = document.querySelector("#menu")
const nav = document.querySelector("nav")

menu.addEventListener("click", function () {
    nav.classList.toggle("show")
})

const imgs = document.querySelectorAll("#images img")

imgs.forEach(function(img) {
    img.addEventListener("click", function() {

        const viewer = document.createElement("div")
        viewer.classList.add("modal")

        viewer.innerHTML = `
            <span class="close-viewer">X</span>
            <img src="norris-full.jpg" alt="big image">
        `

        document.body.appendChild(viewer)

        const close = document.querySelector(".close-viewer")

        close.addEventListener("click", function() {
            viewer.remove()
        })

        viewer.addEventListener("click", function(e) {
            if (e.target === viewer) {
                viewer.remove()
            }
        })

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                viewer.remove()
            }
        })
    })
})