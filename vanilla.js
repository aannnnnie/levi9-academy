 
	var content = document.getElementById('user-table');
	var details = document.getElementById('user-detail');
	var accountsList = [];


    function account(el) {
        var row = document.createElement('DIV');
        row.setAttribute('id', el.id);
        row.classList.add('user');
        //row.classList.add('col-md-6');
        var login = document.createElement('DIV');
        login.innerText = el.login + (el.site_admin ? ' (admin)' : ' (user)');
        var avatar = document.createElement('IMG');
        avatar.src = el.avatar_url;

        var rowDetail = document.createElement('DIV');
    	rowDetail.classList.add('hidd');

    	var sp_followers = document.createElement('SPAN');
    	sp_followers.textContent = 'followers:  ';
    	rowDetail.appendChild(sp_followers);

    	var folowwers = document.createElement('A');
    	folowwers.href = el.followers_url;
    	folowwers.textContent = el.followers_url;
    	rowDetail.appendChild(folowwers)

    	var br = document.createElement('BR');
    	rowDetail.appendChild(br);

    	var sp_followings = document.createElement('SPAN');
    	sp_followings.textContent = 'followings:  ';
    	rowDetail.appendChild(sp_followings);

    	var followings = document.createElement('A');
    	followings.href = el.followers_url;
    	followings.textContent = el.following_url;
    	rowDetail.appendChild(followings)
    	

        row.appendChild(avatar);
        row.appendChild(login);
        row.appendChild(rowDetail);

        return row;
    }

    function detail(el) {
    	document.getElementById(el.id).querySelector('.hidd').className='show';
    }

    function table(list) {

        var tableBody = document.createElement('DIV');

        for (var el of list) {
            tableBody.appendChild(account(el));
            accountsList.push(el);
        }

        content.appendChild(tableBody);
        tableBody.addEventListener('click', function(e){


        	var el = e.target.parentElement.id;
        	if (document.getElementById(el).querySelector('.show')){
        		document.getElementById(el).querySelector('.show').className='hidd';
        	} else {
		    	if (el){
		    		var user = accountsList.find(function(a){
		    			return a.id == el;
		    		});
		    		detail(user);
		    	};
        	};
        });
    }

    function parsing(accountsList) {
        var xmlhttp = new XMLHttpRequest();
        var url = "https://api.github.com/users";

        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
                accountsList = JSON.parse(xmlhttp.responseText);
                table(accountsList);
            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
parsing();

