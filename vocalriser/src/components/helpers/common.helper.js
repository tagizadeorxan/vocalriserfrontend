import Utils from '../utils/common.utils'


export let getLanguages = async () => {
    let result = [];

    await fetch(`${Utils.url}/api/v1/gigs/languages`)
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

export let getGenres = async () => {
    let result = [];

    await fetch(`${Utils.url}/api/v1/gigs/genres`)
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