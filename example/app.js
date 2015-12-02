#! /usr/bin/env node
"use strict";

// app init
var express = require("express");
var expressBatchDeep = require("express-batch-deep");
var app = express();

// mounting batch handler
app.use("/api/batch", expressBatchDeep(app));


// mounting ordinary API endpoints
app.get("/api/constants/pi", function apiUserHandler(req, res) {
    res.send(Math.PI);
});

app.get("/api/users/:id", function apiUserHandler(req, res) {
    res.json({
        id: req.params.id,
        name: "Alice"
    });
});

// starting app
app.listen(3000);
