const posts = [];

const TITLE_VALIDATION_LIMIT = 100;
const TEXT_VALIDATION_LIMIT = 200;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const btnPostNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');


btnPostNode.addEventListener('click', function(){
    const postFromUser = getPostFromUser();

    addPost(postFromUser);

    renderPosts();
    cleanInput();

});

postTitleInputNode.addEventListener('input', function (event) {
    validation()
});
postTextInputNode.addEventListener('input', function (event) {
    validation()
});

function validation() {
    const titleLen = postTitleInputNode.value.length;
    const textLen = postTextInputNode.value.length;

    if (titleLen > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов.`;
        validationMessage.classList.remove('validationMessage_hidden');
        btnPostNode.disabled = true;
        return;
    }
    if (textLen > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerText = `Длина поста не должна превышать ${TEXT_VALIDATION_LIMIT} символов.`;
        validationMessage.classList.remove('validationMessage_hidden');
        btnPostNode.disabled = true;
        return;
    }

    validationMessage.classList.add('validationMessage_hidden');
    btnPostNode.disabled = false;

    
}


function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;

    return{
        title: title,
        text: text
    };
}

function addPost({title, text}) {
    const currentDate = new Date();
    const dt = `${currentDate.getHours()}:${currentDate.getUTCMinutes()}`
    posts.push({
        dt: dt,
        title: title,
        text: text
        });
}

function getPosts() {
    return posts;
}

function renderPosts(){
    const posts = getPosts();

    let postsHTML = '';

    posts.forEach(post => {
        postsHTML +=`
        <div class='post'>
        <p class='post__date'>${post.dt}</p>
        <p class='post__title'>${post.title}</p>
        <p class='post__text'>${post.text}</p>
        </div>`
});

postsNode.innerHTML = postsHTML;
}

function cleanInput() {
    postTextInputNode.value = '';
    postTitleInputNode.value = '';
}
