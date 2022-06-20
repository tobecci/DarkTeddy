const container = document.querySelector(".container");
const forms = document.querySelectorAll("form");
forms.forEach((form) =>
  form.addEventListener("submit", (e) => e.preventDefault())
);

let postsToBeRendered = [];

const renderPosts = (incomingPosts) =>
  incomingPosts.forEach((post) => {
    const postCard = `
        <div class="card" id=${post.id}>
          <div class="box">
            <div class="content">
              <h2>${post.id}</h2>
              <h3>${post.title}</h3>
              <a href="./post.html?id=${post.id}">Read More</a>

              <a type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#updatePost"
                  onclick="getPostId(${post.id})">
                  Update</a>

              <button onclick="deletePost(${post.id})" class="btn">
                <i class="fa fa-trash"></i> Trash
              </button>
            </div>
          </div>
        </div>`;
    container.insertAdjacentHTML("beforeend", postCard);
  });

//
//
// GET POST
//
//

(async () => {
  try {
    const { data } = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    });
    postsToBeRendered = data.slice(0, 12);

    const greg = window.sessionStorage.getItem(`posts`)
      ? JSON.parse(window.sessionStorage.getItem(`posts`))
      : postsToBeRendered;

    renderPosts(greg);

    window.sessionStorage.setItem(`posts`, JSON.stringify(greg));
  } catch (error) {
    console.log(error);
  }
})();

//
//
// CREATE POST
//
//

const createNewPost = async () => {
  const postBody = document.getElementById("post_body");
  const postTitle = document.getElementById("post_title");

  try {
    const { data } = await axios({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        title: postTitle.value,
        body: postBody.value,
        userId: 100,
      },
    });
    renderPosts([data]);

    const greg = JSON.parse(window.sessionStorage.getItem(`posts`));

    window.sessionStorage.setItem(`posts`, JSON.stringify([...greg, data]));
  } catch (error) {
    console.log(error);
  }
};

//
//
// UPDATE POST
//
//

let postId;
const getPostId = (id) => (postId = id);

const updatePost = async () => {
  const postBody = document.getElementById("update_post_body");
  const postTitle = document.getElementById("update_post_title");

  try {
    const { data } = await axios({
      method: "PUT",
      url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
      data: {
        id: postId,
        title: postTitle.value,
        body: postBody.value,
        userId: 100,
      },
    });

    // console.log(data);

    const charles = JSON.parse(window.sessionStorage.getItem(`posts`));
    const oldPost = charles.filter((post) => post.id === postId);

    // oldPost.title = data.title;
    // oldPost.body = data.body;
    // console.log(...charles, charles.);

    // window.sessionStorage.setItem(
    //   "posts",
    //   JSON.stringify([...charles, oldPost])
    // );

    // console.log(oldPost);

    postBody.value = "";
    postTitle.value = "";
  } catch (error) {
    console.log(error);
  }
};

//
//
// DELETE POST
//
//
const deletePost = async (id) => {
  try {
    await axios({
      method: "DELETE",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    });
    const post = document.getElementById(`${id}`);
    post.remove();
    let charles = JSON.parse(window.sessionStorage.getItem(`posts`));
    charles = charles.filter((post) => post.id !== id);
    window.sessionStorage.setItem("posts", JSON.stringify(charles));
  } catch (error) {
    console.log(error);
  }
};
