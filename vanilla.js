 
(function() {
    var contentElement = document.getElementById('user-table');
    var detailElement = document.getElementById('user-detail')
	var accountsList = [];
    var followersList = [];

    function createAccount(user) {
        var account = document.createElement('DIV');
        account.setAttribute('id', user.id);
        account.classList.add('user');    	

        account.appendChild(createAvatar(user));
        account.appendChild(createLogin(user));

        return account;
    }

    function createAvatar(user) {
        var avatar = document.createElement('IMG');
        avatar.classList.add('img-circle');
        avatar.src = user.avatar_url;

        return avatar;
    }

    function createLogin(user) {
        var login = document.createElement('DIV');
        login.classList.add('font-login');
        login.innerText = user.login + (user.site_admin ? ' (admin)' : ' (user)');

        return login;
    }

    function constructDetails(followersList, selectedUserId){
        var userDetails = document.createElement('DIV')
        var selectedUser = document.getElementById(selectedUserId)
        followersList.forEach(function(follower){
            var folowerLink = document.createElement('A');
            folowerLink.href = follower.url;
            folowerLink.textContent = follower.login;
            folowerLink.classList.add('element');
            userDetails.appendChild(folowerLink);
        })
        selectedUser.appendChild(userDetails);        
    }

    function toggleDetail(selectedId) {
        var selectedUser = document.getElementById(selectedId).lastChild;
        if (selectedUser.classList == 'hidden'){
            selectedUser.classList.remove('hidden');
        } else {
            selectedUser.classList.add('hidden');
        }            
    }

    function createTable(list) {

        var tableBody = document.createElement('DIV');

        for (var element of list) {
            tableBody.appendChild(createAccount(element));
            accountsList.push(element);
        }

        contentElement.appendChild(tableBody);
        tableBody.addEventListener('click', function(event){
        	var selectedUser = event.target.parentElement;
            var selectedUserId = event.target.parentElement.id;
            if (selectedUserId){
                if (document.getElementById(selectedUserId).querySelector('A')) {
                    if (selectedUserId && selectedUserId != 'user-table'){
                        toggleDetail(selectedUserId);
                    };       
                } else {
                    fetchUserDetails(accountsList[selectedUserId].followers_url, selectedUserId);
                };
            };            
        });
    }

    function fetchUserDetails(followersUrl, selectedUserId){
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
                followersData = JSON.parse(request.responseText);
                var followersList = followersData.map(function(follower){
                    return {
                        login: follower.login,
                        url: follower.html_url
                    };
                });
                constructDetails(followersList, selectedUserId); 
            }
        }

        request.open("GET", followersUrl , true);
        request.send();
    
    }

    function init (accountsList) {
        var xmlHttp = new XMLHttpRequest();
        var url = "https://api.github.com/users";

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200) {
                accountsList = JSON.parse(xmlHttp.responseText);
                createTable(accountsList);
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    };

    init();
})();

