/**
 * Chat group details update feature
 */

function showChatGroupUserDetailsUpdateOption(userId){
	
	// Remove previous element
	removePreviousOptionShowingDiv();
	
	let optionElements =  document.querySelectorAll(".group-user-option-div");
	
	for(let ops of optionElements){
		if(ops.id == userId){
		
			if(ops.style.display === "none"){	
			    ops.style.display = "block";
			}else {
				ops.style.display = "none";
			}
		break;
		}
	}
}

function removePreviousOptionShowingDiv(){
	let previousOptionElement = document.querySelectorAll(".group-user-option-div");
	
	for(let optionElement of previousOptionElement){
		if(optionElement.style.display === "block"){
			optionElement.style.display = "none";
		}
	}
}

function makeAdmin(selectedUserId){
	console.log(selectedUserId);
	makeUserAsGroupAdmin(selectedUserId, chatId);
}

function makeUserAsGroupAdmin(selectedUserId, chatId){
	let adminPara = document.querySelector(".admin-para").textContent;
	
	let check = true;
	if(adminPara == "Revoke Admin"){
		check = false;
	}
	const url = "/appfreshnest/MakeUserAsGroupAdminServlet?userId="+ selectedUserId + "&chatId=" + chatId + "&admin=" + check;
  axios
    .get(url)
    .then(function (response) {
      const chatGroupObject = response.data;
      
    })
    .catch(function (error) {
      console.log(error);
    });
}

function removeUser(selectedUserId){
	removeUserFromTheGroup(selectedUserId, chatId);
}

function removeUserFromTheGroup(selectedUserId, chatId){
		const url = "/appfreshnest/RemoveUserFromChatGroupServlet?userId="+ selectedUserId + "&chatId=" + chatId ;
  axios
    .get(url)
    .then(function (response) {
      const chatGroupObject = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updatedChatGroupDetails(){
	let groupName = document.querySelector(".group-name-input");
	let groupTheme = document.querySelector(".group-theme-input");
	
}

function updateChatGroupProfileImage(profileObject){
	
	const url = "/appfreshnest/UpdateChatGroupProfileImage";

  axios
    .post(url, profileObject, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      // handle success
      let serverMessage = response.data;     
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function localImagePicker(){
  let fileInput = document.createElement("input");
  fileInput.type = "file";

  fileInput.click(); 

  fileInput.addEventListener("change", function (e) {
    let file = e.target.files[0];

    let reader = new FileReader();
    reader.onload = function (e) {
      let groupProfileImage =  e.target.result;
      
      let profileObject = {
		profileImage : groupProfileImage,
		chatId : chatId
	}
	
      updateChatGroupProfileImage(profileObject);
      
    };
    reader.readAsDataURL(file);
  });
}

// Chat group name and theme update
function changeGroupNameAndThemeDetails() {
  let groupNameInput = document.querySelector(".group-name-input");
  let groupThemeInput = document.querySelector(".group-theme-input");
  
  // Trim and get the values
  let groupName = groupNameInput.value.trim();
  let groupTheme = groupThemeInput.value.trim();

  // Validation checks
  if (groupName === "") {
    alert("Group name cannot be empty.");
    return; 
  }

  if (groupTheme === "") {
    alert("Group theme cannot be empty.");
    return; 
  }

  if (groupName.length < 4) {
    alert("Group name must be at least 4 characters long.");
    return;
  }

  if (groupTheme.length < 4) {
    alert("Group theme must be at least 4 characters long.");
    return;
  }

  let groupUpdateObject = {
    groupName: groupName,
    groupTheme: groupTheme,
    chatId: chatId,
  };

  const url = "/appfreshnest/UpdateChatGroupDetailsServlet";

  axios
    .post(url, groupUpdateObject, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      // handle success
      let serverMessage = response.data;
      console.log(serverMessage);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
