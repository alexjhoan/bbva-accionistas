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

function openModal() {
  const modalForm = `
  <form class="row g-4">
          <div class="col-12 col-md-6">
            <label for="uservp" class="form-label m-0">Usuario VP</label>
            <input type="text" class="form-control" id="uservp" value="" placeholder="${1+1}">
          </div>
          <div class="col-12 col-md-6">
            <label for="name" class="form-label m-0">Nombre y Apellido</label>
            <input type="text" class="form-control" id="name" value="" placeholder="${1+2}">
          </div>
          <div class="col-12 col-md-6">
            <label for="perfil" class="form-label m-0">Perfil</label>
            <input type="text" class="form-control" id="perfil" value="" placeholder="${1+3}">
          </div>
          <div class="col-12 col-md-6">
            <label for="email" class="form-label m-0">Email</label>
            <input type="text" class="form-control" id="email" value="" placeholder="${1+4}">
          </div>
        </form>
  `
  $('#editUserModalBody').html(modalForm)
  $('#editUserModal').modal('show');
}
