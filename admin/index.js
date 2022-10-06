$("div#sidebar").load("components/sidebar.html")
$("div#home").load("vistas/home.html")
$("div#banners").load("vistas/banners.html")
$("div#descargar").load("vistas/descargar.html")
$("div#documentos").load("vistas/documentos.html")
$("div#streaming").load("vistas/streaming.html")

$(window).on("load", function () {
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
  $(".inputTextBanner").on("keyup", function () {
    $(this)
      .parent()
      .siblings(".textLength")
      .children("span")
      .text(this.value.length)
  })
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

function styledText() {
  const range = window.getSelection().getRangeAt(0)
  if (range.commonAncestorContainer.parentElement.className == "textInput") {
    const span = document.createElement("span")
    span.style.fontWeight = 700
    span.appendChild(range.extractContents())
    range.insertNode(span)
  }
}

// TODO: queda pendiente que la funcion detecte donde esta y solo afecte a los hijos

function changeInput(item) {
  if ($("span", item).text() == "Personalizar") {
    $("span", item).text("Editar")
    $(item).parent().siblings(".customInput").children("textInput")
    $("#inputTitle").slideUp()
    $(".textInput").slideDown()
  } else {
    $("span", item).text("Personalizar")
    $("#inputTitle").slideDown()
    $(".textInput").slideUp()
  }
}

function personalizar() {
  $("#titleBanner").text($("#inputTitle").val())
  $("#subTitleBanner").text($("#inputSubTitle").val())
  if ($(containerCostum).css("display") == "none") {
    $("#containerCostum").slideDown()
  } else {
    $("#containerCostum").slideUp()
  }
}
