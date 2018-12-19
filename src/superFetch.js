import {getProfilePhone} from "./config/constants";

export const HTTP_METHOD_GET = "GET";
export const HTTP_METHOD_POST = "POST";

/**
 *
 * @param {String} accessToken
 * @param {String} url
 * @param {String} method
 * @param {Object} bodyObj
 * @return {Promise}
 */
export function superJsonRpcFetch(accessToken, url, method = HTTP_METHOD_GET, bodyObj = {}) {
    let headers = {"Content-type": "application/json"};
    if (accessToken) {
        headers["Authorization"] = "Bearer " + accessToken
    }
    let init = {
        method: method,
        headers: headers,
        credentials: 'include',
    };

    if (HTTP_METHOD_POST === method.toUpperCase()) {
        init.body = JSON.stringify(bodyObj);
    }

    return fetch(url, init).then(response => {
        if (response.status === 401) { // token expired
            // TODO: re-login or update token
            // TODO: create updateToken method in betting-api-gateway
        }

        if (parseInt(response.headers.get('Content-Length')) === 0) {
            return new Promise(function(resolve, reject) {
                resolve({});
            });
        }
        /*if (response.ok) */return response.json();
    }).catch(alert);
}