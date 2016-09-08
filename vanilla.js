 
(function() {
    var contentElement = document.getElementById('user-table');
	var accountsList = [];

    function createAccount(user) {
        var account = document.createElement('DIV');
        account.setAttribute('id', user.id);
        account.classList.add('user');    	

        account.appendChild(createAvatar(user));
        account.appendChild(createLogin(user));
        account.appendChild(createDetails(user));

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

    function createDetails(user){
        var accountDetail = document.createElement('DIV');
        accountDetail.classList.add('hidd');

        var spanFollowers = document.createElement('SPAN');
        spanFollowers.textContent = 'followers:  ';
        accountDetail.appendChild(spanFollowers);

        var followers = document.createElement('A');
        followers.href = user.followers_url;
        followers.textContent = user.followers_url;
        accountDetail.appendChild(followers)

        var br1 = document.createElement('BR');
        accountDetail.appendChild(br1);

        var spanFollowings = document.createElement('SPAN');
        spanFollowings.textContent = 'followings:  ';
        accountDetail.appendChild(spanFollowings);

        var followings = document.createElement('A');
        followings.href = user.followers_url;
        followings.textContent = user.following_url;
        accountDetail.appendChild(followings)
        
        var br2 = document.createElement('BR');
        accountDetail.appendChild(br2);
        
        var spanStarred = document.createElement('SPAN');
        spanStarred.textContent = 'starred:  ';
        accountDetail.appendChild(spanStarred);
        
        var starred = document.createElement('A');
        starred.href = user.starred_url;
        starred.textContent = user.starred_url;
        accountDetail.appendChild(starred)

        return accountDetail;
    }

    function showDetail(user) {
    	document.getElementById(user.id).querySelector('.hidd').className='show';
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
        	   	if (selectedUser){
        	   		if (document.getElementById(selectedUser).querySelector('.show')){
        					document.getElementById(selectedUser).querySelector('.show').className='hidd';
        			} else {
		    		var user = accountsList.find(function(account){
		    			return account.id == selectedUser;
		    		});
		    		showDetail(user);
		    	};
        	};
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

