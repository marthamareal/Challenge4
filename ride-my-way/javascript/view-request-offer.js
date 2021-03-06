window.onload = function () {
    alert("Page loading")
let parsedUrl = new URL(window.location.href);
let rideId = parsedUrl.searchParams.get('ride');
viewOffer(rideId)
    
};

function viewOffer(offerId) {
        if (localStorage.getItem('token')) {
            let url = " https://ride-my-way-api-database.herokuapp.com/rides/" + offerId;
            console.log(url);

            fetchAPI(url,'get')
                .then(results => {
                    if (!results) return;

                    //create ride view and put in DOM
                    console.log(results);
                    let ride = results.data['ride'];

                    let divShowingRide = document.createElement("div");
                    divShowingRide.setAttribute("class", 'show-ride-details');


                    let head = document.createElement('h1');
                    head.appendChild(document.createTextNode("RIDE by  " + ride['creator'].toUpperCase()));
                    divShowingRide.appendChild(head);


                    let label = document.createElement('label');
                    let strong = document.createElement('strong');
                    strong.appendChild(document.createTextNode("Date :  " + ride['date']));
                    label.appendChild(strong);
                    divShowingRide.appendChild(label);


                    let table = document.createElement('table');
                    let tbody = document.createElement('tbody');

                    let tr1 = document.createElement('tr');
                    let tda = document.createElement('td');
                    let tdb = document.createElement('td');
                    let strong1 = document.createElement('strong');
                    let strong2 = document.createElement('strong');
                    strong1.appendChild(document.createTextNode("REF NO:"));
                    strong2.appendChild(document.createTextNode(ride['ref_no']));
                    tda.appendChild(strong1);
                    tdb.appendChild(strong2);
                    tr1.appendChild(tda);
                    tr1.appendChild(tdb);
                    tbody.appendChild(tr1);

                    let tr2 = document.createElement('tr');
                    let tda2 = document.createElement('td');
                    let tdb2 = document.createElement('td');
                    tda2.appendChild(document.createTextNode("SOURCE:"));
                    tdb2.appendChild(document.createTextNode(ride['source']));
                    tr2.appendChild(tda2);
                    tr2.appendChild(tdb2);
                    tbody.appendChild(tr2);

                    let tr3 = document.createElement('tr');
                    let tda3 = document.createElement('td');
                    let tdb3 = document.createElement('td');
                    tda3.appendChild(document.createTextNode("DESTINATION:"));
                    tdb3.appendChild(document.createTextNode(ride['destination']));
                    tr3.appendChild(tda3);
                    tr3.appendChild(tdb3);
                    tbody.appendChild(tr3);

                    let tr4 = document.createElement('tr');
                    let tda4 = document.createElement('td');
                    let tdb4 = document.createElement('td');
                    tda4.appendChild(document.createTextNode("START TIME:"));
                    tdb4.appendChild(document.createTextNode(ride['time']));
                    tr4.appendChild(tda4);
                    tr4.appendChild(tdb4);
                    tbody.appendChild(tr4);

                    let tr5 = document.createElement('tr');
                    let tda5 = document.createElement('td');
                    let tdb5 = document.createElement('td');
                    tda5.appendChild(document.createTextNode("DRIVER CONTACT:"));
                    tdb5.appendChild(document.createTextNode(ride['phone']));
                    tr5.appendChild(tda5);
                    tr5.appendChild(tdb5);
                    tbody.appendChild(tr5);


                    table.appendChild(tbody);
                    divShowingRide.appendChild(label);
                    divShowingRide.appendChild(table);

                    let br = document.createElement('br');
                    divShowingRide.appendChild(br);


                    let center = document.createElement('center');

                    let p = document.createElement('p');
                    p.appendChild(document.createTextNode("Price:"));

                    let lb1 = document.createElement('label');
                    let str = document.createElement('strong');

                    str.appendChild(document.createTextNode(ride['price']));

                    lb1.appendChild(str);

                    p.appendChild(lb1);

                    let br1 = document.createElement('br');

                    center.appendChild(p);

                    center.appendChild(br1);
                    divShowingRide.appendChild(center);

                    let center1 = document.createElement('center');

                    let a = document.createElement('a');
                    // a.setAttribute("href", "../ui/user-profile.html");
                    let button1 = document.createElement('button');
                    button1.setAttribute("id", "accept");
                    button1.onclick = function () {
                        requestRide(offerId)
                    };
                    button1.innerText = "Request to Join";
                    a.appendChild(button1);
                    center1.appendChild(a);

                    let a1 = document.createElement('a');
                    a1.setAttribute("href", "../ui/ride-offer-list.html");
                    let button2 = document.createElement('button');
                    button2.setAttribute("id", "reject");
                    button2.innerText = "Back to offers";
                    a1.appendChild(button2);

                    center1.appendChild(a1);

                    divShowingRide.appendChild(center1);

                    let br2 = document.createElement('br');
                    divShowingRide.appendChild(br2);

                    document.querySelector('#show-ride-details').appendChild(divShowingRide)

                }).catch(function (error) {
                console.log(error)
            });

        }

    else{
            window.location.href = "../ui/login.html"
        }
}



function requestRide(offerId) {
        if (localStorage.getItem('token')) {
            let url = " https://ride-my-way-api-database.herokuapp.com/rides/requests/create/" + offerId;

            fetchAPI(url,'post')
                .then(results => {
                    if (!results) return;

                    if (results.status === 201) {
                     window.location.href = "../ui/ride-offer-list.html";
                    alert("Request made successfully");
                }

                }).catch(function (error) {
                console.log(error)
            });
                }
}