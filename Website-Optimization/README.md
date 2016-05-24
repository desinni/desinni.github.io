# Website Optimization

Fourth project from https://www.udacity.com Front-End Web Developer Nanodegree program.

## Project 4:

You will optimize a provided website with a number of optimization- and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second.

#### Supporting Courses:
* Browser Rendering Optimization
* Website Performance Optimization

## Running the page
1. Download the source code to your computer
2. `cd` to the folder of the game
3. Run command `python -m SimpleHTTPServer`
4. Open localhost `http://0.0.0.0:8000/` on your browser

## Optimization
Pages to optimize:
* `views/pizza.html`, `views/js/main.js`
* TODO

#### Pizza page
Edited in `main.js` file:
* __Changing pizza sizes.__ All this code
```javascript
function determineDx (elem, size) {
 var oldWidth = elem.offsetWidth;
 var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
 var oldSize = oldWidth / windowWidth;

 function sizeSwitcher (size) {
   switch(size) {
     case "1":
       return 0.25;
     case "2":
       return 0.3333;
     case "3":
       return 0.5;
     default:
       console.log("bug in sizeSwitcher");
   }
 }
 var newSize = sizeSwitcher(size);
 var dx = (newSize - oldSize) * windowWidth;
 return dx;
}

function changePizzaSizes(size) {
 for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
   var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
   var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
   document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
 }
}
```
changed to
```javascript
function changePizzaSizes(size) {
  switch (size) {
    case "1":
      newwidth = 25;
      break;
    case "2":
      newwidth = 33.33;
      break;
    case "3":
      newwidth = 50;
      break;
    default:
      console.log("bug in sizeSwitcher");
  }

  var randomPizzas = document.getElementsByClassName("randomPizzaContainer");
  for (var i = 0; i < randomPizzas.length; i++) {
    randomPizzas[i].style.width = newwidth + "%";
  }
}
```

* `var items = document.querySelectorAll('.mover')` changed to  `var items = document.getElementsByClassName("mover")`. All __querySelectorAll__ changed to __getElementsByClassName__. Also DOM selectors as these were moved out of `for` loops, this way you don't need to access DOM elements every time you're looping.

* __Generating pizzas.__ It is only smart to generate as much pizzas as there can fit on the screen and not through out all the page. That is why all this code
```javascript
var cols = 8;
var s = 256;
for (var i = 0; i < 200; i++) {
  ...code...
}
```
could be changed to
```javascript
var cols = Math.floor(window.innerWidth / 150);
var rows = Math.floor(window.innerHeight / 200);
var s = 256;
var totalPizzas = cols * rows;
for (var i = 0; i < totalPizzas; i++) {
  ...code...
}
```
Here you count the width and the height of the screen and generate just the needed amount of pizzas to fill up the screen. The `innerWidth` and `innerHeight` properties return the inner width and height of a window's content area.

* __Moving pizzas.__ Checking `console.log(phase, document.body.scrollTop / 1250)` showed, that there are 5 numbers generated, so a good idea is to simplify those calculations.
