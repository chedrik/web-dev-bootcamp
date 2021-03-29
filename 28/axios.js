// axios!
axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log(res.data.ticker.price)
    })
    .catch(err => {
        console.log('could not fetch the btc price!')
    })

const fetch = async () => {
    try {
        const res = await axios.getaxios.get('https://api.cryptonator.com/api/ticker/btc-usd')
        console.log(res.data.ticker.price)
    } catch (e) {
        console.log('err', e)
    }
}

// how to add headers to a request
const jokes = document.querySelector("#jokes");
const getDadJoke = async () => {
    const cfg = { headers: { Accept: 'application/json' } };
    const res = await axios.get('https://icanhazdadjoke.com', cfg);
    console.log(res.data.joke);
    return res.data.joke;
}

const addJoke = async () => {
    const joke = await getDadJoke(); // need to await, else it just returns the promise!
    const newLI = document.createElement("LI");
    newLI.append(joke)
    jokes.append(newLI)
}

const btn = document.querySelector("button");
btn.addEventListener("click", addJoke)