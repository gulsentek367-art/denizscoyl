const form = document.getElementById("applicationForm");
const successMessage = document.getElementById("successMessage");

const photoInput = document.getElementById("photo");
const videoInput = document.getElementById("video");


// FOTOĞRAF ÖNİZLEME
if (photoInput) {

    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        let preview = document.getElementById("photoPreview");

        if (!preview) {

            preview = document.createElement("img");

            preview.id = "photoPreview";

            preview.style.width = "180px";
            preview.style.height = "180px";
            preview.style.objectFit = "cover";
            preview.style.borderRadius = "12px";
            preview.style.marginTop = "15px";

            this.parentElement.appendChild(preview);
        }

        preview.src = URL.createObjectURL(file);
    });
}


// VİDEO ÖNİZLEME
if (videoInput) {

    videoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        let preview = document.getElementById("videoPreview");

        if (!preview) {

            preview = document.createElement("video");

            preview.id = "videoPreview";

            preview.controls = true;

            preview.style.width = "100%";
            preview.style.maxWidth = "500px";
            preview.style.marginTop = "15px";
            preview.style.borderRadius = "12px";

            this.parentElement.appendChild(preview);
        }

        preview.src = URL.createObjectURL(file);
    });
}


// FORM GÖNDERME
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const photoFile = photoInput?.files[0];

    if (photoFile) {

        const reader = new FileReader();

        reader.onload = function() {

            saveApplication(reader.result);

        };

        reader.readAsDataURL(photoFile);

    } else {

        saveApplication("");

    }
});


function saveApplication(photo) {

    const application = {

        id: "US-" + Date.now(),

        name: document.getElementById("name")?.value || "",
        age: document.getElementById("age")?.value || "",
        birthDate: document.getElementById("birthDate")?.value || "",
        city: document.getElementById("city")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        email: document.getElementById("email")?.value || "",
        gender: document.getElementById("gender")?.value || "",
        height: document.getElementById("height")?.value || "",
        weight: document.getElementById("weight")?.value || "",
        experience: document.getElementById("experience")?.value || "",
        about: document.getElementById("about")?.value || "",

        photo: photo,

        date: new Date().toLocaleString("tr-TR")
    };


    let applications =
        JSON.parse(localStorage.getItem("oyuncuBasvurulari")) || [];


    applications.push(application);


    localStorage.setItem(
        "oyuncuBasvurulari",
        JSON.stringify(applications)
    );


    successMessage.innerHTML = `
        <strong>Başvurunuz başarıyla alındı!</strong>

        <br><br>

        Başvuru Numaranız:

        <strong>${application.id}</strong>
    `;


    successMessage.style.display = "block";


    form.reset();


    const photoPreview =
        document.getElementById("photoPreview");

    const videoPreview =
        document.getElementById("videoPreview");


    if (photoPreview) {
        photoPreview.remove();
    }


    if (videoPreview) {
        videoPreview.remove();
    }


    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}