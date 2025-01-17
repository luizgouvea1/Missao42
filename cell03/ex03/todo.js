document.addEventListener('DOMContentLoaded', function() {
    const ft_list = document.getElementById('ft_list');
    const new_task_button = document.getElementById('new_task');

    // Carregar tarefas do cookie
    loadTasksFromCookie();

    new_task_button.addEventListener('click', function() {
        const task_text = prompt("Digite sua nova tarefa:");
        if (task_text && task_text.trim() !== "") { // Verifica se o texto não é vazio
            addTaskToList(task_text);
            saveTasksToCookie(); // Salva as tarefas no cookie após adicionar uma nova
        }
    });

    function addTaskToList(task_text) {
        const new_task = document.createElement('div');
        new_task.textContent = task_text;

        new_task.addEventListener('click', function() {
            if (confirm("Deseja remover esta tarefa?")) {
                ft_list.removeChild(new_task);
                saveTasksToCookie();// Salva as tarefas no cookie após remover
            }
        });

        ft_list.insertBefore(new_task, ft_list.firstChild); // Adiciona no topo
    }

    // Funções para manipulação de cookies (adaptadas para armazenar um array)
    function saveTasksToCookie() {
        const tasks = Array.from(ft_list.children).map(task => task.textContent);
        document.cookie = "tasks=" + JSON.stringify(tasks) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT"; // Cookie com longa duração
    }

    function loadTasksFromCookie() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith("tasks=")) {
                const tasks = JSON.parse(cookie.substring("tasks=".length, cookie.length));
                tasks.forEach(task => addTaskToList(task));
                return;
            }
        }
    }
});