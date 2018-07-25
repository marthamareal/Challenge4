const ride_offers = document.getElementById('ride_offers');

if (ride_offers.style.display !== "none")
    getOffers();


function getOffers() {
    let url = "http://127.0.0.1:5000/rides";
    let method = 'get';
    let header = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
    };
    fetchAPI(url, method, header)
        .then(results => {
            if (!results) return;
            console.log(results)
        })
}