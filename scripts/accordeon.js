export const genererAccordeon = function () {
    const accordeon = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordeon.length; i++) {
        accordeon[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            const panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
};
