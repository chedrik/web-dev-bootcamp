// event properties
const btnV2 = document.querySelector("#v2");
btnV2.onclick = function () {
    alert('Clicked w/ event property!')
}

// best method,. with event listener.
const btnV3 = document.querySelector("#v3");
btnV3.addEventListener("click", () => alert('Listened!'))

// This one will remove the listener after one time used!
btnV3.addEventListener("click", () => alert('Only once!!'), { once: true })


// clickEvents exercise
// const hello = document.querySelector("#hello");
// hello.addEventListener("click", () => {
//     console.log("hello")
// })
// const goodbye = document.querySelector("#goodbye");
// goodbye.addEventListener("click", () => {
//     console.log("goodbye")
// })

// Change color and set the header to the rbg value
const colorBtn = document.querySelector("#color");
colorBtn.addEventListener("click", () => {
    const str = genRandRGB();
    document.querySelector("body").style.backgroundColor = str;
    // document.body.style.backgroundColor = str;  This is a shortcut instead of query selectotr
    document.querySelector("h1").innerText = str;
})

function genRandRGB() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

colorBtn.addEventListener("mouseover", function (evt) {
    console.log(evt) // Obj always passed to event listener! Creates a MouseEvent
    this.style.backgroundColor = genRandRGB();
})

const input = document.querySelector("input");
input.addEventListener("keydown", (evt) => {
    console.log(`Key down: ${evt.key}`)
    console.log(`Key code: ${evt.code}`) //actual keyboard key / location pressed
    // console.log(evt)
})

const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault(); // stops the form action from occurring!
    console.log(this.elements.username.value, this.elements.comment.value)
    const newLi = document.createElement("li");
    newLi.innerHTML = `<b>${this.elements.username.value}</b> said ${this.elements.comment.value}`
    document.querySelector("#comments").appendChild(newLi)
    this.elements.username.value = '';
    this.elements.comment.value = '';

})

// grocery exercise
// const form = document.querySelector('form');

// form.addEventListener("submit", function(e) {
//     e.preventDefault();
//     const qty = this.elements.qty;
//     const item = this.elements.product;

//     add_to_list(item.value, qty.value);

//     // reset the values
//     qty.value = '';
//     item.value = '';
// });

// const add_to_list = (item, qty) => {
//     const newItem = document.createElement("li");
//     newItem.innerText = `${item} ${qty}`;
//     document.querySelector("#list").appendChild(newItem);
// };

// input / change events!
const text = document.querySelector("#text");
// Only fires when the user moves away from the input. IE. not actively typing
text.addEventListener("change", () => console.log("Changed"))
const h3 = document.querySelector("h3");
h3.innerText = '';
text.addEventListener("input", function (e) {
    const h3 = document.querySelector("h3");
    h3.innerHTML = input.value

})

// Input event practice
// const input = document.querySelector("#username");
// input.addEventListener("input", () => {
//     const h1 = document.querySelector("h1");
//     if (input.value === '') {
//         h1.innerText = "Enter Your Username"
//     } else {
//         h1.innerText = `Welcome, ${input.value}`
//     }
// })

// Event bubbling!
// Any parent elements w/ event triggers will be called after the initial item.
// Even stream 'bubbles up' from initial element all the way to doc
// can prevent with e.stopPropagation();

// Event delegation
const comments = document.querySelector("#comments");
comments.addEventListener("click", function (e) {
    console.log(e)  // will show 'target' which is the element clicked on!
    if (e.target.nodeName === "LI") {  // we only want to remove the LI here essentially.
        e.target.remove();
    }

})