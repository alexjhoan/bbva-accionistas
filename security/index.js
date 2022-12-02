$("div#sidebar").load("components/sidebar.html")
$("div#security").load("vistas/security.html")
$("div#add-user").load("vistas/add-user.html")
$("div#new-user-success").load("vistas/new-user-success.html")

$(window).on("load", function () {
  setTimeout(() => {
    $("#sidebar li").click(function () {
      const url = $(this).data("url")
      $(this).addClass("active").siblings().removeClass("active")
      $(`#page_security .content`).children().not("#header,  #myalert").hide()
      $(`#page_security .content #${url}`).show()
    })
  }, 50)
})

function search(value) {
  let result = allData.filter((find) => {
    return Object.values(find).join(" ").toLowerCase().includes(value)
  })
  if (result.length > 0) {
    setData(result)
    setNotResult(false)
  } else {
    setNotResult(true)
    setData([])
  }
  setTimeout(() => {
    setSearching(false)
  }, 650)
}

const onChangeInput = (e) => {
  let inputValue = e.target.value.toLowerCase()
  if (inputValue.length > 0) {
    setSearching(true)
    search(inputValue)
  } else {
    setSearching(false)
    setData(allData)
  }
}

function userSuccess(event) {
  event.preventDefault()
  $("#page_security .content #add-user").hide()
  $("#page_security .content #new-user-success").show()
}

function showHome() {
  $("#page_security .content #new-user-success").hide()
  $("#page_security .content #add-user").show()
}
