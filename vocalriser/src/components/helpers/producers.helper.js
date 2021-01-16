import Utils from '../utils/common.utils'

export let getProducers = async (token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/users/producers`, options)
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
