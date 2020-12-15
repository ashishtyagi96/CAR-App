const path = window.location.href;

export const HOST = path
    .split("/")
    .slice(0, 3)
    .join("/");

export const PATH = {
    ROOT: "/",
    HOME: "/home",
    CARS: "/car"
};

export const REQUEST_TYPE = {
    POST: "post",
    GET: "get",
    PUT: "put",
    DELETE: "delete"
};
