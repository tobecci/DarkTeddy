const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".container");

// get one post
const getPost = async () => {
  try {
    let data = window.sessionStorage.getItem(`posts`);
    data = JSON.parse(data);
    data = data.find((post) => post.id == id);
    const postDetail = `
     <div class="container">
    <div class="row text-center light-grey">
      <h1 class="text-bold">Post Details</h1>
      <div class="col-lg-6 col-md-6 pt-2 text-start">
        <h2>${data?.title}</h2>
        <p>
          ${data?.body}
        </p>
      </div>
    </div>
  </div>`;

    container.insertAdjacentHTML("beforeend", postDetail);
  } catch (error) {
    console.log(error);
  }
};
getPost();
