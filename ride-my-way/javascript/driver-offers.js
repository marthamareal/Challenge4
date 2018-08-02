
window.onload = function () {

if (document.getElementById('driver_offers')) getDriverOffers();

};
function getDriverOffers() {

    if (localStorage.getItem('token')) {
        let url = "http://127.0.0.1:5000/driver/rides";
        let method = 'get';
        let header = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        };
        fetchAPI(url, method, header)
            .then(results => {
                if (!results) return;

                //    create table from results and append to DOM

                let tbody = document.getElementById('my_offers');
                let count = 0;

                results.data["driver_offers"].forEach(function (offer) {
                    let wantedFields = [];
                    wantedFields.push(offer['date']);
                    wantedFields.push(offer['source']);
                    wantedFields.push(offer['destination']);
                    wantedFields.push(offer['time']);
                    wantedFields.push(offer['requests_no']);
                    wantedFields.push(offer['id']);


                    let row = document.createElement('tr');

                    count++;

                    let column = document.createElement('td');
                    column.appendChild(document.createTextNode(count.toString()));
                    row.appendChild(column);

                    for (let feature = 0; feature < wantedFields.length - 1; feature++) {
                        let column1 = document.createElement('td');
                        column1.appendChild(document.createTextNode(wantedFields[feature]));
                        row.appendChild(column1);
                    }

                    let action = document.createElement('td');
                    let button = document.createElement('button');
                    button.setAttribute("id", "accept");
                    button.setAttribute("value", wantedFields[wantedFields.length - 1]);
                    button.addEventListener("click", function () {
                        window.location.href = "../ui/request-list.html?ride="+this.value;
                    });
                    button.innerText = "View Requests";
                    action.appendChild(button);
                    row.appendChild(action);

                    tbody.appendChild(row)
                });
            }).catch(function (error) {
            console.log(error)
        })
    }
}