document.addEventListener("DOMContentLoaded",function(){
    iniciarApp()
})


function iniciarApp(){
    // functia asta o folosim pentru a adaugam imagini de froma dinamica
crearGaleria()

// functia asta o folosim pentru a face scroll mai usor pe pagina
scrollNav()

// asa specificam ca vrem sa avem nav baru fix cand facem scroll
navegacionFija()
}

function navegacionFija(){
    const bara = document.querySelector(".header")
    const sobreFestival = document.querySelector(".sobre-festival")
    const body = document.querySelector("body")

    window.addEventListener("scroll",function(){
        if(sobreFestival.getBoundingClientRect().bottom <0){
            bara.classList.add("fijo")
            body.classList.add("body-scroll")
                }else{
                    bara.classList.remove("fijo")
                    body.classList.remove("body-scroll")

                }
    }
   
    )
}

function scrollNav(){
    const enlaces  = document.querySelectorAll(".navegacion-principal a")
    enlaces.forEach(enlace=>{
enlace.addEventListener("click",function(e){
    e.preventDefault()
const sectionScroll = e.target.attributes.href.value
    const section = document.querySelector(sectionScroll)
    section.scrollIntoView({behavior:"smmoth"})
})
    })
}

function crearGaleria(){
    const galeria = document.querySelector(".galeria-imagenes")
   
    for(let i=1;i<=12;i++){
        const imagen = document.createElement("picture")
        imagen.innerHTML=
        ` 
        <img src="build/img/thumb/${i}.jpg"  alt="imagen galeria ">`
          
        
        imagen.onclick=function(){
            monstrarImagen(i)
        }
        galeria.appendChild(imagen)
    }
}

function monstrarImagen(id){
    const imagen = document.createElement("picture")
    imagen.innerHTML=  `<img src="build/img/grande/${id}.jpg"  alt="imagen galeria ">`


    //crear el overlay de la imgen
    const overlay= document.createElement("DIV")
    overlay.appendChild(imagen)
    overlay.classList.add("overlay")

    overlay.onclick=function(){
        const body = document.querySelector("body")

        body.classList.remove("fijar-body")
        overlay.remove()
    }

    //button pentru a inchide fereastra imagini

    const cerrarModal=document.createElement("P")

    cerrarModal.textContent="X"
    cerrarModal.classList.add("BTN-cerrar")
cerrarModal.onclick=function(){
    const body = document.querySelector("body")

    body.classList.remove("fijar-body")
    overlay.remove()
}
    overlay.appendChild(cerrarModal)

    //adaugam la html
    const body = document.querySelector("body")

    body.appendChild(overlay)
    body.classList.add("fijar-body")

}