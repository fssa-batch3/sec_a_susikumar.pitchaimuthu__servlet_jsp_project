function getUserCount(){
	const url = "/appfreshnest/GetUserCountServlet";
	   axios.get(url)
			  .then(function (response) {
			    // handle success
			    let userCount = response.data;
			    console.log(userCount);
			    return userCount;
			     })
			  .catch(function (error) {
			    // handle error
			    console.log(error);		
	    })
}

