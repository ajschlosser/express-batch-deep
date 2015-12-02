#! /usr/bin/env node
"use strict";

// app init
var express = require("express");
var expressBatchDeep = require("express-batch-deep");
var app = express();

// mounting batch handler
var options = {
    returnHeaders: true
};
app.use("/api/batch", expressBatchDeep(app, options));


// mounting ordinary API endpoints
app.get("/api/constants/pi", function apiUserHandler(req, res) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send(Math.PI);
});

app.get("/api/users/:id", function apiUserHandler(req, res) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({
        id: req.params.id,
        name: "Alice"
    });
});

// starting app
app.listen(3000);
