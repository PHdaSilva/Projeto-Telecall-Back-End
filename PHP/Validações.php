<?php

/*if ($_SERVER["REQUEST_METHOD"] == "POST") {

$login = $_POST["login"];

$senha = $_POST["senha"];

$confirmar_senha = $_POST["confirmar-senha"];

$dataNascimento = $_POST["data"];

$nomeMaterno = $_POST["nome-materno"];

$cep = $_POST["cep"];



}*/

// Receber o dado do JavaScript
$userInput = $_POST['informacoes'];

// Realizar alguma lógica (por exemplo, verificar se o dado é válido)
if ($userInput === 'luidyw') {
    $resposta = 'Dado válido';
} else {
    $resposta = 'Dado inválido';
}

// Responder com uma mensagem
echo "<script> alert('$resposta') <script/>";
echo $resposta;

?>