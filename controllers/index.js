const models = require('../models');
const tools  = require('./tools');

//Load index page
exports.landing = function(req, res, next) {
    models.Newsletters.findAll({
        order: [
            ['updatedAt', 'DESC'],
            ['createdAt', 'DESC']
        ]
    }).then(db_result => {
        res.render('index', {title: "Newsletter Generator", subtitle: "Dashboard", newsletters_archive: db_result});
    });
}

//Load form page for a new newsletter
exports.init_newsletter = function(req, res, next) {
    res.render("form", {title: "Newsletter Generator", subtitle: "Form", db_obj: tools.initDbObj(req.query.template)});
}

//Load form page to edit an existing newsletter
exports.edit_newsletter = function(req, res, next) {
    models.Newsletters.findOne({
        where: {
            id: req.params.newsletter_id
        }
    }).then(db_result => {
        res.render("form", {title: "Newsletter Generator", subtitle: "Form", db_obj: tools.convertDbResultToDbObj(db_result)});
    });
}

//Load preview page to show a newsletter
exports.show_newsletter = function(req, res, next) {
    models.Newsletters.findOne({
        where: {
            id: req.params.newsletter_id
        }
    }).then(db_result => {
        const db_obj = tools.convertDbResultToDbObj(db_result);
        tools.generateOutput(db_obj);

        res.render("preview", {title: "Newsletter Generator", subtitle: "Preview", newsletter: db_result});
    });
}

//Delete an existing newsletter
exports.delete_newsletter = function(req, res, next) {
    models.Newsletters.destroy({
        where: {
            id: req.params.newsletter_id
        }
    }).then(db_result => {
        //Delete image folder related to the deleted newsletter
        tools.deleteFolder("public/images/uploads/"+req.params.newsletter_id+"/");
        res.redirect('/');
    });
}

//Download an existing newsletter
exports.download_newsletter = function(req, res, next) {
    models.Newsletters.findOne({
        where: {
            id: req.params.newsletter_id
        }
    }).then(db_result => {
        const db_obj = tools.convertDbResultToDbObj(db_result);
        tools.generateOutput(db_obj);

        res.zip({
            files: [{path: "public/tmp/", name: `Newsletter ${tools.getFormattedDate(db_result.createdAt)}`}],
            filename: `Newsletter ${tools.getFormattedDate(db_result.createdAt)}.zip`
        });
    });
}