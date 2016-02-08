exports.amplify = function(gain) {
  return function(sample) {
    return sample * gain;
  };
};

exports.ushort = function(sample) {
  return String.fromCharCode(255 & sample,
    255 & sample >> 8);
};

exports.ulong = function(sample) {
  return String.fromCharCode(255 & sample,
    255 & sample >> 8,
    255 & sample >> 16,
    255 & sample >> 24);
};

exports.gcd = function(a, b) {
  while (b) {
    var a_ = a;
    a = b, b = a_ % b;
  }
  return a;
};

exports.lcm = function(a, b) {
  return Math.floor(a * b / exports.gcd(a, b));
};

exports.compose = function(fns) {
  return function(a) {
    for (var i = 0; i < fns.length; i++) {
      a = fns[i](a);
    }
    return a;
  };
};

exports.map = function(fn, items) {
  var result = [];
  for (var i = 0; i < items.length; i++) {
    result.push(fn.call(this, items[i]));
  }
  return result;
};

exports.getattr = function(attr) {
  return function(items) {
    return items[attr];
  };
};

exports.zip = function() {
  if (arguments.length == 0) return [];
  var lists = Array.prototype.slice.call(arguments);
  var result = [];
  var min = Math.min.apply(null, exports.map(exports.getattr("length"), lists));
  for (var i = 0; i < min; i++) {
    result.push(exports.map(exports.getattr(i), lists));
  }
  return result;
};

exports.sum = function(numbers) {
  return exports.foldl(function(a, b) {
    return a + b;
  }, numbers);
};

exports.bind = function(ctx, fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return fn.apply(ctx, args);
  };
};

exports.foldl = function(fn, items) {
  if (items.length == 1) return items[0];
  var result = fn(items[0], items[1]);
  for (var i = 2; i < items.length; i++) {
    result = fn(result, items[i]);
  }
  return result;
};

exports.mulmod = function(a, b, c) {
  return (a * b) % c;
};

exports.range = function(len) {
  var result = [];
  for (var i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
};
