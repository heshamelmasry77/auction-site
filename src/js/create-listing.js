const createListingForm = document.querySelector("#create-listing-form");

const listingTitle = document.querySelector("#listingTitle");
const listDescription = document.querySelector("#listDescription");
const listTagOne = document.querySelector("#listTagOne");
const listTagTwo = document.querySelector("#listTagTwo");
const listTagThree = document.querySelector("#listTagThree");
const listImgOne = document.querySelector("#listImgOne");
const listImgTwo = document.querySelector("#listImgTwo");
const listImgThree = document.querySelector("#listImgThree");
const listingEndDate = document.querySelector("#listingEndDate");


createListingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("i clicked the form BTN");
    console.log(listingTitle.value.trim())
    console.log(listDescription.value.trim())

    console.log(listTagOne.value.trim())
    console.log(listTagTwo.value.trim())
    console.log(listTagThree.value.trim())

    console.log(listImgOne.value.trim())
    console.log(listImgTwo.value.trim())
    console.log(listImgThree.value.trim())

    console.log(listingEndDate.value)

    const listingTags = [listTagOne.value, listTagTwo.value, listTagThree.value];
    const listingImages = [listImgOne.value, listImgTwo.value, listImgThree.value];

    const listingData = {
        "title": listingTitle.value.trim(),
        "description": listDescription.value.trim(),
        "tags": listingTags,
        "media": listingImages.length > 0 ? listingImages : null,
        "endsAt": listingEndDate.value
    }
    console.log("listingData: ", listingData);

    async function createListing() {
        const response = await fetch("https://api.noroff.dev/api/v1/auction/listings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxLCJuYW1lIjoiaGVzaGFtZWxtYXNyeTc3IiwiZW1haWwiOiJoZXNoYW1lbG1hc3J5NzdAbm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJjcmVkaXRzIjoxMDAwLCJ3aW5zIjpbXSwiaWF0IjoxNjY5NjMwMTg4fQ.Fzn0bSIpF-GeuBTz1_tbfje3ZiUTxEMU2zpNZlUF1yg`
            },
            body: JSON.stringify(listingData)
        })
        console.log("list creation response: ", response)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("CREATE LIST SUCCEEDED!!  🥳 🤗🤗");
        } else {
            const err = await response.json();
            console.log(err);
            console.log("CREATE LIST FAILED Hesham!!");
        }
        createListingForm.reset();
    }

    createListing();
})
