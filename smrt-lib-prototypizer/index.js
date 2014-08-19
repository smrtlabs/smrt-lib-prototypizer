#!/usr/bin/env node

"use strict";

var app,
    path = require("path"),
    baseDirname,
    express = require("express"),
    swig = require("swig");

if (process.argv[2]) {
    baseDirname = process.argv[2];
    baseDirname = path.resolve(baseDirname);
} else {
    baseDirname = process.cwd();
}

swig.setDefaults({
    "cache": false
});

app = express();

app.engine("twig", swig.renderFile);

app.set("views", baseDirname + "/views");
app.set("view cache", false);
app.set("view engine", "twig");

app.use("/public", express.static(baseDirname + "/public"));

app.get("*", function (req, res) {
    res.render(req.path.substr(1) || "index", {
        "asset": function (assetPath) {
            return "/public/" + assetPath;
        }
    });
});

app.listen(3000);

console.log("Server is listening at :3000");
console.log("Serving website from %s", baseDirname);
