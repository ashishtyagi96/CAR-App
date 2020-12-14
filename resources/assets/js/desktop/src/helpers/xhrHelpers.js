import urlParser from "url-parse";
import { getCookie } from "./cookie";

export function xFetch(options = {}) {
    let headers = {
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        Accept: "application/json"
    };

    let queryParams = {};
    let postData = null;
    let queryMethod = null;
    const { query = {} } = options;

    if (!options.method || options.method.toUpperCase() === "GET") {
        if (options.body) {
            queryParams = Object.assign({}, options.body, queryParams);
        }
        queryMethod = { method: "GET" };
    } else {
        let post_body = options.body || {};

        if (options.multipart) {
            postData = { body: post_body };
        } else {
            headers["Content-type"] = "application/json";

            postData = { body: JSON.stringify(post_body) };
        }

        queryMethod = { method: options.method };
    }

    const parsedUrl = new urlParser(`${options.url}`, true);

    queryParams = Object.assign({}, parsedUrl.query, query, queryParams);

    //Forming the new URL
    parsedUrl.set("query", queryParams);

    if (!!options.headers) {
        headers = Object.assign({}, headers, options.headers);
    }

    let additional = Object.assign(
        {},
        { credentials: "same-origin" },
        queryMethod,
        { headers: headers },
        options.extras,
        postData
    );
    return fetch(parsedUrl.toString(), additional)
        .then(async response => {
            try {
                const res = await response.json();
                return res;
            } catch (ex) {
                console.log("ex", ex);
                throw new Error("something went wrong");
            }
        })
        .catch(err => console.log(err));
}
