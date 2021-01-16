import Utils from '../utils/common.utils'

export let getVocalists = async (token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/users/vocalists`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } 
        }).then(res=> result = res)
         .catch(err =>
             console.log(err)
         )

    return result
}

export let getTracks = async (token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }

    await fetch(`${Utils.url}/api/v1/users/tracks`, options)
    .then(res => {
        if (res.status === 200) {
            return res.json()
        } 
    }).then(res=> result = res)
     .catch(err =>
         console.log(err)
     )

return result
} 