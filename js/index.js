const createYours = () => {
  $("#snap-username").focus()
}

const checkSnapUsername = (obj) => {
  let value = obj.value
  if (!SNAP.validSnap(value)) {
    obj.setAttribute("invalid","true")
  }
  else {
    $(".submit")[0].style = "pointer-events: none;"
    obj.setAttribute("invalid","false")
    let snap = SNAP.utils.Snapchat.clean(value)
    SNAP.check(value, (data) => {
      let url = $("#snap-url")[0]
      if (data.available.toString() === "true") {
        url.value = snap
        url.setAttribute("invalid","false")
        url.setAttribute("available","true")
        url.focus()
      }
      $(".submit")[0].style = ""
    })
  }
}

const checkSnapURL = (obj) => {
  let value = obj.value
  if (!SNAP.validURL(value)) {
    obj.setAttribute("invalid","true")
  }
  else {
    obj.setAttribute("invalid","false")
    SNAP.check(value,(data) => {
      obj.setAttribute("available",data.available.toString())
    })
  }
}

const submit = () => {
  let username = $("#snap-username")[0].value
  let url = $("#snap-url")[0].value
  let regress = () => {
    checkSnapUsername($("#snap-username")[0])
    checkSnapURL($("#snap-url")[0])
  }
  if (SNAP.validSnap(username) && SNAP.validURL(url)) {
    SNAP.check(url,(data) => {
      if (data.available) {
        $(".submit")[0].style = "pointer-events: none;"
        $(".submit")[0].innerText = "Creating..."
        SNAP.create(SNAP.utils.String.clean(url),SNAP.utils.Snapchat.clean(username),(data) => {
          if (data.success) {
            modal(SNAP.utils.String.clean(url))
          }
          else {
            (regress)()
          }
        })
      }
      else {
        (regress)()
      }
    })
  }
  else {
    (regress)()
  }
}

const modal = (url) => {
  $(".copy")[0].setAttribute("data-clipboard-text",("https://s.nap.chat/" + url))
  let clipboard = new ClipboardJS(".copy")
  clipboard.on("success", (e) => {
    $(".copy")[0].innerText = "Copied."
  })
  $("#url-read")[0].innerText = url
  $("#modal")[0].className = ""
}

$("#snap-url")[0].value = SNAP.generate()
