
    if(localStorage.getItem('token')){
        let logout = document.getElementById('logout');
        if (logout) {
            logout.style.display = 'block';
            logout.onclick = logoutUser;
        }
    }

    let fetchAPI = function (url,method,data) {

        if (!('fetch' in window)) {
            console.log("API not found");
            return;
        }

        const options = {
            method: method,
            headers: {'token': localStorage.getItem('token')}
        };

        if (data) options.body = JSON.stringify(data)

        let status, ok;

        return fetch(url,options)

            .then(response => {
                status = response.status;
                ok = response.ok;
                return response.json()
            })

            .then(function (results) {

                if (ok) {
                    console.log(results);
                    return {data: results, status}
                }
                else {
                    onloading(false)
                    alert(results.message ? results.message : results);
                }
            })
            .catch(function (error) {
                return error.message
            }) 

    };


    function logoutUser() {

        let url = "https://ride-my-way-api-database.herokuapp.com/auth/logout";
        let headers = {'Content-Type': 'application/json', 'token': localStorage.getItem('token')};
        let method = 'get';

        fetchAPI(url,method)
            .then(results => {
                if (!results) return;
                if (results.status === 200) {
                    localStorage.clear();
                    window.location.href = "../ui/index.html"
                }
            })
    }

    let onloading = function(condition){
        
        let div = document.getElementById('loading')
        if(div){
            if(condition === true){
                div.style.display = "inline-block"
           } else div.style.display = "none"
        }
        
    }

