<?php
session_start();

// Definindo variáveis
$userLogin = $_POST['userLogin'];
$senhaLogin = $_POST['senhaLogin'];

// Puxando elementos do local storage
$loginSalvo = $_SESSION['login'];
$senhaSalva = $_SESSION['senha'];

if ($_SESSION['User'] === 'On') {
    echo "<script>
            document.getElementById('entrar').style.display = 'none';
            document.getElementById('registrar').style.display = 'none';
            document.getElementById('username').innerHTML = '$loginSalvo';
            document.getElementById('logado').style.display = 'block';
          </script>";
} else {
    echo "<script>
            document.getElementById('logado').style.display = 'none';
            document.getElementById('entrar').style.display = 'block';
            document.getElementById('registrar').style.display = 'block';
          </script>";
}

if ($_SESSION['User'] === 'On' && $_SESSION['windowWidth'] <= 768) {
    echo "<script>
            document.getElementById('icone-conta').style.display = 'block';
          </script>";
}

// Executando a função sempre que o input é desselecionado
echo "<script>
        $('#login-bnt').on('click', function() {
            checkStorage();
        });
      </script>";

// Função de validar
echo "<script>
        function checkStorage() {
            validadorCondicoes = true;
            const userLoginValue = '$userLogin';
            const senhaLoginValue = '$senhaLogin';

            if (userLoginValue !== '$loginSalvo') {
                validadorCondicoes = false;
                Erro(userLogin, 'Login ou Senha Incorretos');
            } else {
                Sucesso(userLogin);
            }

            if (senhaLoginValue !== '$senhaSalva') {
                validadorCondicoes = false;
                Erro(senhaLogin, 'Login ou Senha Incorretos');
            } else {
                Sucesso(senhaLogin);
            }

            if (validadorCondicoes) {  
                if (event.target.id === 'login-bnt') {
                    window.location.href = '/index.html';
                    Salvarlogin();
                }
            }
        }
      </script>";
    // função adicionar erro
      function addError($input, $message) {
          echo "
              <script>
                  const formControl = document.getElementById('$input').parentElement;
                  const small = formControl.querySelector('small');
                  small.innerText = '$message';
                  formControl.classList.remove('sucesso');
                  formControl.classList.add('erro');
              </script>";
      }
      
      function addSuccess($input) {
          echo "
              <script>
                  const formControl = document.getElementById('$input').parentElement;
                  formControl.classList.remove('erro');
                  formControl.classList.add('sucesso');
              </script>";
      }
      
      function salvarLogin() {
          echo "
              <script>
                  localStorage.setItem('User', 'On');
              </script>";
      }
      
      function deslogar() {
          echo "
              <script>
                  localStorage.setItem('User', 'Off');
                  location.reload();
              </script>";
      }
      
      echo "
          <script>
              document.getElementById('sair').addEventListener('click', function() {
                  deslogar();
              });
          </script>";
?>