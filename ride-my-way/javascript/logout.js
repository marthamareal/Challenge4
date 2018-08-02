let logout = document.getElementById('logout');
if (localStorage.getItem('token')) {
    logout.style.display = 'block';
    logout.onclick = logoutUser;
}

function logoutUser() {
    let url = "http://127.0.0.1:5000/auth/logout";
    let headers = {'Content-Type': 'application/json', 'token': localStorage.getItem('token')};
    let method = 'get';

    fetchAPI(url, method, headers)
        .then(results => {
            if (!results) return;
            if (results.status === 200) {
                localStorage.clear();
                window.location.href = "../ui/index.html"
            }
        })
}