'use strict';

const express = require('express');
const router = express.Router();
const userProvider = require('../providers/user-provider');

router.post('/', (req, res) => {
  const newUser = req.body;
  userProvider.insert(newUser).subscribe((result) => {
    res.status(201).json(result);
  }, (err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  userProvider.getById(id).subscribe((result) => {
    res.status(200).json(result);
  }, (err) => {
    res.status(500).json(err);
  })
});

module.exports = router;
