var DOMInEvidence = (function (window) {

	var doc = window.document,
		PUBLIC = {},
		PRIVATE = {},
		ClassInstance = function () {},
		blocker = null,
		blockerStyle = {
			'background-color': '#000',
			'opacity': '.4',
			'display': 'block',
			'position': 'absolute',
			'top': 0,
			'bottom': 0,
			'left': 0,
			'right': 0,
			'z-index': 998
		},
		target = null,
		targetOldStyle = "",
		targetStyle = {
			'z-index': 999,
			'position': 'relative',
			'box-shadow': '0 1px 15px #333'
		};

	PRIVATE.createBlocker = function () {
		blocker = doc.createElement('div');
		blocker.setAttribute('style', (function (style) {
			var string = "";
			for (var prop in style) {
				string += prop + ': ' + style[prop] + ';';
			}
			return string;
		})(blockerStyle));
		doc.body.appendChild(blocker);
	};

	PRIVATE.destroyBlocker = function () {
		doc.body.removeChild(blocker);
	};

	PRIVATE.extendStyleOptions = function (options) {
		var __options = options || null;
		if ( __options !== null ) {
			for (var prop in __options) {
				targetStyle[prop] = __options[prop];
			}
		}
		return targetStyle;
	};

	PRIVATE.styleObjectToString = function (obj) {
		var string = "";
		for (var prop in targetStyle) {
			string += prop + ': ' + targetStyle[prop] + ';';
		}
		return string;
	};

	PRIVATE.setTarget = function (selector, options) {
		target = doc.querySelector(selector);
		targetOldStyle = target.getAttribute("style") || "";
		var newStyle = PRIVATE.styleObjectToString(PRIVATE.extendStyleOptions(options));
		if (targetOldStyle !== newStyle) {
			newStyle = targetOldStyle + newStyle;
		}
		target.setAttribute("style", newStyle);
	};

	PRIVATE.clearTarget = function () {
		target.setAttribute("style", targetOldStyle);
	};

	PUBLIC.setOpacity = function (newOpacity) {
		var __newOpacity = newOpacity || null;
		if ( __newOpacity !== null ) {
			blockerStyle['opacity'] = __newOpacity;
		}
	};

	PUBLIC.turnon = function (selector, style) {
		PRIVATE.setTarget(selector, style);
		PRIVATE.createBlocker();
	};

	PUBLIC.turnoff = function () {
		PRIVATE.clearTarget();
		PRIVATE.destroyBlocker();
	};

	for (var method in PUBLIC) {
		ClassInstance.prototype[method] = PUBLIC[method];
	}

	return ClassInstance;

})(window);