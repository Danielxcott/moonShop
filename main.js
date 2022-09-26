import './style.scss';

import * as bootstrap from 'bootstrap';


let searchBox = document.querySelector(".search-box");

document.addEventListener("click",(e)=>{
    e.stopPropagation();
    if(e.target.classList.contains("bi-search") || e.target.getAttribute("class")==="searchInput"){
        searchBox.classList.remove("d-none");
    }
    else
    {
        searchBox.classList.add("d-none");
    }
})