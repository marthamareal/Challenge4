
let fetchAPI = function(url, data) {
    if(!('fetch' in window)){
         console.log("API not found");
        return;
     }
     if(!localStorage.getItem('token')){
         window.location.href = "../ui/login.html"
         return;
     }
    const options = {
        method: ['post','get','put'],
        headers:{'token': localStorage.getItem('token')}
    };

    if(data) options.body = JSON.stringify(data)

    let status, ok;

    return fetch(url, options)
    
        .then(response => {
            status = response.status;
            ok = response.ok;
            return response.json()
        })

        .then(function (results) {

            if (ok) {
                return {data:results, status}
            }
            else {
                 alert(results.message? results.message: results);
            }
        })
        .catch(function (error) {
            return error.message
        })

};

