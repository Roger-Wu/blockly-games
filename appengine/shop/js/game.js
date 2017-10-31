/**
 * define the behaviors of commands in the game
 */

'use strict';

goog.provide('Shop.Game');
goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('Shop.Game.UI');
goog.require('Shop.utils');
goog.require('Shop.Game.Config');
goog.require('Shop.soy');

var Game = Shop.Game;
// Game.svg = document.getElementById('svgShop');

/*
Game.state
Game.commands.xxx
Game.levels
*/

// Game.init = function(levelSettings) {
Game.init = function(level) {
  Game.constants = Shop.Game.Config.constants;
  Game.levelConfig = Shop.Game.Config.levels[level];

  Game.initState();
  Game.UI.init(Game.state.shop);

  document.getElementById('drink-shop-level-desc-goal').innerHTML = Game.levelConfig.goal;
  if (Game.levelConfig.hint) {
    document.getElementById('drink-shop-level-desc-hint').innerHTML = Game.levelConfig.hint;
  } else {
    document.getElementById('drink-shop-level-desc-hint-title').style.display = 'none';
  }

  Game.initRecipeCup(Game.levelConfig.getRecipe);
};

Game.initRecipeCup = function(getRecipe) {
  var recipeCupContainer = document.getElementById('recipe-cup-container');
  if (recipeCupContainer && getRecipe) {
    var recipe = getRecipe();

    recipeCupContainer.innerHTML = Shop.soy.svgRecipeCup({}, null, {});

    var materialGroup = document.getElementById('recipe-cup-material-group');
    var textContainer = document.getElementById('recipe-cup-text-container');
    var filledPercent = 0;
    recipe.forEach(function(material_obj) {
      var materialColor = Shop.Game.UI.Config.getMaterialColor(material_obj.material);
      // rect
      var layerRect = document.createElementNS(Blockly.SVG_NS, 'rect');
      layerRect.setAttribute('y', filledPercent);
      layerRect.setAttribute('fill', Shop.Game.UI.Config.rgbaToStr(materialColor));
      // layerRect.setAttribute('class', 'recipe-cup-material-layer'); // css width height not working in firefox
      layerRect.setAttribute('width', '100%');
      layerRect.setAttribute('height', '100%');
      materialGroup.appendChild(layerRect);

      // TODO: boba

      // text
      var textColor = Shop.Game.UI.Config.decideTextColor(materialColor); // 'black' or 'white'
      var layerText1 = document.createElementNS(Blockly.SVG_NS, 'text');
      layerText1.setAttribute('class', 'recipe-cup-text recipe-cup-text-' + textColor);
      layerText1.setAttribute('x', '50%');
      layerText1.setAttribute('y', (filledPercent + material_obj.percent / 2) - 4);
      layerText1.textContent = material_obj.text1;

      var layerText2 = document.createElementNS(Blockly.SVG_NS, 'text');
      layerText2.setAttribute('class', 'recipe-cup-text recipe-cup-text-' + textColor);
      layerText2.setAttribute('x', '50%');
      layerText2.setAttribute('y', (filledPercent + material_obj.percent / 2) + 4);
      layerText2.textContent = material_obj.text2;

      textContainer.appendChild(layerText1);
      textContainer.appendChild(layerText2);

      filledPercent += material_obj.percent;
    });
  }
}

Game.initState = function () {
  Game.state = {
    shop: Game.levelConfig.getInitialShopState(),
    robot: {
      holding: null,
      served: [],
    },
    log: [],
  };
};

Game.reset = function () {
  Game.initState();
  Game.UI.reset(Game.state.shop);
};

/**
 * private methods
 */

Game.getRobot = function() {
  return Game.state.robot;
};

Game.errorMessage = function(cmdKey, msgKey) {
  return BlocklyGames.getMsg('DrinkShop_msg_errorIn').replace('%1', BlocklyGames.getMsg(cmdKey)) + '\n'
    // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
    + BlocklyGames.getMsg(msgKey);
};

Game.levelFailedMessage = function(msgKey) {
  return BlocklyGames.getMsg('DrinkShop_msg_levelFailed') + '\n'
    // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
    + BlocklyGames.getMsg(msgKey);
};

Game.spendTime = function(timeSpent) {
  // data
  // Game.state.shop.timeSpent += timeSpent;
  Game.state.shop.remainingTime -= timeSpent;
  // UI
  Game.UI.updateTime(Game.state.shop.remainingTime);
};

Game.earnMoney = function(money) {
  // data
  // Game.state.shop.timeSpent += timeSpent;
  Game.state.shop.money += money;
  // UI
  Game.UI.updateMoney(Game.state.shop.money);
};

// block methods

Game.commands = {};

Game.commands.getNewCup = function(size) {
  // data
  var robot = Game.getRobot();
  robot.holding = {
    class: "cup",
    capacity: 500,
    filled: {},
    filledVolume: 0,
  };
  Game.state.shop.materials.cup -= 1;
  Game.spendTime(Game.constants.robot.actions.getNewCup.timeSpent);

  // UI
  Game.UI.getNewCup(robot.holding);
};

Game.commands.fillCupWith = function(materialName, volume) {
  var robot = Game.getRobot();

  // check error
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding a cup");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_noCup');
  }
  if (!!robot.holding.isCovered) {
    console.log("command error: cup has been covered");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_cupCovered');
  }

  var cup = robot.holding;
  // var volume = cup.capacity; // - cup.filledVolume;

  // error: drink will overflow
  if (volume > cup.capacity - cup.filledVolume) {
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_drinkOverflow');
  }

  Game.spendTime(Game.constants.robot.actions.fillCup.timeSpent);

  if (volume > 0) {
    // data
    if (!cup.filled.hasOwnProperty(materialName)) {
      cup.filled[materialName] = 0;
    }
    cup.filled[materialName] += volume;
    cup.filledVolume += volume;
    // UI
    Game.UI.updateCup(cup);
  }
};

Game.commands.coverCup = function(drink) {
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class !== "cup") {
    console.log("command error: robot not holding cup");
    throw Game.errorMessage('DrinkShop_coverCup', 'DrinkShop_msg_noCup');
  }
  robot.holding.isCovered = true;
  Game.UI.drawCupCap();
  Game.spendTime(Game.constants.robot.actions.coverCup.timeSpent);
};

Game.commands.serve = function() {
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding cup");
    throw Game.errorMessage('DrinkShop_coverCup', 'DrinkShop_msg_noCup');
  }
  robot.served.push(robot.holding);
  robot.holding = null;

  UI.drawHand();
  Game.spendTime(Game.constants.robot.actions.serve.timeSpent);
  Game.earnMoney(20);

  setTimeout(function() {
    UI.cleanWorkspace();
  }, 500);
};
