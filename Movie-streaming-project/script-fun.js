const movielist = document.getElementById("movie-list-con");
const moviebody1 = document.getElementById("movie_body-1");
const moviebody2 = document.getElementById("movie_body-2");
const moviebody3 = document.getElementById("movie_body-3");
const moviebody4 = document.getElementById("movie_body-4");
const wrapper = document.getElementById("wrapper-container");
const overlayitems = document.getElementById("overlay_items");
const overlaytitle = document.getElementById("overlay_title");
const overlaycon = document.getElementById("overlay-con");
const overlayexit = document.getElementById("overlay_exit");
const overlaywrapper = document.getElementById("overlay_wrapper");
const overlaywrapper_title = document.getElementById("wrap_title");
const overlaywrapper_duration = document.getElementById("wrap_duration");
const overlaywrapper_desc = document.getElementById("wrap_desc");
const overlaywrapper_type = document.getElementById("wrap_type");
const searchicon= document.getElementById("search-icon");
const searchinput= document.getElementById("search-input");
const watchlist= document.getElementById("watchlist");
const slideleft= document.getElementById("slideleft");
const slideright= document.getElementById("slideright");


// !  createing the tags

let createtag = (tag) => {
  return document.createElement(tag);
};

// ! generating main page image content

const generateapi = async (query) => {
  if(query===''){
   query='m'
  }

  let api= await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=10466a4e89ca53eb0a38972bc923f496&query=${query}`
  );

  api = await api.json();
  console.log(api);

  api.results.forEach((ele) => {
    let listitem = createtag("div");
    let imgdesc = createtag("div");
    let image = createtag("img");
    let desc_h3 = createtag("h3");
    let year = createtag("p");

    listitem.classList = "list-item";
    imgdesc.classList = "img-desc";
    image.src = `https://image.tmdb.org/t/p/w500${ele.poster_path}`;
    desc_h3.textContent = ele.title;
    year.textContent = `(${ele.release_date.slice(0, 4)})`;

    listitem.appendChild(image);
    listitem.appendChild(imgdesc);
    imgdesc.appendChild(desc_h3);
    imgdesc.appendChild(year);
    movielist.appendChild(listitem);
  });
};
generateapi('m');


// ! Fetching api for each of the Genre section

const fetchapi = async (query, id) => {
  let api = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=10466a4e89ca53eb0a38972bc923f496&query=${query}`
  );
  api = await api.json();

  api.results.forEach((ele, index) => {
    let movieitem = createtag("div");
    let imagecon = createtag("div");
    let image = createtag("img");
    let title = createtag("h4");

    if (ele.poster_path === null) {
      image.style.display = "none";
      title.style.display = "none";
    }

    image.src = `https://image.tmdb.org/t/p/w500${ele.poster_path}`;
    title.textContent = `${ele.title} (${ele.release_date.slice(0, 4)})`;

    movieitem.classList = "movies_item";

    //! adding event listners for each of the movie Items and calling calloverlay() function
    movieitem.addEventListener("click", () => {
      calloverlay(ele);
    }); 

    imagecon.appendChild(image);
    movieitem.appendChild(imagecon);
    movieitem.appendChild(title);
    id.appendChild(movieitem);
  });
};

fetchapi("p", moviebody1);
fetchapi("devil", moviebody2);
fetchapi("animat", moviebody3);
fetchapi("love", moviebody4);

// !Adding  event listeners for seemore option

document.querySelectorAll(".seemore").forEach((ele, index) => {
  ele.addEventListener("click", () => {
    overlayitems.innerHTML = "";

    if (index === 0) {
      overlaytitle.textContent = "Action";
      fetchapi("p", overlayitems);
    } else if (index === 1) {
      overlaytitle.textContent = "Horror";
      fetchapi("devil", overlayitems);
    } else if (index === 2) {
      overlaytitle.textContent = "Fantasy";
      fetchapi("animat", overlayitems);
    } else if (index === 3) {
      overlaytitle.textContent = "Romance";
      fetchapi("love", overlayitems);
    }
  });
});

// ! calloverlay function for movieitem to display

let calloverlay = (ele) => {
  console.log(ele);

overlaywrapper_title.textContent=ele.title
overlaywrapper_duration.textContent=`${ele.release_date.slice(0, 4)} | ${ele.vote_average} | ${ele.original_language}`

if(ele.overview.length>300){
    overlaywrapper_desc.textContent=ele.overview.slice(0,10)
}else{
    overlaywrapper_desc.textContent=ele.overview
}

overlaywrapper_type.textContent=ele.original_title
overlaywrapper.style.backgroundImage= `url(https://image.tmdb.org/t/p/w500${ele.backdrop_path})`

  overlaycon.style.display = "block";
  setTimeout(() => {
    overlaywrapper.style.top = `${60}%`;
  }, 100);
};

// ! Addevent listener for again set movieitem to none

window.addEventListener("popstate", () => {
  overlaycon.style.display = "none";
  overlaywrapper.style.top = `${150}%`;
});


// !Addevent listener for overlay exit option

overlayexit.addEventListener("click", () => {
  overlaywrapper.style.top = `${150}%`;
  setTimeout(() => {
    overlaycon.style.display = "none";
  }, 100);
});


// ! adding event listeners for search box

searchicon.addEventListener('click',()=>{
  let query=searchinput.value
  movielist.innerHTML='';
   generateapi(query) 
})

searchinput.addEventListener('input',(e)=>{
  if(e.target.value===""){
  movielist.innerHTML='';
    generateapi('m');
  
  }
})

// ! addig event listener for watchlist 

watchlist.addEventListener('click',()=>{
  watchlist.textContent="Watchlist Added";
  watchlist.style.color='red'
  let sibling=watchlist.previousElementSibling
  sibling.style.color='red'
})

// ! handling slider functions

slideleft.addEventListener('click',()=>{
  slideleft.classList.add('active_left');
  setTimeout(()=>{
    slideleft.classList.remove('active_left');
  },200)
})

slideright.addEventListener('click',()=>{
  slideright.classList.add('active_right');
  setTimeout(()=>{
    slideright.classList.remove('active_right');
  },200)
})








// const apifetching=async ()=>{
//     let api=await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=10466a4e89ca53eb0a38972bc923f496&language=en-US')
//     api=await api.json();

//     api.genres.forEach((ele)=>{
//         console.log(ele.name);
//     })
// }
//   apifetching()
