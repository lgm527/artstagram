
document.addEventListener('DOMContentLoaded', function(){
const picContainer = document.getElementsByClassName('ui three cards')[0];

  //fetch pics from backend
  fetch('http://localhost:3000/pictures')
  .then(res => res.json())
  .then(renderPics)


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
        console.log(event.target.dataset.id);
        let picId = event.target.dataset.id;
        updateModal(picId);
        $('.ui.modal').modal('show'); // Only jquery line in the whole app.
      }
    })
  }

function handleFetch(data){
  let modal = document.getElementById("the-image");
  modal.src = data.url
  data.comments.forEach(function(comment){
    modal.innerHTML += `<li>${comment.content}</li>`
  })
}

//fetch and throw on DOM

  function updateModal(id){
    let modal = document.getElementById("modal-content");
    modal.innerText = "Picture id: " + id;
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
