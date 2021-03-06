import Utils from '../utils/common.utils'


export let requestLogin = async (data) => {
    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }

    let result = {}

    await fetch(`${Utils.url}/api/v1/users/login`, options)
        .then(res => {
            if (res.status === 200 || res.status === 401 || res.status === 400) {
                return res.json()
            }
        })
        .then(res => {
            if (res.status === 400) {
                result.error = res.errors[0].msg
            } else if (res.status === 401) {
                result.error = res.message
            } else {
                if (res) {
                    result.user = res
                }
            }
        })
        .catch(error => {
            result.error = "Please try again later"
        })
    return result
}

export let requestCurrentUser = async (token) => {

    let result = {
        status: false,
        data: {},
        errorMessage: ''
    }

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/users/whoami`, options)
        .then(res => {
            if (res.status === 200) {
                result.status = true
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result.data = res
            }
        })
        .catch(error => {
            result.errorMessage = "Please try again later"
        })

    return result
}

export let createUser = async (data) => {
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    let result = {}

    await fetch(`${Utils.url}/api/v1/users`, options)
        .then(res => {

            if (res.status === 201 || res.status === 409 || res.status === 400) {
                return res.json()
            }
        })
        .then(res => {
            if (res.status === 409) {
                result.errorMessage = res.message
                result.status = false
            } else if (res.status === 400) {
                result.errors = res
                result.errorMessage = res.message
                result.code = 400
                result.status = false
            }
            else {
                result.status = true
            }

        })
        .catch(error => {
            result.errorMessage = "Please try again later"
        })
    return result
}