const mongoose = require('mongoose');
//const express = require('express');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
   email: {
       type: String,
       required: true,
       unique: true,
       trim: true,
       minlength: true
   },
    password: {
       type: String,
        required: true,
        minlength: 5
    }
});

module.exports = mongoose.model('users', UserSchema);