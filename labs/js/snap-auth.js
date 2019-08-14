const loginClick = () => {
  document.getElementsByClassName("fp5nm8g")[0].click()
}

window.snapKitInit = () => {
  snap.loginkit.mountButton("login-kit-target", {
    clientId: "da909317-d9a7-4f49-91f9-d4f423197eee",
    redirectURI: "https://snaplink.app/labs/snap-auth",
    scopeList: [
      "user.display_name",
      "user.bitmoji.avatar"
    ],
    handleResponseCallback: () => {
      snap.loginkit.fetchUserInfo().then((result) => {
        document.getElementById("snap-auth-results-name").innerHTML = result.data.me.displayName
        document.getElementById("snap-auth-results-external-id").innerHTML = result.data.me.externalId
        document.getElementById("snap-auth-results-bitmoji").src = result.data.me.bitmoji.avatar
      }, (err) => {
        console.log(err)
      })
    }
  })
}
