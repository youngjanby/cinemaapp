export function saveCookie(id) {
    const keyId = 'id'
    document.cookie = `${encodeURIComponent(keyId)}=${encodeURIComponent(id)}; max-age=360000`
}

export function giveCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }