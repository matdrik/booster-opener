const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const key = require('../config/keys').secret;

/**
* @route POST api/users/register
* @desc Регистрация
* @access Public
*/
router.post('/register', (req, res) => {
    let {
        username,
        password,
        confirm_password,
        money,
        colls
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Пароли не совпадают"
        });
    }
    // Проверить username на уникальность

    // ОШИБКА: после проверки, в любом случае регистрируется пользователь
    User.findOne({
        username: username
    }).then(user => {
        if (user) {
            return res.status(400).json({
                msg: "Логин уже занят"
            });
        }
    })
    // Добавить новый документ (пользователя) в БД
    let newUser = new User({
        username,
        password,
        money,
        colls
    });
    // Захэшировать пароль
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "Пользователь зарегистрирован"
                });
            });
        });
    });
});

/**
* @route PUT api/users/userUpdate
* @desc Обновление пользователя
* @access Private
*/
 router.put('/userUpdate', (req, res) => {
    User.findByIdAndUpdate(req.body._id, {$set:{money:req.body.money, colls:req.body.colls}}, function(err) {
        if(err) return console.log(err);
    });
    res.json({state: 'updated'});
 });

/**
 * @route POST api/users/login
 * @desc Авторизация
 * @access Public
 */
router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {
            return res.status(404).json({
                msg: "Проверьте логин",
                success: false
            });
        }
        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: user._id,
                    username: user.username
                }
                jwt.sign(payload, key, {
                    expiresIn: 86400
                }, (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: user,
                        msg: "Пользователь авторизирован"
                    });
                })
            } else {
                return res.status(404).json({
                    msg: "Проверьте пароль",
                    success: false
                });
            }
        })
    });
});

/**
 * @route POST api/users/profile
 * @desc Получить пользователя
 * @access Private
 */
router.get('/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    return res.json({
        user: req.user
    });
});

module.exports = router;