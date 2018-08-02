
window.onload = function () {
    if (document.getElementById('ride_offers')) getOffers();
};

function getOffers() {

    if (localStorage.getItem('token')) {
        let url = "http://127.0.0.1:5000/rides";
        let method = 'get';
        let header = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        };
        fetchAPI(url, method, header)
            .then(results => {
                if (!results) return;

                //    create table from results and append to DOM

                let tbody = document.getElementById('offers');
                let count = 0;

                results.data["Ride offers"].forEach(function (offer,index) {
                    let wantedFields = [];
                    wantedFields.push(offer['date']);
                    wantedFields.push(offer['source']);
                    wantedFields.push(offer['destination']);
                    wantedFields.push(offer['time']);
                    wantedFields.push(offer['id']);

                    let row = document.createElement('tr');

                    count++;

                    let column = document.createElement('td');
                    column.appendChild(document.createTextNode(count.toString()));
                    row.appendChild(column);

                    for (let feature = 0; feature < wantedFields.length - 1; feature++) {
                        let columm1 = document.createElement('td');
                        columm1.appendChild(document.createTextNode(wantedFields[feature]));
                        row.appendChild(columm1);
                    }

                    let action = document.createElement('td');
                    let button = document.createElement('button');
                    button.setAttribute("id", "accept");
                    button.setAttribute("value", wantedFields[wantedFields.length - 1]);

                    button.addEventListener("click", function () {
                         window.location.href = "../ui/show-ride.html?ride="+this.value;
                    });

                    button.innerText = "View";
                    action.appendChild(button);
                    row.appendChild(action);

                    tbody.appendChild(row)
                });
            }).catch(function (error) {
            console.log(error)
        })
    }

    else
        window.location.href = "../ui/login.html"

}