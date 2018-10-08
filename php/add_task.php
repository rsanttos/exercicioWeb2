<?php
    $tarefas = null;
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        if(!empty($_POST['tarefas'])) {
            $tarefas = $_POST['tarefas'];
            $users = fopen("tasks.json","w+") or die("unable to open file!");
            echo $tarefas;
            fwrite($users, $tarefas);
            fclose($users);
        } else {
            echo "Valores a adicionar estão vazios. Nada a inserir!";
        }
    }
?>