window.onload = function () {
let parsedUrl = new URL(window.location.href);
let rideId = parsedUrl.searchParams.get('ride');
 getRideRequests(rideId)

};
function getRideRequests(rideId) {
        let url = " http://127.0.0.1:5000/rides/requests/" + rideId;
        let method = 'get';
        let header = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        };

        fetchAPI(url, method, header)
            .then(results => {
                if (!results) return;

                //    create table from results and append to DOM

                console.log(results);

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
                    button1.setAttribute("value", wantedFields[wantedFields.length - 1]);
                    button1.setAttribute("action", "Y");
                    button1.innerText = "Accept";
                    button1.onclick = function(requestId=this.id, approval=this.action){
                        approveRequest(requestId,approval)
                    };
                    action.appendChild(button1);


                    let button2 = document.createElement('button');
                    button2.setAttribute("id", "reject");
                    button2.setAttribute("value",  wantedFields[wantedFields.length - 1]);
                    button2.setAttribute("action", "N");
                    button2.onclick = function(requestId=this.value, approval=this.action){
                        approveRequest(requestId,approval)
                    };
                    button2.innerText = "Reject";
                    action.appendChild(button2);

                    row.appendChild(action);

                    tbody.appendChild(row);

                    table.appendChild(tbody);
                    div.appendChild(table)

                });
            }).catch(function (error) {
            console.log(error)
        })

}

function approveRequest(requestId,approval) {

    let url = " http://127.0.0.1:5000/rides/requests/approve/" + requestId;
    console.log(requestId);
    console.log(approval);
        let method = 'post';
        let header = {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        };

        fetchAPI(url, method, header, {"approval": approval})
            .then(results => {
            if(!results) return;
            if (results.status === 201) {
            console.log("Reached fun");

        }
            })


}
