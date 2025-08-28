// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const scrollTopBtn = document.getElementById("scrollTop")
const navLinks = document.querySelectorAll(".nav-link")

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Show/hide scroll to top button
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }

  // Update active nav link based on scroll position
  updateActiveNavLink()
})

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Scroll to top functionality
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Update active nav link based on current section
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)
      if (activeLink) activeLink.classList.add("active")
    }
  })
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const headerOffset = 70
      const elementPosition = target.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

const observeElements = document.querySelectorAll(
  ".timeline-item, .experience-card, .project-card, .interest-card, .certificate-card",
)
observeElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Add stagger animation
const projectCards = document.querySelectorAll(".project-card")
const interestCards = document.querySelectorAll(".interest-card")
const certificateCards = document.querySelectorAll(".certificate-card")

projectCards.forEach((card, index) => (card.style.transitionDelay = `${index * 0.1}s`))
interestCards.forEach((card, index) => (card.style.transitionDelay = `${index * 0.1}s`))
certificateCards.forEach((card, index) => (card.style.transitionDelay = `${index * 0.1}s`))

function typeWriter(element, text, speed = 50) {
  let i = 0
  element.innerHTML = ""

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(typing, speed)
    } else {
      // Add blinking cursor effect after typing is complete
      element.innerHTML += '<span class="cursor">|</span>'
    }
  }
  typing()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const originalText = heroSubtitle.textContent.trim()

  // Clear immediately so text doesn't flash first
  heroSubtitle.textContent = ""

  setTimeout(() => {
    typeWriter(heroSubtitle, originalText, 50)
  }, 1000)
})

// Parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const rate = scrolled * -0.5
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Hover effects for tags
const tags = document.querySelectorAll(".skill-tag, .tech-tag")
tags.forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
    this.style.backgroundColor = "rgba(100, 255, 218, 0.2)"
  })
  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
    this.style.backgroundColor = "rgba(100, 255, 218, 0.1)"
  })
})

// Click ripple effect on buttons
const buttons = document.querySelectorAll(".btn")
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  })
})

// CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn { position: relative; overflow: hidden; }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }
`
document.head.appendChild(style)

const socialButtons = document.querySelectorAll(".social-btn")
socialButtons.forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)"
  })

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })

  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("social-ripple")

    this.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  })
})

// CSS for social button ripple effect
const socialRippleStyle = document.createElement("style")
socialRippleStyle.textContent = `
    .social-btn { position: relative; overflow: hidden; }
    .social-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(100, 255, 218, 0.3);
        transform: scale(0);
        animation: social-ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes social-ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }
`
document.head.appendChild(socialRippleStyle)

// Cosmos background animation
class CosmosBackground {
  constructor() {
    this.canvas = document.getElementById("cosmos-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.stars = []
    this.numStars = 150

    this.init()
    this.createStars()
    this.animate()

    window.addEventListener("resize", () => this.init())
  }

  init() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createStars() {
    this.stars = []
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.005,
      })
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.stars.forEach((star) => {
      // Move stars down slowly
      star.y += star.speed

      // Reset star position when it goes off screen
      if (star.y > this.canvas.height) {
        star.y = -10
        star.x = Math.random() * this.canvas.width
      }

      // Twinkling effect
      star.opacity += Math.sin(Date.now() * star.twinkle) * 0.01
      star.opacity = Math.max(0.1, Math.min(1, star.opacity))

      // Draw star
      this.ctx.beginPath()
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(100, 255, 218, ${star.opacity})`
      this.ctx.fill()

      // Add glow effect for larger stars
      if (star.size > 1.5) {
        this.ctx.beginPath()
        this.ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
        this.ctx.fillStyle = `rgba(100, 255, 218, ${star.opacity * 0.1})`
        this.ctx.fill()
      }
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Initialize cosmos background when page loads
window.addEventListener("load", () => {
  new CosmosBackground()
})

// Console message
console.log(`🚀 Welcome to my portfolio!
🎯 Built with vanilla HTML, CSS, and JavaScript
💡 Interested in collaborating? Let's connect!
`)
