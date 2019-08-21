
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
                        <a data-id="${pic.id}" class="header">${pic.title}</a>
                            <span class="right floated">
                            <i class="heart outline like icon"></i>
                            17 likes
                            </span>
                        <i class="comment icon"></i>3 comments
                        </div>`
      picContainer.append(picDiv);
      
  }


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

  function updateModal(id){
    let modal = document.getElementById("modal-content");
    modal.innerText = "Picture id: " + id;
  }

})   //end of DOMContentLoaded
