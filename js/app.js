let container=document.querySelector(".container");
let posts=[];
fetch(' https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data =>{
    posts=data.slice(0,12)

      posts.forEach(post => {
        let card = document.createElement("div");
          card.classList.add("card")
              card.innerHTML=`<div class="box">
              <div class="content">
                <h2>0${post.id}</h2>
                <h3>${post.title}</h3>
                <p>${post.body.substring(0,50)}</p>
                <a href="about.html">Read More</a>
                <button class="btn">
                <i class="fa fa-trash"></i> Trash</button>
                <button class="btn"><i class="fa fa-upload"></i> Update</button>
              </div>
            </div>`
  
            container.appendChild(card)
      });
    
    

    //deleting card
    const cardsTrash = document.querySelectorAll(".btn");
    const deleted=document.querySelectorAll(".card")
    for (let x = 0; x<cardsTrash.length; x++){
      cardsTrash[x].addEventListener("click", ()=>{
          container.removeChild(deleted[x])
      })
    }
    
  })
  .catch(e=>console.log(e))