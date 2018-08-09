window.onload = function () {
    let create_ride_form = document.getElementById('create_ride_form');
    create_ride_form.onsubmit = createOffer;
}
function createOffer() {

    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let source = document.getElementById("source").value;
    let destination = document.getElementById("destination").value;
    let price = document.getElementById("price").value;

    let newRide =
        {
            "date": date,
            "time": time,
            "source": source,
            "destination": destination,
            "price": price

        };

    let url = "http://127.0.0.1:5000/rides/create";

    fetchAPI(url, newRide)
        .then(results => {
            console.log(results.status)

                if (results.status === 201) {
                    window.location.href = '../ui/driver-offers.html';
                    window.alert("Ride created successfully");
                }
            }
        ).catch(function (error) {
        console.log(error)
    })
}



