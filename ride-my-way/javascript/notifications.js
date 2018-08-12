function getNotifications() {

    if (localStorage.getItem('token')) {
        let url = "https://ride-my-way-api-database.herokuapp.com/notifications";

        fetchAPI(url,'get')
            .then(results => {
                if (!results) return;

                //    create table from results and append to DOM

                let notificationsDiv = document.getElementById('notification');

                if (notificationsDiv.innerHTML)
                    notificationsDiv.innerHTML = "";

                let headDiv = document.createElement('div');
                headDiv.setAttribute("id", "notification-head");
                let h4 = document.createElement('h4');
                h4.innerText = "Notifications: " + results.data["notifications"].length;
                headDiv.appendChild(h4);
                notificationsDiv.appendChild(headDiv);

                results.data["notifications"].forEach(function (notification) {
                    let wantedFields = [];
                    wantedFields.push(notification['message']);
                    wantedFields.push(notification['id']);


                    for (let feature = 0; feature < wantedFields.length - 1; feature++) {

                        let msgDiv = document.createElement('div');
                        msgDiv.setAttribute("class", "notification-msg");

                        let span = document.createElement('span');
                        span.setAttribute("class", "rejected-msg");

                        let i = document.createElement('i');
                        i.setAttribute("class", "fa fa-close");
                        i.innerText = wantedFields[feature];

                        span.appendChild(i);
                        msgDiv.appendChild(span);

                        notificationsDiv.appendChild(msgDiv)
                    }

                });
            }).catch(function (error) {
            console.log(error)
        })
    }

}

function notification() {

    let div = document.getElementById("notification");

    let rides = document.getElementById("rides");
    let showRideDetails = document.getElementById("show-ride-details");
    if (div) {

         if (div.style.display === "none") {
        if (rides) {
            rides.style.width = "50%";
            div.style.display = "block";
            getNotifications();
        }
        else if (showRideDetails){
            showRideDetails.style.width = "50%";
            div.style.display = "block";
            getNotifications();
        }

    }
        else if (div.style.display === "block") {
        if (rides) {
            rides.style.width = "75%";
            div.style.display = "none";
        }
        else  if (showRideDetails) {
            showRideDetails.style.width = "75%";
            div.style.display = "none";
        }

    }

        else {
        div.style.display = "none";
    }
    }


}
