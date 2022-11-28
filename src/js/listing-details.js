const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get("listing_id");

console.log("listingId: ", listingId);
const listTitle = document.querySelector("#list-title");
const listId = document.querySelector("#list-id");
const listDesc = document.querySelector("#list-desc");
const listBids = document.querySelector("#list-bids");


async function getListById() {
    const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxLCJuYW1lIjoiaGVzaGFtZWxtYXNyeTc3IiwiZW1haWwiOiJoZXNoYW1lbG1hc3J5NzdAbm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJjcmVkaXRzIjo2MDAsIndpbnMiOltdLCJpYXQiOjE2Njk2MzQ5MTB9.Yzzirl_E1L4D66_4YRGB2RsY_e6JJPqNVHiUQ25WHqQ`
        }
    })
    console.log("response: ", response);
    const data = await response.json();
    console.log("data: ", data);
    listTitle.innerHTML = data.title
    listId.innerHTML = data.id
    listDesc.innerHTML = data.description
    listBids.innerHTML = data._count.bids
}

getListById();

const listingBidInput = document.querySelector("#listing-bid-input");
const biddingForm = document.querySelector("#bidding-form");


biddingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("listingBidInput", listingBidInput.value);

    const amountToBid = {
        "amount": parseInt(listingBidInput.value)
    }

    async function bidOnList() {
        const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcxLCJuYW1lIjoiaGVzaGFtZWxtYXNyeTc3IiwiZW1haWwiOiJoZXNoYW1lbG1hc3J5NzdAbm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJjcmVkaXRzIjoxMDAwLCJ3aW5zIjpbXSwiaWF0IjoxNjY5NjMwMTg4fQ.Fzn0bSIpF-GeuBTz1_tbfje3ZiUTxEMU2zpNZlUF1yg`
            },
            body: JSON.stringify(amountToBid)
        })
        console.log("bid on list response: ", response)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("Bid on a list SUCCEEDED!!  🥳 🤗🤗");
        } else {
            const err = await response.json();
            console.log(err);
            console.log("CREATE LIST FAILED Hesham!!");
        }
        biddingForm.reset();
    }

    bidOnList();
})

