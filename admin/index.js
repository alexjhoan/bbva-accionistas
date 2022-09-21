$("div#sidebar").load("components/sidebar.html")
$("div#home").load("vistas/home.html")
$("div#banners").load("vistas/banners.html")
$("div#descargar").load("vistas/descargar.html")
$("div#documentos").load("vistas/documentos.html")
$("div#streaming").load("vistas/streaming.html")

$(window).on("load", function () {
  $("#sidebar li").click(function () {
    const url = $(this).data("url")
    console.log(url)
    // $(`#page .content .${url}`).show().siblings().not("#header").hide()
    $(`#page .content`).children().not("#header").hide()
    $(`#page .content #${url}`).show()
  })
})
