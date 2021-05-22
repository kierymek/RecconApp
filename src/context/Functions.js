export function printAlert(error) {
    if (error.response !== undefined) {
        console.log(error.response);
        const responseText = JSON.parse(error.response.request.responseText);
        let response = "";
        for (const [key, value] of Object.entries(responseText)) {
          response += "input name -> " + key + "\ninput errors:  ";
          if (typeof value === "string") {
            response += value + "\n";
            continue;
          }
          for (const message of Object.values(value)) {
            response += message + "\n";
          }
          response += "\n";
        }
        alert(response);
      }
}

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
