$(document).ready(function(){
    //definindo variaveis

    const userLogin = $('#user-login')
    const senhaLogin = $('#senha-login')

    //puxando elementos do local storage
    let loginSalvo = localStorage.getItem('login')
    let senhaSalva = localStorage.getItem('senha')

    if (localStorage.getItem('User') === 'On') {
        $('#entrar').css('display', 'none');
        $('#registrar').css('display', 'none');
        $('#username').html(loginSalvo);
        $('#logado').css('display', 'block'); 
    }
    else{
        $('#logado').css('display', 'none'); 
        $('#entrar').css('display', 'block');
        $('#registrar').css('display', 'block'); 
    }

    if(localStorage.getItem('User') === 'On' && window.innerWidth <= 768){
        $('#icone-conta').css('display', 'block')
    }

    //executando a função sempre que o input e desselecionado
    userLogin.on('blur', checkStorage);
    senhaLogin.on('blur', checkStorage);

    $('#login-bnt').on('click', function(){

        checkStorage()

    });

    //função de validar

    function checkStorage(){
        validadorCondicoes = true
        const userLoginValue = userLogin.val();
        const senhaLoginValue = senhaLogin.val();

        if(userLoginValue !== loginSalvo){
            validadorCondicoes = false
            Erro(userLogin, 'Login ou Senha Incorretos');
        }

        else{
            Sucesso(userLogin);
        }


        if(senhaLoginValue !== senhaSalva){
            validadorCondicoes = false
            Erro(senhaLogin, 'Login ou Senha Incorretos');
        }

        else{
            Sucesso(senhaLogin);
        }

        if (validadorCondicoes){

            // Redirecionar para outra página apenas se o botão login for clicado
            if (event.target.id === 'login-bnt') {
                window.location.href = '/index.html';
                Salvarlogin()
            }
        }
    }

    //função de adicionar erro

    function Erro(input, message) {
        const formControl = input.parent();
        const small = formControl.find('small');
    
        //Adiciona a mensagem de erro
        small.text(message);
    
        //Adiciona a classe de erro
        formControl.removeClass('sucesso').addClass('erro');
      }
      //função de adicionar sucesso

      function Sucesso(input) {
        const formControl = input.parent();
    
        // Adiciona a classe de sucesso
        formControl.removeClass('erro').addClass('sucesso');
      }

      function Salvarlogin(){
        localStorage.setItem('User', 'On')
    };
    
    function Deslogar(){
        localStorage.setItem('User', 'Off')
        location.reload(); // recarrega a página
    };

    $('#sair').on('click', Deslogar);
});
