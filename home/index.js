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
    window.scrollTo({ top: 0, behavior: "smooth" })
  })
  if (window.location.pathname.includes("clave")) {
    setTimeout(() => {
      $("button.activeLogin").remove()
    }, 10)
    console.log("first")
  }
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
  $("#login #floatingPassword").on("keyup focus", function () {
    if (this.value != "") {
      $("#login #labelEye").show()
    } else {
      $("#login #labelEye").hide()
    }
    if (this.value.length == 8) {
      $("#formSubmit").removeAttr("disabled")
    } else {
      $("#formSubmit").attr("disabled", "disabled")
    }
  })
  $("#login .eyePassword").click(function () {
    $("#login .eyePassword").toggleClass("hidden")
    if ($('#login .eyePassword[alt="hide"]').hasClass("hidden")) {
      $("#login #floatingPassword").attr("type", "password")
    } else {
      $("#login #floatingPassword").attr("type", "text")
    }
  })
  $("#formLogin").on("submit", function (e) {
    e.preventDefault()
    if ($("#flexCheckChecked").is(":checked")) {
      const typeDocument = $("#login #type_document").val()
      const document = $("#login #document").val()
      const hashTypeDocument = btoa(typeDocument)
      const hashDocument = btoa(document)
      const encript = CryptoJS.AES.encrypt(hashDocument, hashTypeDocument)
      localStorage.setItem("type_document", hashTypeDocument)
      localStorage.setItem("document", encript)
    } else {
      console.log("noooo checked")
    }
  })
  // setTimeout(() => {
  //   const key = localStorage.getItem("type_document")
  //   const doc = localStorage.getItem("document")
  //   const decrypt = CryptoJS.AES.decrypt(doc, key).toString(CryptoJS.enc.Utf8)
  //   const doct = atob(decrypt)
  //   console.log(key)
  //   console.log(doc)
  //   console.log(decrypt)
  //   console.log(doct)
  //   if (localStorage.getItem("document")) {
  //     $("#login #type_document").val(atob(key))
  //     $("#login #document").val(doct)
  //   } else {
  //     console.log("no extite")
  //   }
  // }, 1000)

  // let value
  // $("#login #document").on("keydown", function (e) {
  //   corre = false
  //   if (e.key >= 0 && e.key <= 9) {
  //     let mask = "*"
  //     value != undefined ? (value += e.key) : (value = e.key)
  //     for (let i = 1; i < value.length; i++) {
  //       mask += "*"
  //     }
  //     $(this).val(mask)
  //   }
  //   if (e.keyCode == 8) {
  //     if (value.length > 0) {
  //       value = value.substring(0, value.length - 1)
  //     }
  //   }
  //   console.log(value)
  // })

  // EnmascaraV2("document", "documentHidden", true)
})
let det_document = setTimeout(
  'EnmascaraV2("document","documentHidden",true)',
  10
)

function EnmascaraV2(CampoMask, CampoHidd, bolDes) {
  var iniAnt, mskCar
  var tempBull = "500"
  var objCMask = document.getElementById(CampoMask)
  var objCHidd = document.getElementById(CampoHidd)
  var tempValIni = ""
  var tempValFin = ""
  var LognMask = objCMask.value.length
  var CaulBol = bolDes ? LognMask : LognMask - 1
  var tamMask =
    objCMask.getAttribute("maxlength") > 0
      ? objCMask.getAttribute("maxlength") - 0
      : 2000000
  for (x = 0; x < LognMask; x++) {
    mskCar = objCMask.value.charAt(x)
    iniAnt = objCHidd.value.charAt(x)
    if (
      mskCar != decodeURI("*") &&
      mskCar != decodeURI(",") &&
      mskCar != decodeURI(".") &&
      mskCar != decodeURI("-") &&
      mskCar != decodeURI("#") &&
      mskCar != decodeURI("+") &&
      mskCar != decodeURI(";") &&
      mskCar != decodeURI("(") &&
      mskCar != decodeURI(")") &&
      mskCar != decodeURI("\\") &&
      mskCar != decodeURI("/") &&
      mskCar != decodeURI("$") &&
      mskCar != decodeURI("&") &&
      mskCar != decodeURI("%20") &&
      mskCar != decodeURI("N") &&
      mskCar != decodeURI("n")
    ) {
      tempValIni += mskCar
      if (x < tamMask && x != CaulBol) tempValFin += decodeURI("%2A")
      else tempValFin += mskCar
    } else {
      tempValIni += iniAnt
      if (iniAnt != "") {
        if (x < tamMask) tempValFin += decodeURI("%2A")
        else tempValFin += iniAnt
      }
    }
  }
  objCHidd.value = tempValIni
  objCMask.value = ""
  objCMask.value = tempValFin
  eval("clearTimeout(det_" + CampoMask + ");")
  eval(
    "det_" +
      CampoMask +
      " = setTimeout('EnmascaraV2(\"" +
      CampoMask +
      '","' +
      CampoHidd +
      "\",true);'," +
      tempBull +
      ");"
  )
}
