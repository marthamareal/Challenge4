window.onload = function () {
    let create_ride_form = document.getElementById('create_ride_form');
    create_ride_form.onsubmit = createOffer;
};
function createOffer(event) {
    event.preventDefault()
    if(localStorage.getItem('token')){
        let url = "https://ride-my-way-api-database.herokuapp.com/rides/create";
     onloading(true)
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

    fetchAPI(url,'post',newRide)
        .then(results => {
                if (results.status === 201) {
                    onloading(false)
                    window.location.href = '../ui/driver-offers.html';
                    window.alert("Ride created successfully");
                }
            }
        ).catch(function (error) {
        console.log(error)
    })
}else{
        window.location.href = "../ui/login.html"
    }
}



