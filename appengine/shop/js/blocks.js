/**
 * Self-Defined Blocks
 */

'use strict';

goog.provide('Shop.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');

// goog.require('Blockly.Blocks.colour');  // Deprecated
// goog.require('Blockly.Constants.Colour');
// goog.require('Blockly.JavaScript.colour');

// goog.require('Blockly.Blocks.lists');  // Deprecated
// goog.require('Blockly.Constants.Lists');
// goog.require('Blockly.JavaScript.lists');

// goog.require('Blockly.Blocks.logic');  // Deprecated
// goog.require('Blockly.Constants.Logic');
// goog.require('Blockly.JavaScript.logic');

// goog.require('Blockly.Blocks.loops');  // Deprecated
// goog.require('Blockly.Constants.Loops');
// goog.require('Blockly.JavaScript.loops');

goog.require('Blockly.Blocks.math');  // Deprecated
goog.require('Blockly.Constants.Math');
goog.require('Blockly.JavaScript.math');

// goog.require('Blockly.Blocks.procedures');
// goog.require('Blockly.JavaScript.procedures');

goog.require('Blockly.Blocks.texts');  // Deprecated
goog.require('Blockly.Constants.Text');
goog.require('Blockly.JavaScript.texts');

// goog.require('Blockly.Blocks.variables');  // Deprecated.
// goog.require('Blockly.Constants.Variables');
// goog.require('Blockly.JavaScript.variables');


var Scope_Blocks = Shop.Blocks;

/**
 * Common HSV hue
 */
Scope_Blocks.MOVEMENT_HUE = 290;
Scope_Blocks.LOOPS_HUE = 120;
Scope_Blocks.LOGIC_HUE = 210;

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['DrinkShop_getNewCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_getNewCup'),
      "args0": [
        {
          "type": "input_value",
          "name": "SIZE",
          "check": "String"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_getNewCup')
    });
  }
}
Blockly.JavaScript['DrinkShop_getNewCup'] = function(block) {
  var size = Blockly.JavaScript.valueToCode(block, 'SIZE',
  Blockly.JavaScript.ORDER_ATOMIC) || '';
  var code = 'getNewCup(' + size + ');\n';
  return code;
};

Blockly.Blocks['DrinkShop_size'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SIZE",
          "options": [
            [ BlocklyGames.getMsg('DrinkShop_small'), "small" ],
            [ BlocklyGames.getMsg('DrinkShop_medium'), "medium" ],
            [ BlocklyGames.getMsg('DrinkShop_large'), "large" ],
          ]
        },
      ],
      "output": "String",
      "colour": Blockly.Constants.Text.HUE,
      "tooltip": "",
    });
  }
}
Blockly.JavaScript['DrinkShop_size'] = function(block) {
  var size = block.getFieldValue('SIZE');
  var code = '"' + size + '"';
  var order = Blockly.JavaScript.ORDER_ATOMIC;
  return [code, order];
};

Blockly.Blocks['DrinkShop_fillCupWith'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_fillCupWith'),
      "args0": [
        {
          "type": "input_value",
          "name": "MATERIAL",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "VOLUME",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_fillCupWith'),
    });
  }
}
Blockly.JavaScript['DrinkShop_fillCupWith'] = function(block) {
  var material = Blockly.JavaScript.valueToCode(block, 'MATERIAL', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var volume = Blockly.JavaScript.valueToCode(block, 'VOLUME', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  return 'fillCupWith(' + material + ', ' + volume + ');\n';
};

Blockly.Blocks['DrinkShop_material'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "MATERIAL",
          "options": [
            [ BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea" ],
            [ BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea" ],
            [ BlocklyGames.getMsg('DrinkShop_milk'), "milk" ],
            [ BlocklyGames.getMsg('DrinkShop_boba'), "boba" ],
            // [ BlocklyGames.getMsg('DrinkShop_ice'), "ice" ],
          ]
        },
      ],
      "output": "String",
      "colour": Blockly.Constants.Text.HUE,
      "tooltip": "",
    });
  }
}
Blockly.JavaScript['DrinkShop_material'] = function(block) {
  var material = block.getFieldValue('MATERIAL');
  var code = '"' + material + '"';
  var order = Blockly.JavaScript.ORDER_ATOMIC;
  return [code, order];
};

// bg: black tea, green tea
Blockly.Blocks['DrinkShop_material_bg'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "MATERIAL",
          "options": [
            [ BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea" ],
            [ BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea" ],
          ]
        },
      ],
      "output": "String",
      "colour": Blockly.Constants.Text.HUE,
      "tooltip": "",
    });
  }
}
Blockly.JavaScript['DrinkShop_material_bg'] = Blockly.JavaScript['DrinkShop_material'];

// bgm: black tea, green tea, milk
Blockly.Blocks['DrinkShop_material_bgm'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "MATERIAL",
          "options": [
            [ BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea" ],
            [ BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea" ],
            [ BlocklyGames.getMsg('DrinkShop_milk'), "milk" ],
          ]
        },
      ],
      "output": "String",
      "colour": Blockly.Constants.Text.HUE,
      "tooltip": "",
    });
  }
}
Blockly.JavaScript['DrinkShop_material_bgm'] = Blockly.JavaScript['DrinkShop_material'];


Blockly.Blocks['DrinkShop_coverCup'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_coverCup'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_coverCup')
    });
  }
}
Blockly.JavaScript['DrinkShop_coverCup'] = function(block) {
  return 'coverCup();\n';
};

Blockly.Blocks['DrinkShop_serve'] = {
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('DrinkShop_serve'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Scope_Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('DrinkShop_serve')
    });
  }
}
Blockly.JavaScript['DrinkShop_serve'] = function(block) {
  return 'serve();\n';
};

Blockly.Blocks['DrinkShop_percent'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "PERCENT",
          "options": [
            ["0%", "0"],
            ["10%", "0.1"],
            ["20%", "0.2"],
            ["30%", "0.3"],
            ["40%", "0.4"],
            ["50%", "0.5"],
            ["60%", "0.6"],
            ["70%", "0.7"],
            ["80%", "0.8"],
            ["90%", "0.9"],
            ["100%", "1"],
          ]
        },
      ],
      "output": "Number",
      "colour": Blockly.Constants.Math.HUE,
      "tooltip": "",
    });
  }
}
Blockly.JavaScript['DrinkShop_percent'] = function(block) {
  var percent = block.getFieldValue('PERCENT');
  console.log(percent);
  return percent;
};