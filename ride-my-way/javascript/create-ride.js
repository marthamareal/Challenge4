window.onload = function () {
    if (localStorage.getItem('token')) {
        let create_ride_form = document.getElementById('create_ride_form');
        create_ride_form.onsubmit = createOffer;
    }
    else window.location.href = "../ui/login.html"
};

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

    let url = "https://ride-my-way-api-database.herokuapp.com/rides/create";
    let method = 'post';
    let header = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
    };
    console.log(newRide);

    fetchAPI(url, method, header, newRide)
        .then(results => {
                if (results.status === 201) {
                    window.location.href = '../ui/driver-offers.html';
                    alert("Ride created successfully");
                }
            }
        ).catch(function (error) {
        console.log(error)
    })
}



