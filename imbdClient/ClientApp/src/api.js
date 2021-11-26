function postData(path, data, rest = {}) {
    return fetch(`${process.env.REACT_APP_API}/${path}`, {
            method: "POST",
            body: data,
            ...rest
    })
}

function getData(path, rest = {}) {
    return fetch(`${process.env.REACT_APP_API}/${path}`, { ...rest })
}

export {
    postData,
    getData
}