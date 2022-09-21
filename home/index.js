$('div[data-component="header"]').load("components/header.html")
$('div[data-component="login"]').load("components/login.html")
$('div[data-component="footer"]').load("components/footer.html")

$(window).on("load", function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  )
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  )
  $(".activeLogin").click(function () {
    $("#login").toggleClass("active")
  })
  new Swiper(".mySwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  })
})
