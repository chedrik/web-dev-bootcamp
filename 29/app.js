// JS is a "prototype language"
// Fcns are stored in __proto__ property
// The proto property is a reference to the common fcns
// Only 1 actual method (ie. .append)

Array.prototype // this is the array template prototype
// this common proto can be updated!
Array.prototype.test = () => {
    console.log('Custom proto!')
}
// all arrays will have the .test attribute
[].test() // woah!
// that said, not a great idea to do this

// Note: __proto__ is NOT the prototype itself, only the reference
// Only the Array.prototype is the ACTUAL object

//  OOP (in JS). Its v similar to other OOP

// factory functions. Make and return an obj
function makeColor(r, g, b) {
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function () {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    };
    color.hex = function () {
        return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
    return color;
}
const myColor = makeColor(100, 50, 75);
console.log(myColor.rgb())
console.log(myColor.hex())

// constructors used more commonly than factory fcns
// why? Each color obj above has the fcns attached to it. 
// This is a waste, there's no need to have a unique copy for each object
// memory hog!
function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}
// The methods need to be outside of the template in order to be associated to ONLY the template
// Remember, no arrow functions here due to the issues with 'this'!
Color.prototype.rgb = function () {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
};
Color.prototype.hex = function () {
    return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
}
Color.prototype.rgba = function (a = 1.0) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`
};

// This only works if you use 'new' to instantiate the object
// New does the following: ********
//      creates new blank obj
//      links the obj to another obj (sets constructor)
//      passes newly create obj as 'this'
//      return 'this' if the constructor doesnt explicitly
const my2ndColor = new Color(100, 50, 75);
const my3rdColor = new Color(50, 70, 55);

console.log(my2ndColor.rgb())
console.log(my2ndColor.hex())

// Look, references to the method! The rgb method is only on the prototype directly
console.log(my2ndColor.rgb === my3rdColor.rgb)


// but theres a better option! with the 'class' keyword!
class ColorClass {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL(); // call automatically
    }
    // Methods automatically only applied to prototype!
    innerRGB() {
        return `${this.r}, ${this.g}, ${this.b}`
    }
    rgb() {
        // const { r, g, b } = this; could destructure like so instead
        return `rgb(${this.innerRGB()})`
    };
    hex() {
        return '#' + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`
    };
    calcHSL() {  // hastily copied from video
        let { r, g, b } = this;
        r /= 255;
        g /= 255;
        b /= 255;

        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            h = (b - r) / delta + 2;
        else
            h = (r - g) / delta + 4;

        if (h < 0) h += 360;
        l = (cmax + cmin) / 2;

        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h},${s}%,${l}%)`
    }
    opposite() {
        const { h, s, l } = this;
        let newH = (h + 180) % 360;
        return `hsl(${newH},${s}%,${l}%)`
    }
    // could fully saturate, etc...

}

const myClassColor = new ColorClass(255, 67, 89, 'domates');
console.log(myClassColor.rgba('0.5'))

const white = new ColorClass(255, 255, 255, 'white');
console.log(white.hsl())
console.log(white.opposite())


// Inheritance / extends
class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        console.log(`${this.name} is eating`)
    }
}

class Cat extends Pet {  // inheritance
    constructor(name, age, livesleft = 9) {
        super(name, age);  // call to parent constructor
        this.livesleft = livesleft;
    }
    meow() {
        console.log('meow')
    }
}
class Dog extends Pet {
    bark() {
        console.log('woof')
    }
    eat() {  // method overide
        console.log(`${this.name} is eating like a dog`)
    }
}
const cat = new Cat('Monty', 9);
cat.eat()
cat.meow()
const lou = new Dog('Lou', 9);
lou.eat();
lou.bark()