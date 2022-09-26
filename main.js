import './style.scss';

import * as bootstrap from 'bootstrap';


let searchBox = document.querySelector(".search-box");

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("bi-search") || e.target.classList.contains("searchInput")){
        searchBox.classList.remove("d-none");
    }
    else
    {
        searchBox.classList.add("d-none");
    }
})

let productLists = document.querySelector(".products")
let children = [...productLists.childNodes];
let products = [];
for(let child in children )
{
    if(child % 2 !== 0)
    {
        products.push(children[child]);
    }
}
products.forEach((value)=>{
    console.log(value)
    value.addEventListener("mousemove",e=>{
        if (e.path[2].classList.contains("col-12","col-lg-3"))
        {
            e.path[2].childNodes[1].childNodes[5].classList.add("show");
            e.path[2].childNodes[3].childNodes[5].classList.add("active");
            e.path[2].childNodes[3].childNodes[3].childNodes[0].classList.add("active")
        }else if(e.path[3].classList.contains("col-12","col-lg-3")) {
            e.path[3].childNodes[1].childNodes[5].classList.add("show");
            e.path[3].childNodes[3].childNodes[5].classList.add("active");
            e.path[3].childNodes[3].childNodes[3].childNodes[0].classList.add("active")
        }
    })
})
products.forEach((value)=>{
    value.addEventListener("mouseout",e=>{
        if (e.path[2].classList.contains("col-12","col-lg-3"))
        {
           setTimeout(_=>{
               e.path[2].childNodes[1].childNodes[5].classList.remove("show");
               e.path[2].childNodes[3].childNodes[5].classList.remove("active");
               e.path[2].childNodes[3].childNodes[3].childNodes[0].classList.remove("active")
           },1000)
        }else if(e.path[3].classList.contains("col-12","col-lg-3")) {
            setTimeout(_=>{
                e.path[3].childNodes[1].childNodes[5].classList.remove("show");
                e.path[3].childNodes[3].childNodes[5].classList.remove("active");
                e.path[3].childNodes[3].childNodes[3].childNodes[0].classList.remove("active")
            },1000)
        }
    })
})