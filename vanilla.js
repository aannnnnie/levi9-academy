 
(function() {
    var contentElement = document.getElementById('user-table');
	var accountsList = [];

    function createAccount(user) {
        var row = document.createElement('DIV');
        row.setAttribute('id', user.id);
        row.classList.add('user');    	

        row.appendChild(createAvatar(user));
        row.appendChild(createLogin(user));
        row.appendChild(createDetails(user));

        return row;
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

    function createDetails(user){
        var rowDetail = document.createElement('DIV');
        rowDetail.classList.add('hidd');

        var sp_followers = document.createElement('SPAN');
        sp_followers.textContent = 'followers:  ';
        rowDetail.appendChild(sp_followers);

        var folowwers = document.createElement('A');
        folowwers.href = user.followers_url;
        folowwers.textContent = user.followers_url;
        //folowwers.addEventListener('click', showFollowers())
        rowDetail.appendChild(folowwers)

        var br1 = document.createElement('BR');
        rowDetail.appendChild(br1);

        var sp_followings = document.createElement('SPAN');
        sp_followings.textContent = 'followings:  ';
        rowDetail.appendChild(sp_followings);

        var followings = document.createElement('A');
        followings.href = user.followers_url;
        followings.textContent = user.following_url;
        rowDetail.appendChild(followings)
        
        var br2 = document.createElement('BR');
        rowDetail.appendChild(br2);
        
        var sp_starred = document.createElement('SPAN');
        sp_starred.textContent = 'starred:  ';
        rowDetail.appendChild(sp_starred);
        
        var starred = document.createElement('A');
        starred.href = user.starred_url;
        starred.textContent = user.starred_url;
        rowDetail.appendChild(starred)

        return rowDetail;
    }

    function showDetail(user) {
    	document.getElementById(user.id).querySelector('.hidd').style.display = 'block';
    }

    function toggleDetail(selectedUser) {
        if (document.getElementById(selectedUser).querySelector('.hidd').style.display == 'block'){
            document.getElementById(selectedUser).querySelector('.hidd').style.display = 'none';
        } else {
            var user = accountsList.find(function(account){
                return account.id == selectedUser;
            });
            showDetail(user);
        };
    }

    function createTable(list) {

        var tableBody = document.createElement('DIV');

        for (var element of list) {
            tableBody.appendChild(createAccount(element));
            accountsList.push(element);
        }

        contentElement.appendChild(tableBody);
        tableBody.addEventListener('click', function(event){

        	var selectedUser = event.target.parentElement.id;
            toggleDetail(selectedUser);
        });
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

