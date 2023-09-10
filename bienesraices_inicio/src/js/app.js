//Asa specificam ca sa faca un listen la pagina dupa ce sa incarcat ,si sa efectuze toate fuctiile 

document.addEventListener("DOMContentLoaded", function (param) {

  eventListeners();
  darkMode();
  })

//Putem crea o functi aparte sau putem crea functia direct in listener

function darkMode(){
//asa vedem ce are stat useru pe default la browser ,adica un browser intunecat sau deschis

const prefiereDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

if (prefiereDarkMode.matches){
document.body.classList.add("dark-mode");
}else{
  document.body.classList.remove("dark-mode");
}

//iar asta o sa functioneze in cazu in care browseru tau este setat pe automat in dark mode sau deschis
//de forma automatica

prefiereDarkMode.addEventListener("change",function(){
  if (prefiereDarkMode.matches){
    document.body.classList.add("dark-mode");
    }else{
      document.body.classList.remove("dark-mode");
    }
})
  const botonDarkMode = document.querySelector(".dark-mode-boton");
  botonDarkMode.addEventListener("click",function(){

    document.body.classList.toggle("dark-mode");
  });
}

  function eventListeners (param) {
    const mobileMenu = document.querySelector(".mobile-menu");

    mobileMenu.addEventListener("click",navegationResponsive );
        
     
    }

    function navegationResponsive(){
        const navegacion = document.querySelector(".navegacion");

        //asa adaugam si scoate clasa de mostrar
        navegacion.classList.toggle("mostrar");
    }