SVG.Sheet = function() {
	var element = SVG.create('style');
  this.constructor.call(this, element);
	this.attr('type', 'text/css');
  this._styles = {};
}

// Inherit from SVG.Shape
SVG.Sheet.prototype = new SVG.Container

SVG.extend(SVG.Sheet, {
	// Create dash-case version of a string (style sheet properties)
	dashcase: function (word) {
		return word.replace(/[A-Z]/g, function (match, index, source) { 
			return "-" + match.toLowerCase();
		})
	}
,	clone: function(object) {
		var that = this;

		if (typeof object !== 'object' || !object) { return object; }
		return Object.getOwnPropertyNames(object).reduce(function (acc, key) {
			acc[key] = that.clone(object[key]);
			return acc;
		}, {});
	}
,	style: function(selector, attribute, value){
		if (typeof selector === "string") {
			if (typeof attribute == "string") {
				var group = this._styles[selector] || (this._styles[selector] = {});

				if (typeof value === undefined || typeof value === null) {
					delete group[attribute];
				} else {
					group[attribute] = value;
				}
			} else {
				this._styles[selector] = this.clone(attribute);
			}
		} else {
			this._styles = this.clone(selector);
		}
		this.render();
	}
,	render: function() {
		var that = this;
		this.node.textContent = 
		
		Object.getOwnPropertyNames(this._styles).map(function (selector) {
			var style = that._styles[selector];
			var properties = Object.getOwnPropertyNames(style).map(function (property) {
				return that.dashcase(property) + ": " + style[property];
			});

			return selector + " { " + properties.join(";\n") + " } ";
		}).join("\n");
	}
, clear: function() {
		this._styles = {};
		this.node.textContent = '';
	}
})

//
SVG.extend(SVG.Container, {
  // Create a rect element
  sheet: function() {
    return this.put(new SVG.Sheet())
  }
})
