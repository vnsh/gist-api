'use strict';

const axios = require('axios').default;
const baseURL = "https://api.github.com/";
const instance = axios.create({ baseURL: baseURL, timeout: 5000})
let knex = require('../../knex_init').knex;


exports.serverstatus = function (req, res) {
    res.send("Server is up :)")
}


exports.list_all_gists = function (req, res) {
    if (!req.params.userId || req.params.userId === '') {
        res.send("Please enter username to fetch public gists").status(404);
    }
    let complete_url = "/users/" + req.params.userId + "/gists";
    instance.get(complete_url).then((response) => {
        res.send(response.data);
    }).catch((err) => {
        res.status(err.response.status).send(err.response.data);
    })
};

exports.fetch_gist = function (req, res) {
    if (!req.params.gistId || req.params.gistId === '') {
        res.send("Please enter gistId to fetch gist data").status(404);
    }
    let complete_url = "/gists/" + req.params.gistId;
    instance.get(complete_url).then((response) => {
        res.send(response.data);
    }).catch((err) => {
        res.status(err.response.status).send(err.response.data);
    })
};

exports.star_gist = function (req, res) {
    if (!req.params.gistId || req.params.gistId === '') {
        res.send("Please enter gistId to star").status(404);
    }

    //validate if the gist exists 
    let complete_url = "gists/" + req.params.gistId;
    instance.get(complete_url).then(() => {
        knex('stars').insert({ gist: baseURL + complete_url })
            .then((id) => {
                //get user by id
                knex('stars')
                    .select({
                        id: 'id',
                        gist: 'gist'
                    })
                    .where({ id })
                    .then((response) => {
                        return res.json(response[0]);
                    })
            })
            .catch((err) => {
                if (err.errno === 19) {
                    return res.status(400).json({ success: false, message: 'Gist already starred' });
                }
                return res.status(500).json({ success: false, message: 'An error occurred, please try again later.' });
            });

    }).catch((err) => {
        res.status(err.response.status).send("Gist not found");
    })
}

exports.unstar_gist = function (req, res) {
    if (!req.params.gistId || req.params.gistId === '') {
        res.send("Please enter gistId to star").status(404);
    }

    let gistId = req.params.gistId
    let del_quer = baseURL + "gists/" + gistId
    knex('stars')
        .where({ gist: del_quer })
        .del()
        .then((response) => {
            if(response === 0){
                return res.status(404).json({ success: false, message: 'Gist not found' });
            }else if(response === 1){
                return res.status(201).json({ success: true, message: 'Gist unstarred' });
            }
            return res.status(500).json(response);
        })

}

exports.starred_gists = function (req, res) {
    knex('stars')
        .select({
            id: 'id',
            gist: 'gist',
            created : 'created_at'
        })
        .then((response) => {
            return res.json(response);
        }).catch((err)=>{
            return res.status(500).json({ success: false, message: err });
        })
}