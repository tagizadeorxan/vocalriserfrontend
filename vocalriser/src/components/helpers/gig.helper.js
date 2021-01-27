import Utils from '../utils/common.utils'


export let getGigs = async (type, gender, token) => {
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
        }).then(res => {
            if (res) {
                result = res
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}




export let getGigByID = async (id, token) => {
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
        }).then(res => {
            if (res) {
                result = res
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}



export let getGigBiddings = async (gigID, token) => {
    let result = [];

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    }
    await fetch(`${Utils.url}/api/v1/gigs/getBidsByGigID/${gigID}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        }).then(res => {
            if (res) {
                result = res
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}



export let removeBid = async (bidID, token) => {
    let result = false;

    let options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE'
    }
    await fetch(`${Utils.url}/api/v1/gigs/removeBid/${bidID}`, options)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                result = true
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}





export let submitBid = async (bid, token) => {
    let result = false;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bid)

    }
    await fetch(`${Utils.url}/api/v1/gigs/submitBid`, options)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                result = true
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result


}


export let closeGigByID = async (gig_id, token) => {
    let result = false;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    await fetch(`${Utils.url}/api/v1/gigs/closeGigByID/${gig_id}`, options)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                result = true
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result

}


export let awardGigByID = async (gig_id, user_id, token) => {
    let result = false;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            user_id
        })
    }
    await fetch(`${Utils.url}/api/v1/gigs/awardGigByID/${gig_id}`, options)
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



export let getBidExist = async (data, token) => {
    let result = false;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body:JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/gigs/bidExist`, options)
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

export let getCards = async () => {
    let result = [];

    await fetch(`${Utils.url}/api/v1/gigs/cards`)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result = res
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result

}



export let createGig = async (data, token) => {
    let result = false;

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/gigs/createGig`, options)
        .then(res => {
            if (res.status === 201) {
                result = true
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result

}




export let getGigsByUserID = async (user_id, token) => {
    let result = [];

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    await fetch(`${Utils.url}/api/v1/gigs/getGigsByUserID/${user_id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result = res;
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}




export let getBidderSuccessfullGigsByUserID = async (awardedUser, token) => {
    let result = [];

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    await fetch(`${Utils.url}/api/v1/gigs/getBidderSuccessfullGigsByUserID/${awardedUser}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result = res;
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}



export let getPreparedContract = async (gig_id, token) => {
    let result = ''

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    await fetch(`${Utils.url}/api/v1/gigs/prepareContractForGig/${gig_id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result = res;
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}



export let acceptGig = async (gig_id, token) => {
    let result = false

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    await fetch(`${Utils.url}/api/v1/gigs/acceptContractGigByID/${gig_id}`, options)
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


export let sendContract = async (data, token) => {
    let result = false

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }
    await fetch(`${Utils.url}/api/v1/gigs/sendContract`, options)
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


export let whereUserBiddedGigs = async (user_id, token) => {
    let result = []

    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }
    await fetch(`${Utils.url}/api/v1/users/biddedGigs/${user_id}`, options)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(res => {
            if (res) {
                result = res
            }
        })
        .catch(err =>
            console.log(err)
        )

    return result
}



