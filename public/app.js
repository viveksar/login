let check=document.querySelector('.change')
let table=document.querySelector('.table')
table.style.display="none"
check.addEventListener('click',()=>{
    if (table.style.display==="none"){
        check.textContent="Hide Profile"
        table.style.display="block"
    }else{
        check.textContent="My profile"
        table.style.display="none"
    }
})