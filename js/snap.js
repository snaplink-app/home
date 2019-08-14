SNAP.utils = {
  String: {},
  Snapchat: {}
}

SNAP.check = (url,callback) => {
  if (SNAP.utils.String.isClean(url)) {
    $.ajax({
      url: (SNAP.API_PATH + "/index/check/" + SNAP.utils.String.clean(url) + "/"),
      success: (data) => {
        if (callback) {
          (callback)(data)
        }
      }
    })
  }
}

SNAP.create = (url,username,callback) => {
  if (SNAP.utils.String.isClean(url) && SNAP.utils.Snapchat.isClean(username)) {
    $.ajax({
      url: (SNAP.API_PATH + "/index/create/"),
      data: {
        url: SNAP.utils.String.clean(url),
        username: SNAP.utils.Snapchat.clean(username)
      },
      success: (data) => {
        if (callback) {
          (callback)(data)
        }
      }
    })
  }
}

SNAP.generate = (length) => {
  return SNAP.utils.String.clean(Math.random().toString(36).substring(2, ((length || 6) + 2)))
}

SNAP.validURL = (url) => {
  if (url.length >= 3 && url.length <= 16) {
    return SNAP.utils.String.isClean(url,true)
  }
}

SNAP.validSnap = (username) => {
  if (username.length >= 3 && username.length <= 15) {
    return SNAP.utils.Snapchat.isClean(username,true)
  }
}

SNAP.utils.String.clean = (string) => {
  return string.toString().trim().toLowerCase().replace(/[^a-zA-Z0-9_\-]+/g, "")
}

SNAP.utils.String.isClean = (string,raw) => {
  if (!raw) {
    string = SNAP.utils.String.clean(string)
  }
  if (!("_-").includes(string[0]) && string.length > 0) {
    if (raw && (/[^a-zA-Z0-9_\-]+/g).test(string.toString().trim().toLowerCase())) {
      return false
    }
    return true
  }
  return false
}

SNAP.utils.Snapchat.clean = (string) => {
  return string.toString().trim().toLowerCase().replace(/[^a-zA-Z0-9\._\-]+/g, "")
}

SNAP.utils.Snapchat.isClean = (string,raw) => {
  if (!raw) {
    string = SNAP.utils.Snapchat.clean(string)
  }
  if (!("._-").includes(string[0]) && string.length > 0) {
    if (raw && (/[^a-zA-Z0-9\._\-]+/g).test(string.toString().trim().toLowerCase())) {
      return false
    }
    return true
  }
  return false
}
