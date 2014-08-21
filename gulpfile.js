var gulp = require('gulp'),
    path = require('path'),
    tasks = require('require-all')(path.resolve(__dirname, 'tasks'));

Object.keys(tasks).forEach(function(key) {
    tasks[key](gulp);
});