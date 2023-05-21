const API = 'http://localhost:8000/Post'

// Функция для открытия модального окна
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}


function openModalEdit() {
    document.getElementById("myModalEdit").style.display = "block";
}

// Функция для закрытия модального окна
function closeModalEdit() {
    document.getElementById("myModalEdit").style.display = "none";
}
let addPostTitle = document.querySelector('.inp_add_post_title')
let addPostInfo = document.querySelector('.inp_add_post_info')
let addPostOther = document.querySelector('.inp_add_post_other')
let addPostImage = document.querySelector('.inp_add_post_image')
let addPostBtn = document.querySelector('.add_post_btn')

let searchUsers = document.querySelector('.search_users')
let searchVal = "";



    let currentPage = 1;

    addPostBtn.addEventListener("click", () => {
        // if (
            //   !addPostTitle.value.trim() ||
            //   !addPostInfo.value.trim() ||
            //   !addPostOther.value.trim() ||
            //   !addPostImage.value.trim()
            // ) {
                //   alert("Заполните поля");
                //   return;
    // }

  
    let newPost = {
      userName: localStorage.getItem('test'),
      title: addPostTitle.value,
      info: addPostInfo.value,
      other: addPostOther.value,
      image: addPostImage.value,
    };
    addPost(newPost);

    addPostTitle.value = ''
    addPostInfo.value = ''
    addPostOther.value = ''
    addPostImage.value = ''
    document.getElementById("myModal").style.display = "none";
render();

  });
  async function addPost(newPost) {
    try {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newPost),
      });
    } catch (error) {
      console.log(error);
    }
  }
//   ! READ POST
let post = document.querySelector('.post')
render();
async function render() {
  // отправка запроса для получения продуктов с сервера
  let addpost = await fetch(
    `${API}?q=${searchVal}`).then((res) => res.json());
  console.log(addPost)
  // отрисовка кнопок пагинации
//   drawPaginationButtons();
  post.innerHTML = "";
  // отрисовка карточек, где на каждый объект в post, рендерится одна карточка
  addpost.forEach((item) => {
    post.innerHTML +=`
    <div class = 'posted'>
    <div class = 'user-info'>
    <h3 class = 'post-user'>${item.userName}</h3>
    <p class = 'post-posted'>posted</p>
    </div>
    <p class = 'post-title'>${item.title}</p>
    <p class = 'post-info'>${item.info} </p>
    <p class = 'post-other'>${item.other} </p>
    <img src = ${item.image} class = 'post-image'/>
    <div class = 'post-options'> 
    <div class = 'post-buttons'>
    <button data-bs-toggle="modal" data-bs-target="#editModal" class="btn-edit" onclick="editPost(${item.id})">edit</button>
    <button onclick="deleteProduct(${item.id})" class="btn-delete">delete</button>
    </div>
    </div>
    </div>
    `
  });
}

// !DELETE


async function deleteProduct(id) {
   
        await fetch(`${API}/${id}`, { method: "DELETE" });
        render();
}

//   !Edit 

let editPostTitle = document.querySelector('.inp_edit_post_title')
let editPostInfo = document.querySelector('.inp_edit_post_info')
let editPostOther = document.querySelector('.inp_edit_post_other')
let editPostImage = document.querySelector('.inp_edit_post_image')
let editPostBtn = document.querySelector('.edit_post_btn')

  // функция, которая срабатывает при нажатии на кнопку edit, принимает id того продукта, на кнопку edit которого кликнули
async function editPost(id) {
    document.getElementById("myModalEdit").style.display = "block";
    // стягиваем редактируемый продукт
    let objToEdit = await fetch(`${API}/${id}`).then((res) => res.json());
    
  
    // заполняем инпуты в модальном окне для редактирования
    editPostTitle.value = objToEdit.title;
    editPostInfo.value = objToEdit.info;
    editPostOther.value = objToEdit.other;
    editPostImage.value = objToEdit.image;
  
    // навесили айди на кнопку сохранения изменений
    editPostBtn.setAttribute("id", id);
  }
  
  // слушатель событий на кнопке сохранения изменений
  editPostBtn.addEventListener("click", async (e) => {
    // получаем айди, который навесили выше 
    let id = e.target.id;
    // проверка на заполенность инпутов при редактировании 
    
    // собираем отредактированный продукт
    let editedPost = {
      title: editPostTitle.value,
      info: editPostInfo.value,
      other: editPostOther.value,
      image: editPostImage.value,
    };
  
    // отправляем PATCH запрос для сохранения изменений на сервере
    await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(editedPost),
    });

    closeModalEdit()
    // вызов render для того, чтобы увидеть отредактированный продукт без перезагрузки
    render();
  });
  

//   ! SEARCH
searchUsers.addEventListener("input", ()=>{
    searchVal = searchUsers.value;
    render()
  })
