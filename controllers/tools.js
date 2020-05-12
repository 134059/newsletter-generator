const pug    = require('pug');
const fs     = require('fs-extra');
const uuid   = require('uuid');
const models = require('../models');

module.exports = {
    //Createss a new row in database
    uploadNewsletter: function(obj) {
        if (obj.template == 1) {
            models.Newsletters.create({
                id: obj.id,
                template: obj.template,
                updatedAt: "-",
        
                image_1: obj.data[0].image,
                title_1: obj.data[0].title,
                abstract_1: obj.data[0].abstract,
                link_1: obj.data[0].link,
        
                image_2: null, title_2: null, abstract_2: null, link_2: null,
                image_3: null, title_3: null, abstract_3: null, link_3: null
            });
        } else if (obj.template == 3) {
            models.Newsletters.create({
                id: obj.id,
                template: obj.template,
                updatedAt: "-",
        
                image_1: obj.data[0].image,
                title_1: obj.data[0].title,
                abstract_1: obj.data[0].abstract,
                link_1: obj.data[0].link,
        
                image_2: obj.data[1].image,
                title_2: obj.data[1].title,
                abstract_2: obj.data[1].abstract,
                link_2: obj.data[1].link,
        
                image_3: obj.data[2].image,
                title_3: obj.data[2].title,
                abstract_3: obj.data[2].abstract,
                link_3: obj.data[2].link,
            });
        }
    },
    
    //Updates an existing row in database
    updateNewsletter: function(obj) {
        if (obj.template == 1) {
            models.Newsletters.update({
                image_1: obj.data[0].image,
                title_1: obj.data[0].title,
                abstract_1: obj.data[0].abstract,
                link_1: obj.data[0].link,
            }, {
                where: {
                    id: obj.id
                }
            });
        } else if (obj.template == 3) {
            models.Newsletters.update({
                image_1: obj.data[0].image,
                title_1: obj.data[0].title,
                abstract_1: obj.data[0].abstract,
                link_1: obj.data[0].link,
        
                image_2: obj.data[1].image,
                title_2: obj.data[1].title,
                abstract_2: obj.data[1].abstract,
                link_2: obj.data[1].link,
        
                image_3: obj.data[2].image,
                title_3: obj.data[2].title,
                abstract_3: obj.data[2].abstract,
                link_3: obj.data[2].link,
            }, {
                where: {
                    id: obj.id
                }
            });
        }
    },

    //Returns a helper object with properties of a fetched newsletter from db
    convertDbResultToDbObj: function(db_obj) {
        const obj = {
            id: db_obj.id,
            template: db_obj.template,
            isNew: false,
            data: []
        };

        for (let i = 1; i <= obj.template; i++) {
            obj.data[i-1] = {
                image: db_obj[`image_${i}`],
                title: db_obj[`title_${i}`],
                abstract: db_obj[`abstract_${i}`],
                link: db_obj[`link_${i}`]
            };
        }
        return obj;
    },

    //Returns a helper object with properties of a new newsletter
    initDbObj: function(amount) {
        const obj = {
            id: "",
            template: amount,
            isNew: true,
            data: []
        };

        for (let i = 0; i < obj.template; i++) {
            obj.data[i] = {image: "", title: "", abstract: "", link: ""};
        }

        return obj;
    },

    //Generates a folder of uploaded images and HTML file (if exists already, will be overridden)
    generateOutput: function(obj) {
        fs.copySync("public/images/static/", "public/tmp/images/static/");
        fs.emptyDirSync("public/tmp/images/uploads/");
        fs.copySync("public/images/uploads/"+obj.id+"/", "public/tmp/images/uploads/"+obj.id+"/");
        this.generateHTMLTemplate("public/tmp/index.html", obj);
    },

    //Renders the newsletter into an HTML file
    generateHTMLTemplate: function(destination, obj) {
        fs.outputFileSync(destination, pug.renderFile("views/newsletter/template.pug", {newsletter: obj}), function(err) {
            if (err) return console.log("Errore: ", err);
        });
    },

    //Deletes a folder
    deleteFolder: function(dir) {
        fs.remove(dir);
    },

    //Returns a helper object filled with the data coming from the origin
    fillObject: function(origin, isNew) {
		const obj = {
			id: isNew?uuid.v4():origin.id,
			template: isNew?new URLSearchParams(new URL(origin.headers.referer).search).get("template"):origin.template,
			isNew: isNew,
			data: []
		};

		for (let i = 1; i <= obj.template; i++) {
			obj.data[i-1] = {
				image: isNew ? origin.files[`image_${i}`].name : origin[`image_${i}`],
				title: isNew ? origin.body[`title_${i}`] : origin[`title_${i}`],
				abstract: isNew ? origin.body[`abstract_${i}`] : origin[`abstract_${i}`],
				link: isNew ? origin.body[`link_${i}`] : origin[`link_${i}`]
			};
		}

		return obj;
    },

    //Manages images on upload/update of a newsletter
    manageImages: function(origin, obj, destinationFolder) {
        const submitted_images = [];

        //Makes sure the destinationFolder exists. If it doesn't, it gets created
        fs.ensureDirSync(destinationFolder);
        for (let i = 0; i < obj.template; i++) {
            //Adding new submitted images into destination folder and assign names to array
            try {
                submitted_images[i] = origin.files[`image_${i + 1}`];
                this.uploadImage(submitted_images[i], destinationFolder);
            } catch(err) {
                //Keep the old image otherwise
                submitted_images[i] = {
                    name: obj.data[i].image
                };
            }
        }

        //If the helper object represents an already existing newsletter, it gets updated with the new images' names
        if (!obj.isNew) {
            const image_names = submitted_images.map(function(obj) {return obj.name;});
            this.deleteOldImages(image_names, destinationFolder);
    
            for (let i = 1; i <= obj.template; i++) {
                obj.data[i-1] = {
                    image: image_names[i-1],
                    title: origin.body[`title_${i}`],
                    abstract: origin.body[`abstract_${i}`],
                    link: origin.body[`link_${i}`]
                };
            }
        }
    },

    //Uploads an image of 'imgFileArr' to a 'dir' folder
    uploadImage: function(imgFileArr, dir) {
        imgFileArr.mv(dir+imgFileArr.name, function(error) {
            if (error) {
                console.log("Errore nel salvataggio dell'immagine " + imgFileArr.name + ".");
            }
        });
    },
    
    //Deletes the images a newsletter doesn't need anymore
    deleteOldImages: function(imgNameArr, dir) {
        fs.readdirSync(dir).forEach(file => {
            if (!imgNameArr.includes(file)) {
                fs.removeSync(dir+file);
            }
        });
    },
    
    //Returns the formatted current date
    getFormattedDate: function(obj) {
        const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
        let month = monthNames[obj.getMonth()];
        let day = String(obj.getDate()).padStart(2, '0');
        let year = obj.getFullYear();
        let time = obj.toLocaleTimeString().replace(/:/g,'.');
        return day+" "+month+" "+year+" ("+time+")";
    }
};