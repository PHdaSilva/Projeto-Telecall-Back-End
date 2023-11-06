/*Botão Rolar Pra Cima*/

function backToTop(){
    //definindo a altura que ele vai subir//
    document.documentElement.scrollTop = 0
};

window.onscroll = function(){
    //chamando a função//
    scroll();
};


function scroll(){

    //definindo variaveis//

    var btn = document.getElementById('bnt-top')

    //fazendo o botão sumir e aparecer//

    if(document.documentElement.scrollTop > 120){
        btn.style.display = 'block';
    }
    else{
        btn.style.display = 'none';
    }
};

/*Botão Rolar Pra Cima*/

/*darkmode*/


function darkmode() {
    // Adicionando a classe 'dark' no body
    document.body.classList.toggle('darkmode');

    //definindo local storage
    
    if (document.body.classList.contains('darkmode')) {;
        localStorage.setItem('mode', 'dark');
    } 

    else {
        localStorage.setItem('mode', 'light');
    }
};

// Verificar o estado do tema no LocalStorage ao carregar a página

window.addEventListener('DOMContentLoaded', function() {
    var savedMode = localStorage.getItem('mode');

    if (savedMode === 'dark') {
        document.body.classList.add('darkmode');
    }
});

/*darkmode*/

/*botões aumentar e diminuir font-size */

$(function() {

    //definindo variaveis//

    var $btnAumentar = $('#btnAumentar');
    var $btnDiminuir = $('#btnDiminuir');
    var $elemento = $('body, p, h2, li, button, h1, h3, a, label, input, select');
    var fontemax = 30;
    var fontemin = 18;
    const fontePreferida = localStorage.getItem('fontePreferida');
    let fonteAtual = fontePreferida || '18px';
    $elemento.css('font-size', fonteAtual);

    //função pra obter o tamanho da font atual//

    function obterTamnhoFonte() {

        return parseInt($elemento.css('font-size'));
    }

    //aumentando a font//

    $btnAumentar.on('click', function() {
        if(obterTamnhoFonte() < fontemax){
            
            var tamanhofonte = obterTamnhoFonte()
            tamanhofonte += 5;
            fonteAtual = tamanhofonte + 'px';
            $elemento.css('font-size', fonteAtual);
            localStorage.setItem('fontePreferida', fonteAtual);

        }

    });

    //diminuindo font//

    $btnDiminuir.on('click', function() {

        if(obterTamnhoFonte() > fontemin){

            var tamanhofonte = obterTamnhoFonte()
            tamanhofonte -= 5;
            fonteAtual = tamanhofonte + 'px';
            $elemento.css('font-size', fonteAtual);
            localStorage.setItem('fontePreferida', fonteAtual);

        }

    });
    
});

/*menu-mobile*/


//definindo constante
const btnmobile = document.getElementById('bnt-mobile');

//adicionando evento ao clicar
btnmobile.addEventListener('click', openmenu());    

function openmenu(){

    //difinindo outra constante
    const menu = document.getElementById('menu');

    //adicionando a classe 'active' ao elemento
    menu.classList.toggle('active');
};


//SubMenu Funcionalidades
function OpenSubMenu(){

    //definindo constantes
    const submenu = document.getElementById('menu-text')
    const ContentSubMenu = document.getElementById('content-sub-menu')

    //adicionando a classe 'active' ao elemento
    submenu.classList.toggle('active')

    //estrutura condicional para so funcionar em telas menores ou iguais a 768px
    if(window.innerWidth <= 768){
        if (submenu.classList.contains('active') ) {
            ContentSubMenu.style.display = 'block';
        }
    
        else {
            ContentSubMenu.style.display = 'none';
        }
    }
}

function OpenMenuConta(){

    //definindo constantes
    const menuConta = document.getElementById('logado')
    const logadoContent = document.getElementById('logado-content')

    //adicionando a classe 'active' ao elemento
    menuConta.classList.toggle('active')

    //estrutura condicional para so funcionar em telas menores ou iguais a 768px
    if(window.innerWidth <= 768){
        if (menuConta.classList.contains('active') ) {
            logadoContent.style.display = 'block';
        }
    
        else {
            logadoContent.style.display = 'none';
        }
    }
}
/*menu-mobile*/
