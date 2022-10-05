import './style.scss';
import * as bootstrap from 'bootstrap';
import $, { each } from 'jquery'
window.jQuery = window.$ = $;

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

let thumbnails = document.getElementsByClassName("thumbnail");
let activeImg = document.getElementsByClassName("thumbnail active");
let feature = document.getElementsByClassName("feature");

let eachThumbnail = Array.from(thumbnails);
for(let x of eachThumbnail)
{
    if(x.classList.contains("active"))
    {
        feature[0].src = x.src;
    }
}
for(let i = 0; i<thumbnails.length ; i++)
{
    thumbnails[i].addEventListener("mouseover",function(){
        if(activeImg.length > 0)
        {
            activeImg[0].classList.remove("active");
        }
            this.classList.add("active");
            document.getElementsByClassName("feature")[0].src = this.src
        if(activeImg.length > 0)
        {
            feature[0].src = this.src;
        }        
    })
}

let upBtn = document.querySelector(".upBtn");
let downBtn = document.querySelector(".downBtn");

downBtn.addEventListener('click',function(e){    
    document.querySelector(".slider").scrollTop += 180;
})
upBtn.addEventListener('click',function(e){    
    document.querySelector(".slider").scrollTop -= 180;
})

console.log(window.innerWidth);

let leftBtn = document.querySelector(".leftBtn");
let rightBtn = document.querySelector(".rightBtn");

leftBtn.addEventListener('click',function(e){    
    document.querySelector(".slider").scrollLeft -= 180;
})
rightBtn.addEventListener('click',function(e){    
    document.querySelector(".slider").scrollLeft += 180;
})
