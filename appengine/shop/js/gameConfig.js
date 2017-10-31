/**
 * Blockly Games: Drink Shop
 */

goog.provide('Shop.Game.Config');
goog.require('BlocklyGames');

var Game = Shop.Game;

Shop.Game.Config.constants = {
  shop: {
    cupCapacities: {
      large: 700,   // 2
      medium: 500,  // 1.428571
      small: 350,   // 1
    },
    prices: {
      blackTea: {
        large: 25,
        medium: 20,
        small: 15,
      },
      greenTea: {
        large: 25,
        medium: 20,
        small: 15,
      },
      milkTea: {
        large: 50,
        medium: 35,
        small: 25,
      },
    },
    materialPrices: {
      blackTea: 0.01,  // $/ml
      greenTea: 0.01,
      milk: 0.02,
    },
  },
  robot: {
    actions: {
      getNewCup: {
        timeSpent: 5, // seconds
      },
      fillCup: {
        timeSpent: 10, // seconds
      },
      coverCup: {
        timeSpent: 5, // seconds
      },
      serve: {
        timeSpent: 5,
      },
    },
  },
};

Shop.Game.Config.levels = [
  // Level 0
  undefined,
  // Level 1
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWith_material_bg',
      'block_DrinkShop_coverCup',
    ],
    scale: 1,
    goal:
    '製作一杯中杯紅茶。' +
    '<div id="recipe-cup-container"></div>',
    hint:
    '請將程式積木拉到右邊的空白區域，<br/>' +
    '由上到下依照正確順序拼接。<br/>' +
    '<img src="shop/public/hints/zh/level_1_hint_1.gif" class="hint-img" alt="level 1 hint">' +
    '<br/>' +
    '按下下方的「執行程式」按鈕，<br/>' +
    '讓機器人執行你寫的程式。<br/>' +
    '<img src="shop/public/hints/zh/level_1_hint_2.png" class="hint-img" alt="level 1 hint">',
    // call this after BlocklyGames initialized so that BlocklyGames.getMsg works
    getRecipe: function() {
      return [
        {
          material: 'black tea',
          text1: BlocklyGames.getMsg('DrinkShop_blackTea'),
          text2: '500' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 100,
        },
      ];
    },
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 20,
        materials: {
          blackTea: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // not black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_notBlackTea');
      }

      // cup not full
      if (cup.filledVolume < 499.99) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea
      if (Object.keys(cup.filled).length > 1) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }
      // TODO: check more

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 2
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWith_material_bg',
      'block_DrinkShop_coverCup',
    ],
    scale: 1,
    goal: '製作一杯中杯綠茶。' +
    '<div id="recipe-cup-container"></div>',
    hint:
    '點擊程式積木中的選單來選擇不同的飲料。<br/>' +
    '<img src="shop/public/hints/zh/level_2_hint.gif" class="hint-img" alt="level 2 hint">',
    getRecipe: function() {
      return [
        {
          material: 'green tea',
          text1: BlocklyGames.getMsg('DrinkShop_greenTea'),
          text2: '500' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 100,
        },
      ];
    },
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 20,
        materials: {
          greenTea: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // not green tea in cup
      if (!cup.filled.hasOwnProperty("green tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_notGreenTea');
      }

      // cup not full
      if (cup.filledVolume < 499.99) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only green tea
      if (Object.keys(cup.filled).length > 1) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }
      // TODO: check more

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 3
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWith_material_bgm',
      'block_DrinkShop_coverCup'
    ],
    scale: 1,
    goal: '製作一杯中杯奶茶。' +
    '<div id="recipe-cup-container"></div>',
    hint:
    '你可以輸入不同的數字來改變飲料倒入的量。<br/>' +
    '<img src="shop/public/hints/zh/level_3_hint.png" class="hint-img" alt="level 3 hint">',
    getRecipe: function() {
      return [
        {
          material: 'milk',
          text1: BlocklyGames.getMsg('DrinkShop_milk'),
          text2: '200' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 40,
        },
        {
          material: 'black tea',
          text1: BlocklyGames.getMsg('DrinkShop_blackTea'),
          text2: '300' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 60,
        },
      ];
    },
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 30,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBlackTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }

      // cup not full
      if (cup.filledVolume < 499.99) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk
      if (Object.keys(cup.filled).length > 2) {
        throw Game.levelFailedMessage('DrinkShop_msg_notOnlyBlackTeaAndMilk');
      }

      // not correct proportion
      if (cup.filled["black tea"] !== 300 || cup.filled["milk"] !== 200) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 4
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWith',
      'block_DrinkShop_coverCup'
    ],
    scale: 1,
    goal: '製作一杯中杯珍珠奶茶。' +
    '<div id="recipe-cup-container"></div>',
    getRecipe: function() {
      return [
        {
          material: 'milk',
          text1: BlocklyGames.getMsg('DrinkShop_milk'),
          text2: '160' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 32,
        },
        {
          material: 'black tea',
          text1: BlocklyGames.getMsg('DrinkShop_blackTea'),
          text2: '240' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 48,
        },
        {
          material: 'boba',
          text1: BlocklyGames.getMsg('DrinkShop_boba'),
          text2: '100' + BlocklyGames.getMsg('DrinkShop_ml'),
          percent: 20,
        },
      ];
    },
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 40,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          boba: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBlackTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }
      // no boba in cup
      if (!cup.filled.hasOwnProperty("boba")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBoba');
      }

      // cup not full
      if (cup.filledVolume < 499.99) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk and boba
      if (Object.keys(cup.filled).length > 3) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }

      // not correct proportion
      if (cup.filled["boba"] !== 100 || cup.filled["black tea"] !== 240 || cup.filled["milk"] !== 160) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 5
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWith_material_bgm',
      'block_DrinkShop_coverCup',
      'block_math_arithmetic',
    ],
    scale: 1,
    goal: '製作一杯中杯奶綠。' +
    '<div id="recipe-cup-container"></div>',
    hint:
    '我們也經常用百分比來記錄各種原料的比例，<br/>' +
    '在製作飲料時，<br/>' +
    '要根據杯子的容量計算出實際的毫升數。<br/>' +
    '<br/>' +
    '有時候，實際的毫升數不容易計算，<br/>' +
    '你可以使用乘法積木，<br/>' +
    '讓機器人自己計算出實際數值。<br/>' +
    '<img src="shop/public/hints/zh/hint_multiply.png" class="hint-img" alt="hint multiply">',
    getRecipe: function() {
      return [
        {
          material: 'milk',
          text1: BlocklyGames.getMsg('DrinkShop_milk'),
          text2: '35%',
          percent: 35,
        },
        {
          material: 'green tea',
          text1: BlocklyGames.getMsg('DrinkShop_greenTea'),
          text2: '65%',
          percent: 65,
        },
      ];
    },
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 30,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no green tea in cup
      if (!cup.filled.hasOwnProperty("green tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noGreenTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }

      // cup not full
      if (cup.filledVolume < 499.99) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only green tea and milk
      if (Object.keys(cup.filled).length > 2) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }

      // not correct proportion
      if (cup.filled["green tea"] !== 175 || cup.filled["milk"] !== 325) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 6
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWith',
      'block_DrinkShop_coverCup',
      'block_math_arithmetic',
    ],
    scale: 0.875,
    goal: '製作一杯中杯珍珠奶綠。<br/>' +
    '<div id="recipe-cup-container"></div>',
    hint:
    '你可以在乘法積木中再插入乘法積木。<br/>' +
    '<img src="shop/public/hints/zh/hint_double_multiply.png" class="hint-img" alt="hint double multiply">',
    getRecipe: function() {
      return [
        {
          material: 'milk',
          text1: BlocklyGames.getMsg('DrinkShop_milk'),
          text2: '80% × 35%',
          percent: 28,
        },
        {
          material: 'green tea',
          text1: BlocklyGames.getMsg('DrinkShop_greenTea'),
          text2: '80% × 65%',
          percent: 52,
        },
        {
          material: 'boba',
          text1: BlocklyGames.getMsg('DrinkShop_boba'),
          text2: '20%',
          percent: 20,
        },
      ];
    },
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 40,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          boba: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no green tea in cup
      if (!cup.filled.hasOwnProperty("green tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noGreenTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }
      // no boba in cup
      if (!cup.filled.hasOwnProperty("boba")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBoba');
      }

      // cup not full
      if (cup.filledVolume < 499.99) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk and boba
      if (Object.keys(cup.filled).length > 3) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }

      // not correct proportion
      if (cup.filled["boba"] !== 100 || cup.filled["green tea"] !== 260 || cup.filled["milk"] !== 140) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
];
