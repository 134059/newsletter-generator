const template = document.getElementById("card-js").getAttribute("data-template");
const reader = [];
const fileInput = [];
const imgThumbnail = [];

for (let i = 0; i < template; i++) {
    //Thumbnail immagini
    reader.push(new FileReader());
    fileInput.push(document.getElementById(`image_${i+1}`));
    imgThumbnail.push(document.getElementById(`image_thumbnail_${i+1}`));

    reader[i].onload = e => {
        imgThumbnail[i].src = e.target.result;
    }
    fileInput[i].addEventListener("change", e => {
        const f = e.target.files[0];
        reader[i].readAsDataURL(f);
    });
}