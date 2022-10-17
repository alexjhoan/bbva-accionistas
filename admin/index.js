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
      $(`#page .content`).children().not("#header").hide()
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
    $('input[type="file"]').on("change", function () {
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
    const container = document.getElementById("file-drop-area")
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
      })
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
    })
  }, 50)
})

var divAlert = document.getElementById("myalert")
function showAlert(message, type, typeimg) {
  if (typeimg === "error") {
    iconoSrc = "../assets/img/icons/warning.svg"
  } else if (typeimg === "info") {
    iconoSrc = "../assets/img/icons/check.svg"
  } else if (typeimg === "success") {
    iconoSrc = "../assets/img/icons/delete-doc.svg"
  }

  $("#myalert").show()
  $("#myalert").addClass("activa")
  var wrapper = `
  					<div class="alert  ${type}    role="alert">
  						<img class="icon-alert" src="${iconoSrc}"/>
  						<p class="alert-msj"> ${message} </p>
  						
  					</div>
  					
  					`
  divAlert.innerHTML += wrapper
}
function hideAlert() {
  $("#myalert").hide()
  divAlert.innerHTML = ""
}

function enviarDoc() {
  let input = document.getElementById("documento")
  if (input.files.length == 1) {
    //document.formdoc.submit();
    $(".btn-primary").prop("disabled", true)
    showAlert("Documento cargado correctamente", "alert-success", "info")
    //input.value="";
  } else {
    $(".btn-primary").prop("disabled", true)
  }
}
function EnviarForm(id) {
  document.getElementById("boton_o" + id).click()
}
var mostrarAlert = true
function downloadReport() {
  var error = document.getElementById("Reporterror")
  if (error.value == "El archivo no existe") {
    if (mostrarAlert == true) {
      showAlert(
        "El reporte no esta disponible en este momento, por favor intente  más tarde",
        "alert-danger",
        "error"
      )
    }
    mostrarAlert = false
  } else {
    var link = "ReporteServlet?action=quorum"
    $("#reporteQuorum").attr("href", link)
  }
  setTimeout(function () {
    hideAlert()
  }, 8000)
}
function styledWeight2() {
  const range = window.getSelection().getRangeAt(0)
  console.log(window.getSelection())
  console.log(window.getSelection().anchorNode.parentNode.nodeName)
  // console.log(window.getSelection().focusNode)
  // console.log(window.getSelection().focusNode)
  // console.log(window.getSelection().toString())
  // console.log(range.toString())

  if (
    window
      .getSelection()
      .anchorNode.parentNode.className.includes("inputTextBanner")
  ) {
    const span = document.createElement("span")
    span.style.fontWeight = 700
    span.appendChild(range.extractContents())
    window.getSelection().getRangeAt(0).insertNode(span)
    window.getSelection().removeAllRanges()
    // if (window.getSelection().anchorNode.parentNode.nodeName != "SPAN") {
    //   console.log("first")
    // } else {
    //   // const span = document.createElement("span")
    //   console.log("blaaaaa")
    //   console.log(window.getSelection().anchorNode.parentNode)
    //   window
    //     .getSelection()
    //     .anchorNode.parentNode.parentNode.removeChild(
    //       window.getSelection().anchorNode.parentNode
    //     )

    // window.getSelection().anchorNode.parentNode.deleteFromDocument()
    // window.getSelection().removeAllRanges()
    // }
  }
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
        // span.appendChild(range.extractContents())
        // range.insertNode(span)
      } else {
        // const selec = selection.anchorNode.parentElement.outerHTML
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
        // span.appendChild(range.extractContents())
        // range.insertNode(span)
      } else {
        const selec = selection.anchorNode.parentElement
        selec.style.color = typeStyle
      }
    }
  }
  window.getSelection().removeAllRanges()
}

function styledInput_original(typeStyle) {
  const selection = window.getSelection()
  const range = selection.getRangeAt(0).cloneContents().toString()
  const text = selection.toString()
  console.log(range)
  console.log(text)
  const parent = $(selection.focusNode.parentElement)
  if ($(selection.focusNode).parents(".inputTextBanner").length > 0) {
    if (typeStyle == "bold") {
      if (parent.prop("tagName") != "SPAN") {
        const oldHtml = parent.html()
        const newHtml = oldHtml.replace(
          text,
          `<span style="font-weight: 700;">${text}</span>`
        )
        parent.html(newHtml)
      } else {
        const oldHtml = parent.parent().html()
        const newHtml = oldHtml.replace(
          `<span style="font-weight: 700;">${text}</span>`,
          text
        )
        parent.parent().html(newHtml)
      }
    } else {
      if (parent.prop("tagName") != "SPAN") {
        const oldHtml = parent.html()
        const newHtml = oldHtml.replace(
          text,
          `<span style="color: ${typeStyle}">${text}</span>`
        )
        parent.html(newHtml)
      } else {
        parent.html(`<span style="color: ${typeStyle}">${text}</span>`)
      }
    }
  }
  window.getSelection().removeAllRanges()
}

function resetText(type) {
  const originalText = $(`.inputTextBanner[data-type=${type}]`).text()
  $(`.inputTextBanner[data-type=${type}]`).text(originalText)
}
