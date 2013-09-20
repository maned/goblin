/*  Goblin's Authentication Module
    Copyright (C) 2013  Sotirios Vrachas <sotirios@vrachas.net>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var config = require('./config.js')

//check if client is logged in
exports.check = function authCheck(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}
//receives username and password throw http post request
exports.login = function (req, res) {
    var post = req.body
    if (post.username == config.goblinUsername && post.password == config.goblinPassword) {
        req.session.user = true
        res.redirect('/gb-admin/edit')
    } else {
        res.redirect('/login')
    }
}
//clear cookies 
exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
}