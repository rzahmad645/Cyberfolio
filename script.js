// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark"
  htmlElement.setAttribute("data-theme", currentTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      // Set theme
      htmlElement.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
    })
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active")

      // Animate hamburger icon
      this.classList.toggle("active")
    })

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      })
    })
  }

  // Contact form handling removed - now handled by EmailJS in contact.html
  // The previous handler was preventing EmailJS from working properly

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Image lightbox for project detail step images
  const lightbox = document.createElement("div")
  lightbox.className = "image-lightbox"
  lightbox.setAttribute("aria-hidden", "true")
  lightbox.setAttribute("role", "dialog")
  lightbox.setAttribute("aria-label", "Enlarged image")

  const backdrop = document.createElement("div")
  backdrop.className = "image-lightbox__backdrop"

  const inner = document.createElement("div")
  inner.className = "image-lightbox__inner"

  const lightboxImg = document.createElement("img")
  lightboxImg.className = "image-lightbox__img"
  lightboxImg.alt = ""

  const closeBtn = document.createElement("button")
  closeBtn.type = "button"
  closeBtn.className = "image-lightbox__close"
  closeBtn.setAttribute("aria-label", "Close")
  closeBtn.innerHTML = "&times;"

  inner.appendChild(lightboxImg)
  lightbox.appendChild(backdrop)
  lightbox.appendChild(inner)
  lightbox.appendChild(closeBtn)
  document.body.appendChild(lightbox)

  let lastFocusedElement = null

  function openLightbox(src, alt, trigger) {
    lastFocusedElement = trigger
    lightboxImg.src = src
    lightboxImg.alt = alt || ""
    lightbox.classList.add("is-open")
    lightbox.setAttribute("aria-hidden", "false")
    closeBtn.focus()
    document.addEventListener("keydown", handleEscape)
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open")
    lightbox.setAttribute("aria-hidden", "true")
    document.removeEventListener("keydown", handleEscape)
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus()
    }
  }

  function handleEscape(e) {
    if (e.key === "Escape") closeLightbox()
  }

  backdrop.addEventListener("click", () => closeLightbox())
  closeBtn.addEventListener("click", () => closeLightbox())

  lightbox.addEventListener("click", (e) => {
    if (e.target === backdrop) closeLightbox()
  })

  document.querySelectorAll(".project-detail .diagram-placeholder img").forEach((img) => {
    img.addEventListener("click", function (e) {
      e.preventDefault()
      openLightbox(this.src, this.alt, this)
    })
  })
})
