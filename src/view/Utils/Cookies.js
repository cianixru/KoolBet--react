export const setCookie = (name, value, options) => {
    options = options || {};
    var expires = options.expires;

    if (typeof expires === "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
        expires = options.expires = d;
        expires = '; expires=' + expires;
    }
    else {
        expires = ""
    }
    var cookie = [name, '=', encodeURIComponent(value), '; domain_.', window.location.host.toString(), expires, '; path=/;'].join('');
    document.cookie = cookie;
}

export const readCookie = (name) => {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const deleteCookie = (name) => {
    setCookie(name, "", { expires: -1 })
}