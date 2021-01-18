import Utils from '../utils/common.utils'

export let getGigs = async (type,gender,token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/gigs/getGigs/${type}/${gender}`, options)
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




export let getGigByID = async (id,token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/gigs/getGig/${id}`, options)
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