
document.addEventListener('DOMContentLoaded', function(){
const picContainer = document.getElementsByClassName('ui three cards')[0];

  //fetch pics from backend
  fetch('http://localhost:3000/pictures')
  .then(res => res.json())
  .then(renderPics)

  //create and render a picture on DOM
  function renderPic(pic){
    let picDiv = document.createElement('div')
    picDiv.className = 'ui card'
    picDiv.innerHTML = `<div class="image">
                            <img src="${pic.url}">
                        </div>
                        <div class="content">
                            <span class="right floated">
                            <i class="heart outline like icon" data-id="${pic.id}"></i>
                            <span id='likes' data-id="${pic.id}"> ${pic.likes.length} </span>
                            </span>
                        <i class="comment icon"></i>
                        <!-- insert likes here --> comments
                        </div>`;
      picContainer.append(picDiv);
  }

  //render all pictures
  function renderPics(pics){
    pics.forEach(renderPic)
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





  //end of DOMContentLoaded
})
