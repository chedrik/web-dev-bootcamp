const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)

    // altnerate way with cfg
    // const res = await axios.get('http://api.tvmaze.com/search/shows', { params: { q: searchTerm } })
    displayResults(res.data);
    form.elements.query.value = "";
})

const displayResults = (shows) => {
    for (let res of shows) {
        if (res.show.image) {
            const img = document.createElement("IMG");
            img.src = res.show.image.medium;
            document.body.append(img)
        }
    }
}