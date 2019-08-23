document.addEventListener('DOMContentLoaded', function(){
  const picContainer = document.getElementsByClassName('ui three cards')[0];
  
    //fetch pics from backend
    fetch('http://localhost:3000/pictures')
    .then(res => res.json())
    .then(renderPics)

    // fetch users
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(populateDropDown)

    function populateDropDown(users){
      users.forEach(renderUser)
    }

    function renderUser(user){
      let userList = document.getElementById("user-list")
      let newUser = document.createElement('div')
      newUser.className="item"
      newUser.setAttribute("data-id", user.id);
      newUser.innerText=user.name
      userList.append(newUser)
    }

    $('.ui.dropdown').dropdown({
      onChange: function(value, text, selectedItem){
        let userId = selectedItem[0].dataset.id
        currentUser = document.getElementById("current-user");
        currentUser.setAttribute("data-id", userId)
        currentUser.innerText = document.getElementById("logged-user").innerText;
      }
    });
  
  
    //create and fill in html with json
    // added by john: picture titles and Data attribs for use with the listener
  
    function renderPic(pic){
      let picDiv = document.createElement('div')
      picDiv.className = 'ui card'
      picDiv.innerHTML = `<div class="image">
                              <img data-id="${pic.id}" class="trigger" src="${pic.url}">
                          </div>
                          <div class="content">
                          <p data-id="${pic.id}" class="header">${pic.title}</p>
                              <span class="right floated">
                              <i class="heart outline like icon" data-id="${pic.id}"></i>
                              <span id='likes' data-id="${pic.id}"> ${pic.likes.length} </span>
                              </span>
                          <i class="comment icon"></i>
                          <span id='comments_count'> ${pic.comments.length} comments </span>
                          </div>`;
        picContainer.append(picDiv);
    }
  
    //render all pictures
    function renderPics(pics){
      pics.forEach(renderPic);
      addListeners(pics);
    }
  
  
    // Addition by John: Listener for the modals
  
    function addListeners(pic){
      let modalListener = document.getElementById("pics-container");
      modalListener.addEventListener("click", function(){
        if(event.target.className == "trigger"){
          let picId = event.target.dataset.id;
          updateModal(picId);
          // $('.ui.modal').modal('show'); // Only jquery line in the whole app.
          $('.ui.modal')
  .modal({
    blurring: true
  })
  .modal('show')
;
        }
      })
    }
  
  function handleFetch(data){
    // console.log(data)
    let modal = document.getElementById("the-image");
    let commentList = document.getElementById("comments")
    commentList.innerHTML = ""; // cleaning previous comments before loading new ones
    modal.src = data.url
    commentList.setAttribute("data-id", data.id)
    data.comments.forEach(function(comment){
      comments.innerHTML += `<li>${comment.content}</li>`
    })
  }

  const commentListener = document.getElementById("comment-form")
  commentListener.addEventListener("submit", updateComments);

  function updateComments(event){
    let form = document.getElementById("comment-form");
    let userId = document.getElementById("current-user").dataset.id 
    let picId = document.getElementById("comments").dataset.picId
    event.preventDefault();
    comment = document.getElementById("insert-comment");
    comment = comment.value;

    console.log("comment" + comment);
    console.log("pic " + picId)
    console.log("user " + userId)
    
    fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "Application/json"
    },
    body: JSON.stringify({
      content: comment,
      picture_id: picId,
      user_id: userId
    })

  }).then(resp => resp.json)
    

    addSingleComment(comment);
    form.reset();
  }

  function addSingleComment(comment){
    let commentList = document.getElementById("comments")
    newLi = document.createElement("li");
    newLi.innerText = comment;
    commentList.appendChild(newLi);
}

function handleFetch(data){
  let modal = document.getElementById("the-image");
  let commentList = document.getElementById("comments")
  commentList.innerHTML = ""; // cleaning previous comments before loading new ones
  modal.src = data.url
  data.comments.forEach(function(comment){
    comments.innerHTML += `<li>${comment.content}</li>`
  })
}


  
  //fetch and throw on DOM
    function updateModal(id){
      let modal = document.getElementById("modal-content");
      let ul = document.getElementById("comments");
      ul.setAttribute("data-pic-id", id);
      fetch(`http://localhost:3000/pictures/${id}`)
      .then(res => res.json())
      .then(handleFetch)
    }
  
    //add like feature to stable parent:
    picContainer.addEventListener('click', function(event){
      if (event.target.classList.contains("heart")){
        let picId = event.target.dataset.id;
  
        fetch("http://localhost:3000/likes",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'picture_id': Number(picId)
          })
        })
        .then(res => res.json())
        .then(data => data)
        event.target.nextElementSibling.innerText++;
      }
    })
  
  
  })   //end of DOMContentLoaded
  