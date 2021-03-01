let max = parseInt(prompt("Enter the max number"));
while (!max) {
    max = parseInt(prompt("Enter a valid max number"));
}
// Note that this makes 0 inelligble due to it being falsey


const target = Math.floor(Math.random() * max) + 1;
console.log(target)
let guess = parseInt(prompt("Guess!"))
let att = 1;
while (parseInt(guess) !== target) {
    if (guess === 'q') {
        break
    }
    att++
    if (guess > target) {
        guess = prompt("Too high")
    } else {
        guess = prompt("Too low!")
    }
}
if (guess != 'q') {
    alert(`You won in ${att} attempts!`)
} else {
    alert('Quitter!')
}
