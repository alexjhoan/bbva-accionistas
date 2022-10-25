$("div#sidebar").load("components/sidebar.html")
$("div#home").load("vistas/home.html")
$("div#banners").load("vistas/banners.html")
$("div#descargar").load("vistas/descargar.html")
$("div#documentos").load("vistas/documentos.html")
$("div#streaming").load("vistas/streaming.html")

$(window).on("load", function () {
  setTimeout(() => {
    $("#sidebar li").click(function () {
      const url = $(this).data("url")
      $(this).addClass("active").siblings().removeClass("active")
      $(`#page .content`).children().not("#header,  #myalert").hide()
      $(`#page .content #${url}`).show()
    })
    var cantidad = []
    $(".control").each(function (i) {
      cantidad[i] = $(this).attr("id")
    })

    for (k = 0; k < cantidad.length; k++) {
      if (k > 5) {
        $("#" + cantidad[k]).addClass("hidden")
      }
    }
    var click = 0
    var cant_post = cantidad.length / 2
    var cant_post = Math.trunc(cant_post)
    $("#show-more").click(function () {
      var cont = 6
      click++
      for (k = 0; k < cantidad.length; k++) {
        if ($("#" + cantidad[k]).hasClass("hidden") && cont > 0) {
          $("#" + cantidad[k]).removeClass("hidden")
          cont--
        }
      }
      var cant_click = cant_post / 6
      var cant_click = Math.trunc(cant_click)
      if (click > cant_click) {
        $("#show-more").addClass("hidden")
        $("#show-less").removeClass("hidden")
      }
    })
    $("#show-less").click(function () {
      for (k = 0; k < cantidad.length; k++) {
        if (k > 5) {
          $("#" + cantidad[k]).addClass("hidden")
        }
      }
      $("#show-less").addClass("hidden")
      $("#show-more").removeClass("hidden")
      click = 0
    })
    if (cantidad.length <= 6) {
      $("#show-more").addClass("hidden")
    }
    $("#documento").on("change", function () {
      var ext = $(this).val().split(".").pop()
      if ($(this).val() != "") {
        if ($("#myalert").hasClass("activa")) {
          hideAlert()
        }
        if (ext == "pdf" || ext == "doc" || ext == "docx") {
          if ($(this)[0].files[0].size > 1048576) {
            showAlert(
              "El documento excede el tama&ntilde;o m&aacute;ximo",
              "alert-danger",
              "error"
            )
            $(this).val("")
            $(".btn-primary").prop("disabled", true)
          } else {
            $(".btn-primary").prop("disabled", false)
          }
        } else {
          $(this).val("")
          showAlert(
            "Los tipos de documentos permitidos son (.PDF o .docx)",
            "alert-danger",
            "error"
          )
          $(".btn-primary").prop("disabled", true)
        }
      }
    })
    const container = document.getElementById("input-drop-img-banner")
    const containerFiles = document.getElementById("selectedFiles")
    const input = document.getElementById("bannerFile")
    $(input).on("dragenter dragleave", function () {
      container.classList.toggle("onbox")
    })
    $(input).on("change", function () {
      const fileName = input.files[0].name
      container.classList.remove("onbox")
      containerFiles.innerHTML = `<p> ${fileName}<img src='/assets/img/icons/close-01.png' class='fileClose' id='removeItemInput' /></p>`
      $("#removeItemInput").click(function () {
        input.value = ""
        containerFiles.innerHTML = ""
        bannerPreviewRemove()
      })
      bannerPreview()
    })
    $(".inputTextBanner").on("keydown", function (e) {
      if ($(this).data("type") == "title") {
        if (e.keyCode != 8 && this.innerText.length > 79) {
          e.preventDefault()
        }
      } else {
        if (e.keyCode != 8 && this.innerText.length > 149) {
          e.preventDefault()
        }
      }
    })
    $(".inputTextBanner").on("keyup", function (e) {
      $(this)
        .siblings(".textLength")
        .children("span")
        .text($(this).text().length)
      bannerPreview()
    })
    $("#titlestreaming").on("keyup", function () {
      $("#streaming-title-input").val($("#titlestreaming").html())
      streamingPreview()
    })
  }, 50)
  alerts()
})

var divAlert = document.getElementById("myalert")
function showAlert(message, type, typeimg) {
  if (typeimg === "error") {
    iconoSrc = "/assets/img/icons/warning.svg"
  } else if (typeimg === "info") {
    iconoSrc = "/assets/img/icons/check.svg"
  } else if (typeimg === "success") {
    iconoSrc = "/assets/img/icons/delete-doc.svg"
  }

  $("#myalert").show()
  $("#myalert").addClass("activa")
  var wrapper = `
  					<div class="alert  ${type}    role="alert">
  						<img class="icon-alert" src="${myContextPath}${iconoSrc}"/>
  						<p class="alert-msj"> ${message} </p>
  						
  					</div>
  					
  					`
  divAlert.innerHTML += wrapper
}
function hideAlert() {
  $("#myalert").hide()
  $("#myalert").removeClass("activa")
  divAlert.innerHTML = ""
  mostrarAlert = true
}
function alerts() {
  var error = document.getElementById("error").value
  var exito = document.getElementById("exito").value
  if (exito != "null") {
    if (exito == "Documento eliminado correctamente") {
      showAlert(exito, "alert-success", "success")
    } else {
      showAlert(exito, "alert-success", "info")
    }
  }
  if (error != "null") {
    showAlert(error, "alert-danger", "error")
  }
  setTimeout(function () {
    hideAlert()
  }, 8000)
}
function CrearDoc(tipo) {
  let tipodoc = document.getElementById("tipodoc")
  tipodoc.value = tipo
  formdoc.submit()
}

function EnviarForm(id) {
  document.getElementById("boton_o" + id).click()
}
//var mostrarAlert = true
function downloadReport() {
  var error = document.getElementById("Reporterror")
  if (error.value == "El archivo no existe") {
    //if (mostrarAlert == true) {
    showAlert(
      "El reporte no esta disponible en este momento, por favor intente  más tarde",
      "alert-danger",
      "error"
    )
    //}
    //mostrarAlert = false
  } else {
    var link = "ReporteServlet?action=quorum"
    $("#reporteQuorum").attr("href", link)
  }
  setTimeout(function () {
    hideAlert()
  }, 8000)
}
function confirmar(nombre, id) {
  window.location.href = "DocumentoServlet?id=" + id
  return false
}
function bannerPreview() {
  const inputImg = document.querySelector("#bannerFile")
  const inputTitle = $(`.inputTextBanner[data-type="title"`).html()
  const inputSubTitle = $(`.inputTextBanner[data-type="sub-title"`).html()
  $("#bannerPreview-title").html(inputTitle)
  $("#bannerPreview-subTitle").html(inputSubTitle)
  if (inputImg.files.length > 0) {
    const imgPreview = URL.createObjectURL(inputImg.files[0])
    $("#bannerPreview img").attr("src", imgPreview)
  }
}

function bannerPreviewRemove() {
  $("#bannerPreview img").attr("src", "")
  $("#bannerPreview-title").html("")
  $("#bannerPreview-subTitle").html("")
  $("#bannerPreview").hide()
}
function styledInput(typeStyle) {
  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  const parent = selection.focusNode.parentElement
  if ($(selection.focusNode).parents(".inputTextBanner").length > 0) {
    if (typeStyle == "bold") {
      if (!parent.style.fontWeight) {
        const span = document.createElement("span")
        span.style.fontWeight = 700
        range.surroundContents(span)
      } else {
        const selec = selection.anchorNode.parentElement.innerHTML
        const gparent = $(parent).parent().html()
        const text = gparent.replace(
          `<span style="font-weight: 700;">${selec}</span>`,
          selec
        )
        parent.parentElement.innerHTML = text
      }
    } else {
      if (!parent.style.color) {
        const span = document.createElement("span")
        span.style.color = typeStyle
        range.surroundContents(span)
      } else {
        const selec = selection.anchorNode.parentElement
        selec.style.color = typeStyle
      }
    }
  }
  window.getSelection().removeAllRanges()
  bannerPreview()
}

function resetText(type) {
  const originalText = $(`.inputTextBanner[data-type=${type}]`).text()
  $(`.inputTextBanner[data-type=${type}]`).text(originalText)
}

function guardarBanner() {
  document.formularioBanner.titleBannerHidden.value = document
    .getElementById("titleBanner")
    .innerHTML.trim()
  document.formularioBanner.subtitleBannerHidden.value = document
    .getElementById("subtitleBanner")
    .innerHTML.trim()
  document.formularioBanner.submit()
}

function verbanner() {
  document.getElementById("action").value = "mostrarBanner"
  document.formularioBanner.submit()
}

function guardarArchivoBanner() {
  document.formularioArchivoBanner.submit()
}

function streamingPreview() {
  const inputTitle = $("#titlestreaming").html()
  const inputDate = new Date($("#streaming-date").val()).toLocaleDateString(
    "en-GB",
    { timeZone: "UTC" }
  )
  const inputHour = $("#streaming-hora").val()
  $("#streaming-preview p.streaming-title").html(inputTitle)
  $("#streaming-preview p.streaming-date strong.date").html(inputDate)
  $("#streaming-preview p.streaming-date strong.hour").html(inputHour)
}
