const ride_offers = document.getElementById('ride_offers');

if (ride_offers.style.display !== "none")
    getOffers();


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
                console.log(results);
                //    create table from results and append to DOM

                let tbody = document.getElementById('offers');
                let count = 0;

                results.data["Ride offers"].forEach(function (offer) {
                    let row = document.createElement('tr');

                    count++;
                    let columm = document.createElement('td');
                    columm.appendChild(document.createTextNode(count));
                    row.appendChild(columm);

                    for (const feature in offer) {


                        switch (feature) {
                            case 'date':
                                let columm1 = document.createElement('td');
                                columm1.appendChild(document.createTextNode(offer[feature]));
                                row.appendChild(columm1);
                                break;
                            case 'source':
                                let columm2 = document.createElement('td');
                                columm2.appendChild(document.createTextNode(offer[feature]));
                                row.appendChild(columm2);
                                break;
                            case 'destination':
                                let columm3 = document.createElement('td');
                                columm3.appendChild(document.createTextNode(offer[feature]));
                                row.appendChild(columm3);
                                break;
                            case 'time':
                                let columm4 = document.createElement('td');
                                columm4.appendChild(document.createTextNode(offer[feature]));
                                row.appendChild(columm4);
                                break;
                            case 'id':
                                let action = document.createElement('td');
                                let button = document.createElement('button');
                                button.setAttribute("id", "accept");
                                button.innerText = "View";
                                action.appendChild(button);
                                row.appendChild(action);
                                break;
                            default:
                                break
                        }


                    }

                    tbody.appendChild(row)
                });
            }).catch(function (error) {
            console.log(error)
        })
    }

    else
        window.location.href = "../ui/login.html"

}