require('dotenv').config();

module.exports = function (app) {
    let gists = require('../controllers/gistController');

    let version = '/' + process.env.API_VERSION;
    let gist_base_url = version + '/gists';

    app.route(version + '/')
        .get(gists.serverstatus);

    app.route(version + '/user/:userId')
        .get(gists.list_all_gists);

    app.route(gist_base_url + '/:gistId')
        .get(gists.fetch_gist);

    app.route(gist_base_url + '/:gistId/star')
        .get(gists.star_gist);

    app.route(gist_base_url + '/:gistId/unstar')
        .get(gists.unstar_gist);

    app.route(gist_base_url)
        .get(gists.starred_gists);


};
