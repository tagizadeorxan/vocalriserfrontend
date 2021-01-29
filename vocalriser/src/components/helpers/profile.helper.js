import Utils from '../utils/common.utils'

export let getUserByID = async (id,token) => {
    let result = {};

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/users/id/${id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } 
        }).then(res=> {
            if(res) {
                result = res
            }
        })
         .catch(err =>
             console.log(err)
         )

    return result
}


export let updateUser = async (user_id,data,token) => {
    let result = false
    

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'PATCH',
        body:JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/users/updateuser/${user_id}`, options)
        .then(res => {
            if (res.status === 200) {
               result = true
            } 
        })
         .catch(err =>
             console.log(err)
         )

    return result
}