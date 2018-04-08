"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @flow
var React = require("react");
var ReactDom = require("react-dom");
var ApplicationView = require("module/as_manager/application");
function asApp() {
    ReactDom.render(React.createElement(ApplicationView, null), document.getElementById('jsMain'));
}
exports.asApp = asApp;
