
SVG.Document = function Document(e) {
  this.constructor.call(this, SVG.create('svg'));
  
  this.attr('xmlns', SVG.ns);
  this.attr('version', '1.1');
  this.attr('xlink', SVG.xlink, SVG.ns);
  
  if (typeof e == 'string')
    e = document.getElementById(e);
  
  e.appendChild(this.node);
};

// inherit from SVG.Element
SVG.Document.prototype = new SVG.Element();

// include the container object
SVG.Utils.merge(SVG.Document, SVG.Container);