export function getCookie(name) {
    let cookie_val = null;
    if (document && document.cookie) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            cookie_val = decodeURIComponent(
                parts
                    .pop()
                    .split(";")
                    .shift()
            );
        }
    }
    return cookie_val;
}

/*
 * name - string, cookie name
 * value - string, cookie value
 * expires - string, time in GMT,
 * path - string, path at which cookie needs to be stored, default value: '/'
 * domain - string, subdomain, default value: COOKIE_DOMAIN
 * secure - boolean, set https cookie or not, default: false
 */

export function setCookie(
    name,
    value,
    expires,
    path = "/",
    domain = "COOKIE_DOMAIN",
    secure = false
) {
    let cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        ";path=" +
        path +
        ";domain=" +
        domain +
        ";expires=" +
        expires;
    if (typeof secure !== "undefined" && secure) {
        cookie = cookie + ";secure=true";
    }
    document.cookie = cookie;
}
