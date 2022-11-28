$("div#sidebar").load("components/sidebar.html")
$("div#security").load("vistas/security.html")
$("div#add-user").load("vistas/add-user.html")

$(window).on("load", function () {
  setTimeout(() => {
    $("#sidebar li").click(function () {
      const url = $(this).data("url")
      $(this).addClass("active").siblings().removeClass("active")
      $(`#page .content`).children().not("#header,  #myalert").hide()
      $(`#page .content #${url}`).show()
    })
  }, 50)
})
