$(document).ready(function() {
    const nomecompleto = $('#nome');
    const datanascimento = $('#data');
    const genero = $('#genero')
    const nomematerno = $('#nome-materno');
    const cpf = $('#cpf');
    const telefone = $('#telefone');
    const celular = $('#celular');
    const cep = $('#cep');
    const estado = $('#estado');
    const cidade = $('#cidade');
    const nomeRua = $('#nome-rua');
    const bairro = $('#bairro');
    const numerocasa = $('#numero-casa');
    const email = $('#email');
    const senha = $('#senha');
    const confirmarsenha = $('#confirmar-senha');
    const login = $('#login');
    let savedlogin = '';
    let savedSenha = '';
    let savedcep = '';
    let savednomeMaterno = '';
    let saveddataNascimento = '';

    // Adiciona o evento de desfoco para cada campo de entrada
    nomecompleto.on('blur', checkInputs);
    nomematerno.on('blur', checkInputs);
    cpf.on('blur', checkInputs);
    telefone.on('blur', checkInputs);
    celular.on('blur', checkInputs);
    cep.on('blur', checkInputs);
    cep.on('input', checkInputs);
    estado.on('blur', checkInputs);
    cidade.on('blur', checkInputs);
    nomeRua.on('blur', checkInputs);
    bairro.on('blur', checkInputs);
    numerocasa.on('blur', checkInputs);
    email.on('blur', checkInputs);
    senha.on('blur', checkInputs);
    confirmarsenha.on('blur', checkInputs);
    genero.on('blur', checkInputs);
    datanascimento.on('blur', checkInputs);
    login.on('blur', checkInputs);


    $('#submit').on('click', function(){

        checkInputs();

    });
    
    function preencherEndereco(endereco) {
      estado.val(endereco.uf);
      cidade.val(endereco.localidade);
      nomeRua.val(endereco.logradouro);
      bairro.val(endereco.bairro);
      
      // Chamada da função checkInputs após o preenchimento dos campos
      checkInputs()
    }

    cep.on('input', function() {
      const cepValue = cep.val();
      if (cepValue.length === 8) {
        $.ajax({
          url: `https://viacep.com.br/ws/${cepValue}/json/`,
          type: 'GET',
          success: function(response) {
            if (!response.erro) {
              preencherEndereco(response);
            }
          }
        });
      }
      checkInputs();
    });

    function checkInputs() {
      const emailValue = email.val();
      const senhaValue = senha.val();
      const confirmarsenhaValue = confirmarsenha.val();
      const nomecompletoValue = nomecompleto.val();
      const nomematernoValue = nomematerno.val();
      const cpfValue = cpf.val();
      const telefoneValue = telefone.val();
      const celularValue = celular.val();
      const cepValue = cep.val();
      const estadoValue = estado.val();
      const cidadeValue = cidade.val();
      const nomeRuaValue = nomeRua.val();
      const bairroValue = bairro.val();
      const numerocasaValue = numerocasa.val();
      const datanascimentoValue = datanascimento.val();
      const generoValue = genero.val()
      const loginValue = login.val();
      let todasCondicoesAtendidas = true;
  
      if (nomecompletoValue === '') {
        Erro(nomecompleto, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } 
      else if (!validarNome(nomecompletoValue)) {
        Erro(nomecompleto, 'O nome precisa ter entre 15 a 60 letras');
        todasCondicoesAtendidas = false;
      } 
      else {
        Sucesso(nomecompleto);
      }
  
      if (nomematernoValue === '') {
        Erro(nomematerno, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } 
      else if (!validarNome(nomematernoValue)) {
        Erro(nomematerno, 'O nome precisa ter entre 15 a 60 letras');
        todasCondicoesAtendidas = false;
      } 
      else {
        Sucesso(nomematerno);
      }

      if (datanascimentoValue === '') {
        Erro(datanascimento, 'Obrigatório');
        todasCondicoesAtendidas = false;
      }
      else {
        // Verificar a idade
        var dataNascimento = new Date(datanascimentoValue);
        var hoje = new Date();
        var idade = hoje.getFullYear() - dataNascimento.getFullYear();
      
        // Verificar se o aniversário ainda não ocorreu este ano
        if (hoje.getMonth() < dataNascimento.getMonth() || (hoje.getMonth() == dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate())) {
          idade--;
        }
      
        if (idade < 18) {
          Erro(datanascimento, 'Você precisa ter no mínimo 18 anos.');
          todasCondicoesAtendidas = false;
        } else {
          Sucesso(datanascimento);
        }
      }

      if (generoValue === 'selecione') {
        Erro(genero, 'Obrigatório');
        todasCondicoesAtendidas = false;
      }
      else if(generoValue !== 'selecione'){
        Sucesso(genero);
      }

      if (cpfValue === '') {
        Erro(cpf, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (!validarCPF(cpfValue)) {
        Erro(cpf, 'Por favor insira um CPF válido');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(cpf);
      }
  
      if (telefoneValue === '') {
        Erro(telefone, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (!validarTelefone(telefoneValue)) {
        Erro(telefone, 'O formato deve ser (+55)XX-XXXXXXXX');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(telefone);
      }
      
      if (celularValue === '') {
        Erro(celular, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (!validarCelular(celularValue)) {
        Erro(celular, 'O formato deve ser (+55)XX-XXXXXXXXX');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(celular);
      }
  
      if (cepValue === '') {
        Erro(cep, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } 

      else if(cepValue.length !== 8){
        Erro(cep, 'Informe um CEP válido');
        todasCondicoesAtendidas = false;
      }

      else {
        Sucesso(cep);
      }

      if (estadoValue === 'selecione') {
        Erro(estado, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(estado);
      }

      if (cidadeValue === '') {
        Erro(cidade, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(cidade);
      }

      if (nomeRuaValue === '') {
        Erro(nomeRua, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(nomeRua);
      }

      if (bairroValue === '') {
        Erro(bairro, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(bairro);
      }

      if (numerocasaValue === '') {
        Erro(numerocasa, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(numerocasa);
      }

      if (emailValue === '') {
        Erro(email, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (!validaremail(emailValue)) {
        Erro(email, 'Informe um Email com @ e .com');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(email);
      }
  
      if (senhaValue === '') {
        Erro(senha, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (!validarSenha(senhaValue)) {
        Erro(senha, 'A senha deve conter apenas 8 letras');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(senha);
      }
  
      if (confirmarsenhaValue === '') {
        Erro(confirmarsenha, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (confirmarsenhaValue !== senhaValue) {
        Erro(confirmarsenha, 'As senhas não são iguais');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(confirmarsenha);
      }

      if (nomecompletoValue === '') {
        Erro(nomecompleto, 'Obrigatório');
        todasCondicoesAtendidas = false;
      } else if (!validarNome(nomecompletoValue)) {
        Erro(nomecompleto, 'O nome precisa ter entre 15 a 60 letras');
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(nomecompleto);
      }

      if (loginValue === "") {
        Erro(login, "obrigatório");
        todasCondicoesAtendidas = false;
      } else if (!validarLogin(loginValue)) {
        Erro(login, "Informe um usuário com 6 letras e nenhum número");
        todasCondicoesAtendidas = false;
      } else {
        Sucesso(login);
      }
      
      // Verifique todas as outras condições de validação e atualize 'todasCondicoesAtendidas' conforme necessário
      
      if (todasCondicoesAtendidas === true) {
        // Atribuir os valores a variaves 
        savedlogin = loginValue;
        savedSenha = senhaValue;
        savedcep = cepValue;
        savednomeMaterno = nomematernoValue;
        saveddataNascimento = datanascimentoValue;
    
        if (savedlogin !== '' && savedSenha !== '' && savedcep !== ''&& savednomeMaterno !== ''&& saveddataNascimento !== '') {
          /*var dados = {
            login: savedlogin,
            senha: savedSenha,
            cep: savedcep,
            nomeMaterno: savednomeMaterno,
            dataNascimento: saveddataNascimento
          };*/
        }

      $.ajax({
        url: '../php/Validações.php',
        type: 'POST',
        data: { informacoes: savedlogin },
       /* success: function(response) {
          // Lidar com a resposta bem-sucedida do servidor
          console.log('Resposta do servidor:', response);
        },
        error: function(error) {
          // Lidar com erros na requisição ou resposta
          console.error('Erro na requisição:', error);
        }*/
      });

        if (event.target.id === 'submit') {
        window.location.href = '/Páginas/login.html';
        }

      }
    }

    
  
    function Erro(input, message) {
      const formControl = input.parent();
      const small = formControl.find('small');
  
      //Adiciona a mensagem de erro
      small.text(message);
  
      //Adiciona a classe de erro
      formControl.removeClass('sucesso').addClass('erro');
    }
  
    function Sucesso(input) {
      const formControl = input.parent();
  
      // Adiciona a classe de sucesso
      formControl.removeClass('erro').addClass('sucesso');
    }
  
    function validarCPF(cpf) {
      cpf = cpf.replace(/[^\d]+/g, ''); // remove caracteres não numéricos
      if (cpf === '') return false; // verifica se o CPF está vazio
      // Verifica se o CPF tem 11 dígitos
      if (cpf.length !== 11 || cpf.match(/(\d)\1{10}/)) return false;
      var soma = 0;
      var resto;
      for (var i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }

      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(9, 10))) return false;
      soma = 0;
      for (var i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }

      resto = (soma * 10) % 11;
      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    }
  
    function validarNome(nomecompleto) {
      const regex = /^[a-zA-Z ]{15,60}$/; // Expressão regular para validar o formato do nome
      return regex.test(nomecompleto);
    }
  
    function validarTelefone(telefone) {
      const telefoneRegex = /^\(\+55\)\d{2}-\d{8}$/;
      return telefoneRegex.test(telefone);
    }
  
    function validarCelular(celular) {
      const regex = /^\(\+55\)\d{2}-\d{9}$/; // Expressão regular para validar o formato
      return regex.test(celular); // Testa se o celular corresponde ao formato esperado
    }

    function validaremail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validar o formato do email
        return regex.test(email);
    }
      
    function validarSenha(senha) {
      // Verifica se a senha tem menos de 8 caracteres
      if (senha.length < 8) {
        return false;
      }
  
      // Verifica se a senha contém caracteres que não são letras
      if (/[^a-zA-Z]/.test(senha)) {
        return false;
      }
  
      // Se chegou aqui, a senha é válida
      return true;
    }

    function validarLogin(login) {
      const regex = /^[a-zA-Z]{6}$/; // expressão regular para validar 6 letras
      if (regex.test(login)) {
        return true; // login válido
      } else {
        return false; // login inválido
      }
    }

    cpf.keypress(function() {
      var cpfTamanho = cpf.val().length;

      if (cpfTamanho === 3 || cpfTamanho === 7) {
          cpf.val(cpf.val() + ".");
      } 

      else if (cpfTamanho === 11) {
          cpf.val(cpf.val() + "-");
      }

    });

    telefone.keypress(function() {
      var telefoneTamanho = telefone.val().length;
    
      if (telefoneTamanho === 2) {
        telefone.val("(" + "+" + telefone.val() + ")");
      } 
    
      else if (telefoneTamanho === 7) {
        telefone.val(telefone.val() + "-");
      }
    
    });

    celular.keypress(function() {
      var celularTamanho = celular.val().length;
    
      if (celularTamanho === 2) {
        celular.val("(" + "+" + celular.val() + ")");
      } 
    
      else if (celularTamanho === 7) {
        celular.val(celular.val() + "-");
      }
    
    });

});