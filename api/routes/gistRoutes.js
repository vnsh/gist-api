'use strict';

module.exports = function (app) {
    let gists = require('../controllers/gistController');

    app.route('/')
        .get(gists.serverstatus);

    app.route('/user/:userId')
        .get(gists.list_all_gists);

    app.route('/gists')
        .get(gists.starred_gists);

    app.route('/gists/:gistId')
        .get(gists.fetch_gist);

    app.route('/gists/:gistId/star')
        .get(gists.star_gist);

    app.route('/gists/:gistId/unstar')
        .get(gists.unstar_gist);


};
