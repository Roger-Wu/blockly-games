goog.provide('Shop.Game.UI');
goog.require('Shop.Game.UI.Config');
goog.require('Blockly');
goog.require('Shop.utils');
goog.require('goog.graphics.SvgGraphics');

var UI = Shop.Game.UI;

UI.init = function(shopState) {
  UI.drawn = {};
  UI.dom = {}

  UI.dom.workspace = document.getElementById('svg-workspace');
  UI.dom.timeText = document.getElementById('status-time-text');
  UI.dom.moneyText = document.getElementById('status-money-text');

  UI.updateMoney(shopState.money);
  UI.updateTime(shopState.remainingTime);
};

UI.reset = function(shopState) {
  UI.cleanWorkspace();
  UI.drawn = {};

  UI.updateMoney(shopState.money);
  UI.updateTime(shopState.remainingTime);
};

// private

UI.mixNum = function(num1, volume1, num2, volume2) {
  if (volume1 + volume2 == 0) {
    return 0;
  }
  return (num1 * volume1 + num2 * volume2) / (volume1 + volume2);
}

// TODO: less computing
UI.mixAlpha = function(value1, weight1, value2, weight2) {
  if (weight1 + weight2 == 0) {
    return 0;
  }
  var power = 32;
  return Math.pow((Math.pow(value1, power) * weight1 + Math.pow(value2, power) * weight2) / (weight1 + weight2), (1 / power));
}

UI.mixColor = function(color1, weight1, color2, weight2) {
  return {
    r: UI.mixNum(color1.r, weight1 * color1.a, color2.r, weight2 * color2.a),
    g: UI.mixNum(color1.g, weight1 * color1.a, color2.g, weight2 * color2.a),
    b: UI.mixNum(color1.b, weight1 * color1.a, color2.b, weight2 * color2.a),
    a: UI.mixAlpha(color1.a, weight1, color2.a, weight2),
  };
}

UI.drawObject = function(objConfig, parent) {
  // var object = UI.Config[objName];
  var attributes = objConfig.attributes;
  var shape = document.createElementNS(Blockly.SVG_NS, objConfig.element);
  Object.keys(objConfig.attributes).map(function(attributeName) {
    shape.setAttribute(attributeName, objConfig.attributes[attributeName]);
  });
  parent.appendChild(shape);
  return shape;
};

UI.removeChildren = function(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

UI.cleanWorkspace = function() {
  UI.removeChildren(UI.dom.workspace);
};

UI.drawCup = function() {
  UI.dom.workspace.innerHTML = Shop.soy.svgWorkspaceCup({}, null, {});
};

// public API

UI.getNewCup = function(cup) {
  Game.UI.cleanWorkspace();
  Game.UI.drawCup();
};

UI.updateCup = function(cup) {
  // example: cup.filled = {
  //   "boba": 100,
  //   "milk": 160,
  //   "black tea": 240,
  // };

  var totalVolume = 0;
  var liquidColor = {r: 0, g: 0, b: 0, a: 0};
  var liquidVolume = 0; // for mixing color
  var liquidColorWeight = 0; // for mixing color

  var solidMaterials = [];

  Object.keys(cup.filled).forEach(function(materialName) {
    var materialConfig = UI.Config.materialConfigs[materialName];

    if (!materialConfig) {
      console.warn("warning: material \"", materialName , "\" doesn't exist in UI.Config.materialConfigs.");
      return;
    }

    var materialVolume = cup.filled[materialName];
    var materialColor = materialConfig.color;
    var materialColorWeight = materialConfig.colorWeight;

    totalVolume += materialVolume;

    if (materialConfig.state === "liquid") {
      liquidColor = UI.mixColor(liquidColor, liquidVolume * liquidColorWeight, materialColor, materialVolume * materialColorWeight);
      liquidColorWeight = UI.mixNum(liquidColorWeight, liquidVolume, materialColorWeight, materialVolume);
      liquidVolume += materialVolume;
    }
    else if (materialConfig.state === "solid") {
      solidMaterials.push({
        'name': materialName,
        'volume': materialVolume,
      })
    }
  });

  var materialGroup = document.getElementById('workspace-cup-material-group');
  UI.removeChildren(materialGroup);

  // liquid
  var layerRect = document.createElementNS(Blockly.SVG_NS, 'rect');
  layerRect.setAttribute('y', 100 * (cup.capacity - totalVolume) / cup.capacity);
  layerRect.setAttribute('fill', UI.Config.rgbaToStr(liquidColor));
  layerRect.setAttribute('width', '100%');
  layerRect.setAttribute('height', '100%');
  materialGroup.appendChild(layerRect);

  // solid, only for boba
  if (solidMaterials.length) {
    var solidMaterial = solidMaterials[0];
    var color = UI.Config.materialConfigs[solidMaterial.name].color;
    var colorStr = UI.Config.rgbaToStr(color)
    var layerRect = document.createElementNS(Blockly.SVG_NS, 'rect');
    var y = 100 * (cup.capacity - solidMaterial.volume) / cup.capacity;
    layerRect.setAttribute('y', y);
    layerRect.setAttribute('fill', colorStr);
    layerRect.setAttribute('width', '100%');
    layerRect.setAttribute('height', '100%');
    materialGroup.appendChild(layerRect);

    // <circle cx="28" cy="83" r="5" fill="#200000" />
    cxs = [0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80];
    dcys = [2, 0, 1, 0, -2, -1, -2, -1, 0, 1, 2];
    for (var i = 0; i < cxs.length; i++) {
      var cx = cxs[i];
      var dcy = dcys[i];
      var boba = document.createElementNS(Blockly.SVG_NS, 'circle');
      boba.setAttribute('fill', colorStr);
      boba.setAttribute('r', 5);
      boba.setAttribute('cx', cx);
      boba.setAttribute('cy', y + dcy);
      materialGroup.appendChild(boba);
    }
  }
};

UI.drawCupCap = function(color) {
  document.getElementById('workspace-cup-cap').style.display = "block";
};

UI.drawHand = function() {
  UI.drawObject(UI.Config.hand, UI.dom.workspace);
};

UI.drawTimeMoney = function() {
  UI.drawObject(UI.Config.hand, UI.dom.workspace);
};

UI.updateTime = function (time) {
  UI.dom.timeText.textContent = time;
};

UI.updateMoney = function (money) {
  UI.dom.moneyText.textContent = money;
};