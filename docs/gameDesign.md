
## To Decide
* 1-1 要不要用帶容量的fill cup with
*

## Data Format
```js
var cup = {
  class: "cup",
  capacity: 500, // unchangeable
  filled: {
    "black tea": 300,
    "milk": 200,
  },
  filledVolume: 500,
};

cup.filled["black tea"] += 300;
cup.filledVolume += 300;
```

## cup data format

```js
Shop.Game.UI.Config = {
  "black tea": {r: 192, g: 64, b: 0, a: 0.75},
  "milk": {r: 255, g: 255, b: 240, a: 1};
};

var cup = {
  capacity: 500,
  materials: [
    {
      material: "black tea",
      volume: 300,
    },
    {
      material: "milk",
      volume: 200,
    },
  ],
};
```


```js

var serveGuest = function(guest) {
  sayTo("歡迎光臨，請問要點什麼呢？", guest);
  var drinkName = getOrder
  var drink = makeDrink(drinkName);
  give(drink, guest);
  var price = getDrinkPrice(drinkName);
  receiveMoney(guest, price);
};

for (let guest of guests) {
  serveGuest(guest);
}


```
