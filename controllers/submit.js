const models = require('../models');
const tools  = require('./tools');

//Submit a new newsletter
exports.submit_new = function(req, res, next) {
	const obj = tools.fillObject(req, true);
	tools.manageImages(req, obj, "public/images/uploads/"+obj.id+"/");
	tools.uploadNewsletter(obj);
	tools.generateHTMLTemplate("public/tmp/index.html", obj);
	setTimeout(function() {
		res.redirect("/newsletter/"+obj.id);
	}, 100);
};

//Submit an edit of an existing newsletter
exports.submit_edited = function(req, res, next) {
    models.Newsletters.findOne({
        where: {
            id: req.params.newsletter_id
        }
    }).then(db_result => {
		const obj = tools.fillObject(db_result, false);
		tools.manageImages(req, obj, "public/images/uploads/"+obj.id+"/");
		tools.updateNewsletter(obj);
		tools.generateHTMLTemplate("public/tmp/index.html", obj);

		setTimeout(function() {
			res.redirect("/newsletter/"+obj.id);
		}, 100);
    });
};