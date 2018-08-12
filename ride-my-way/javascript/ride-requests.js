window.onload = function () {
    
let parsedUrl = new URL(window.location.href);
let rideId = parsedUrl.searchParams.get('ride');
 getRideRequests(rideId)

};
function getRideRequests(rideId) {
    if(localStorage.getItem('token')){
        let url = " https://ride-my-way-api-database.herokuapp.com/rides/requests/" + rideId;

        fetchAPI(url,'get')
            .then(results => {
                if (!results) return;

                //    create table from results and append to DOM

                let div = document.querySelector('#ride_requests');

                let table =  document.createElement('table');

                let theadRow = document.createElement('tr');
                console.log(theadRow);

                let tableHeads = ["","DATE", "REF NO", "RIDER", "STATUS", "ACTION"];

                for (let head = 0; head <tableHeads.length; head ++){
                    let th =  document.createElement('th');
                    th.innerText = tableHeads[head];
                    theadRow.appendChild(th);
                }

                table.appendChild(theadRow);

                let tbody = document.createElement("tbody");

                let count = 0;

                results.data["requests"].forEach(function (offer) {
                    let wantedFields = [];

                    wantedFields.push(offer['date']);
                    wantedFields.push(offer['ride_ref']);
                    wantedFields.push(offer['requestor']);
                    wantedFields.push(offer['status']);
                    wantedFields.push(offer['request_id']);

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
                    let button1 = document.createElement('button');
                    button1.setAttribute("id", "accept");
                    button1.innerText = "Accept";
                    button1.onclick = function(){
                        approveRequest(rideId,wantedFields[wantedFields.length - 1], "Y")
                    };
                    action.appendChild(button1);


                    let button2 = document.createElement('button');
                    button2.setAttribute("id", "reject");
                    button2.innerText = "Reject";
                    button2.onclick = function(){
                        approveRequest(rideId,wantedFields[wantedFields.length - 1], "N")
                    };
                    action.appendChild(button2);

                    row.appendChild(action);

                    tbody.appendChild(row);

                    table.appendChild(tbody);
                    div.appendChild(table)

                });
            }).catch(function (error) {
            console.log(error)
        })
    }else{
            window.location.href = "../ui/login.html"
        }

}

function approveRequest(rideId,requestId,approval) {

    let url = "https://ride-my-way-api-database.herokuapp.com/rides/requests/approve/" + requestId;

        fetchAPI(url,'post',{"approval": approval})
            .then(results => {
            if(!results) return;
            if (results.status === 201) {
                alert("Request approved successfully ");
                window.location.href = "../ui/request-list.html?=" + rideId;
        }
            })


}
