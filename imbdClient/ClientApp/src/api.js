function postData(path, data, rest = {}) {
    return fetch(`${process.env.REACT_APP_API}/${path}`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
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