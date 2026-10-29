/* ============================================================
   MOBILE MENU
============================================================ */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
        });
    });
}


/* ============================================================
   ACTIVE NAVIGATION
============================================================ */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                navLinks.forEach(function (link) {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        '.nav-link[href="#' + entry.target.id + '"]'
                    );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(function (section) {
    observer.observe(section);
});


/* ============================================================
   PDF VIEWER
   คลิกการ์ดรายงานแล้วเปิด PDF ทับหน้าเว็บ
============================================================ */

function openPDF() {

    const modal = document.getElementById("pdfModal");
    const viewer = document.getElementById("pdfViewer");

    /*
     * ไฟล์ PDF ที่ใช้แสดง
     *
     * หากเปลี่ยนชื่อไฟล์ ต้องแก้ตรงนี้ด้วย
     */
    viewer.src = "documents/project-report.pdf";

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    /* ห้ามหน้าเว็บด้านหลังเลื่อน */
    document.body.classList.add("modal-open");
}


/* ============================================================
   CLOSE PDF
============================================================ */

function closePDF() {

    const modal = document.getElementById("pdfModal");
    const viewer = document.getElementById("pdfViewer");

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    /*
     * ล้าง src เพื่อหยุดการโหลด PDF หลังปิด
     */
    viewer.src = "";

    document.body.classList.remove("modal-open");
}


/* ============================================================
   CLICK OUTSIDE PDF
============================================================ */

const pdfModal = document.getElementById("pdfModal");

if (pdfModal) {

    pdfModal.addEventListener("click", function (event) {

        /*
         * ถ้าคลิกพื้นที่ดำด้านนอก
         * ให้ปิด PDF
         */
        if (event.target === pdfModal) {
            closePDF();
        }

    });
}


/* ============================================================
   ESC KEY
============================================================ */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        const modal = document.getElementById("pdfModal");

        if (modal && modal.classList.contains("active")) {
            closePDF();
        }
    }
});
