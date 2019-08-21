
document.addEventListener('DOMContentLoaded', function(){
const picContainer = document.getElementsByClassName('ui three cards')[0];

  //fetch pics from backend
  // fetch('http://localhost:3000/likes')
  // .then(res => res.json())
  // .then(renderLikes)

  //fetch likes from backend
  fetch('http://localhost:3000/pictures')
  .then(res => res.json())
  .then(renderPics)

  //create and fill in html with json
  function renderPic(pic){
    let picDiv = document.createElement('div')
    picDiv.className = 'ui card'
    picDiv.innerHTML = `<div class="image">
                            <img src="${pic.url}">
                        </div>
                        <div class="content">
                            <span class="right floated">
                            <i class="heart outline like icon"></i>
                            <!-- insert likes here -->${pic.likes.length} likes
                            </span>
                        <i class="comment icon"></i>
                        <!-- insert likes here --> comments
                        </div>`;
      picContainer.append(picDiv);
  }


  function renderPics(pics){
    pics.forEach(renderPic)
  }






  //end of DOMContentLoaded
})
