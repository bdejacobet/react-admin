"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var Url = require("url");
var Request = require("superagent");
var _ = require("lodash");

var EndPoint = function (baseurl, headers) {
  var url = Url.parse(baseurl);
  var headers = headers || {};

  this.get = function () {
    var suffix, query, func;
    var _ref = getParameters(arguments);

    var _ref2 = _slicedToArray(_ref, 3);

    suffix = _ref2[0];
    query = _ref2[1];
    func = _ref2[2];


    buildRequest(Request.get(buildUrl(suffix, query))).end(func ? func : defaultHandler);
  };

  this.del = function () {
    var suffix, query, func;
    var _ref = getParameters(arguments);

    var _ref2 = _slicedToArray(_ref, 3);

    suffix = _ref2[0];
    query = _ref2[1];
    func = _ref2[2];


    buildRequest(Request.del(buildUrl(suffix, query))).end(func ? func : defaultHandler);
  };

  this.post = function () {
    var suffix, query, params, func;
    var _ref = dataParameters(arguments);

    var _ref2 = _slicedToArray(_ref, 4);

    suffix = _ref2[0];
    query = _ref2[1];
    params = _ref2[2];
    func = _ref2[3];


    buildRequest(Request.post(buildUrl(suffix, query))).send(params).end(func ? func : defaultHandler);
  };

  this.put = function () {
    var suffix, query, params, func;
    var _ref = dataParameters(arguments);

    var _ref2 = _slicedToArray(_ref, 4);

    suffix = _ref2[0];
    query = _ref2[1];
    params = _ref2[2];
    func = _ref2[3];


    buildRequest(Request.put(buildUrl(suffix, query))).send(params).end(func ? func : defaultHandler);
  };

  function getParameters(args) {
    var suffix = "";
    var query = {};
    var func = false;

    if (args.length == 1 && typeof args[0] == "function") {
      func = args[0];
    }

    if (args.length == 2) {
      if (typeof args[0] == "object" && typeof args[1] == "function") {
        query = args[0];
        func = args[1];
      }

      if (typeof args[0] == "string" && typeof args[1] == "function") {
        suffix = args[0];
        func = args[1];
      }
    }

    if (args.length == 3) {
      suffix = args[0];
      query = args[1];
      func = args[2];
    }

    return [suffix, query, func];
  }

  function dataParameters(args) {
    var suffix = "";
    var query = {};
    var params = {};
    var func = false;

    if (args.length == 1 && typeof args[0] == "function") {
      func = args[0];
    }

    if (args.length == 2) {
      if (typeof args[0] == "object" && typeof args[1] == "function") {
        params = args[0];
        func = args[1];
      }

      if (typeof args[0] == "string" && typeof args[1] == "function") {
        suffix = args[0];
        func = args[1];
      }
    }

    if (args.length == 3) {
      if (typeof args[0] == "object" && typeof args[1] == "object" && typeof args[2] == "function") {
        query = args[0];
        params = args[2];
        func = args[3];
      }

      if (typeof args[0] == "string" && typeof args[1] == "object" && typeof args[2] == "function") {
        suffix = args[0];
        params = args[1];
        func = args[2];
      }
    }

    if (args.length == 4) {
      suffix = args[0];
      query = args[1];
      params = args[2];
      func = args[3];
    }

    return [suffix, query, params, func];
  }

  function buildUrl(suffix, query) {
    var baseurl = _.merge({}, url);
    baseurl.pathname += suffix;
    baseurl.query = _.merge({}, baseurl.query, query || {});

    return Url.format(baseurl);
  }

  function buildRequest(request) {
    _(headers).forEach(function (v, k) {
      request.set(k, v);
    });

    return request;
  }

  function defaultHandler(error, response) {
    console.log("error", error);
    console.log("res", res);
  }

  return this;
};

module.exports = EndPoint;