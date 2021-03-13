// Selection by id, tagname, classname

// Get me the object that matches this query. BY ID
// This ONLY returns a single object
const notreal = document.getElementById('notreal'); //null
const banner = document.getElementById('banner'); //js obj, even though it looks like just the HTML

// quiz
// const image = document.getElementById("unicorn");
// const heading = document.getElementById("mainheading");

// selection by tag , class gives an html collection
// Sort of like an array, but its not. No map, etc.
// They are iterable
const foundImages = document.getElementsByTagName("IMG"); // not case sensitive

// Also gets an HTML collection
const squareImages = document.getElementsByClassName('square');

// newer, fancier, yay! Queryselector
// can pretty much find anything. Same syntax as css!
document.querySelector("h1")  // gives the first value
document.querySelector("#banner")
document.querySelector(".square")
document.querySelector("img:nth-of-type(2)")  // can chain, multiselect, etc.
document.querySelector('a[title="Java"')  // type and attirbute!

// querySelectorAll does the same thing, but returns an html collection

// querySelectorPractice
// const doneTodos = document.querySelectorAll(".done");
// const checkbox = document.querySelector('input[type="checkbox"]');


// inner text!
const h1 = document.querySelector("h1");
h1.innerText = "Modified by JS!"
// text content is similar to inner text, but includes all content (hidden, etc.)
const anchors = document.querySelectorAll("a");
for (let a of anchors) {
    a.innerText = "Click me!";
}
// Can set the innerHTML instead to include any nested elements, etc.

// picklePractice
// const text = document.querySelector("h1>span");
// text.innerText = "Disgusting"

// note. getAttribute vs. direct attribute access for dom elements can be different.
// EX
const firstLink = document.querySelector("a");
console.log(firstLink.href !== firstLink.getAttribute("href"))

// attribute practice
// const eggo = document.querySelector("#egg");
// eggo.src = "https://www.flaticon.com/svg/static/icons/svg/3523/3523063.svg"
// eggo.alt = "chicken"

// how to modify styles!
// Note that they are all camelCased here vs. dashed-case in css
// style object also doesnt contain style from stylesheets. Only from inline...
// Useful to set, but not to get neccesarily
console.log(h1.style);
h1.style.color = "red";
h1.style.border = "2px solid blue";

// How else can I get the computed style?
console.log(window.getComputedStyle(h1).color)

// magicalForestExcercise
// const div = document.querySelector("div[id='container']");
// div.style.textAlign = "center";

// const img = document.querySelector("img");
// img.style.width = "150px";
// img.style.borderRadius = "50%";

// rainbow excercise
// const letters = document.querySelectorAll("span");
// for (let i = 0; i < colors.length; i++) {
//     letters[i].style.color = colors[i];
// }

// better option is to user a css class instead of direct style mod
// defined .purple, .border classes
const h2 = document.querySelector("h2");
// multiple options. Especially if you want to have multiple classes!
h2.setAttribute("class", "purple")  // will overwrite other classes
// OR
h2.classList.add("border")
h2.classList.toggle("purple")  // toggles! duh

// classList practice
// const list = document.querySelectorAll("li");
// for (let item of list) {
//     item.classList.toggle("highlight")
// }

// dom navigation
const firstBold = document.querySelector("b");
console.log(firstBold.parentElement)  // only a single direct parent
const par = firstBold.parentElement;
console.log(par.children)  // order found in the DOM
console.log(par.children[0].parentElement == par)

const firstSquare = document.querySelector(".square");
// nextSibling vs. nextElementSibling
firstSquare.nextSibling // this is a "node", it may not have relevant info
firstSquare.nextElementSibling // this is an html element

// Adding or removing elements! yeehaw
const newImg = document.createElement("img");
newImg.src = "https://variety.com/wp-content/uploads/2019/06/spongebob-battle-remaster.png?w=681&h=383&crop=1"
document.body.appendChild(newImg);
newImg.classList.add("square")

// append not supported in IE of course.
// same with prepend
par.append("NEW TEXT WHO DIS")

// other insertion methods such as inserAdjacentElement(position, element)

// buttonExcercise
// const div = document.querySelector('div[id="container"]');

// for (let i = 0 ; i < 100; i++) {
//     const btn = document.createElement("button");
//     btn.innerText = "myBtn"
//     div.appendChild(btn)
// }


// Similarly, remove and removeChild follow the same.
// removeChild is annoying b/c you have to call the method on the parent!
const firstLi = document.querySelector("li");
firstLi.parentElement.removeChild(firstLi)  // annoying
// OR
// firstLi.remove()

// POKEMON
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{}.png
const pokeContainer = document.querySelector("#pokemon");
for (let i = 1; i <= 151; i++) {
    const newPokeDiv = document.createElement("div");
    newPokeDiv.classList.add("pokemon")
    const newSpan = document.createElement("span");
    newSpan.innerText = `#${i}`
    const newPoke = document.createElement("img");
    newPoke.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    newPokeDiv.appendChild(newPoke)
    newPokeDiv.appendChild(newSpan)
    pokeContainer.append(newPokeDiv)
}
