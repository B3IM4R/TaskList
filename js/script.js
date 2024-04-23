// Limpia el localStorage
// localStorage.clear();
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes("index.html")){
        cargarTareas();
    }
    if (window.location.pathname.includes("lista.html")){
        cargarTareas2();
    }
    else if (window.location.pathname.includes("detalles.html")){
        cargarTareas();   
    }
    
});

document.getElementById('openFormBtn').addEventListener('click', function() {
    document.getElementById('taskForm').classList.remove('hidden');
});

document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const formData = new FormData(event.target);
    const date = formData.get('date');
    const priority = formData.get('priority');
    const category = formData.get('category');
    const task = formData.get('task');

    // Guardar la tarea en el localStorage
    guardarTarea({ date, priority, category, task });

    // Crear una nueva tarjeta de tarea con los datos del formulario
    const newTaskCard = crearTarjetaTarea(date, priority, category, task);

    // Agregar la nueva tarjeta de tarea a la lista de tareas
    document.getElementById('taskList').appendChild(newTaskCard);

    // Cambiar color
    cambiarColorPrioridad();

    // Ocultar el formulario
    document.getElementById('taskForm').classList.add('hidden');
});

// Función para guardar la tarea en localStorage
function guardarTarea(tarea) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para cargar las tareas desde localStorage
function cargarTareas() {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    if (tareas.length > 0) {
        tareas.forEach(tarea => {
            const { date, priority, category, task } = tarea;
            const newTaskCard = crearTarjetaTarea(date, priority, category, task);
            document.getElementById('taskList').appendChild(newTaskCard);
        });
        cambiarColorPrioridad();
    } else {
        // Si no hay tareas, no se hace nada
    }
}

function cargarTareas2() {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareas.forEach(tarea => {
        const { date, priority, category, task } = tarea;
        const newTaskCard = crearTarjetaTarea2(date, priority, category, task);
        document.getElementById('listaTareas').appendChild(newTaskCard);
    });
    cambiarColorPrioridad();
}

// Función para crear una tarjeta de tarea
function crearTarjetaTarea(date, priority, category, task) {
    const newTaskCard = document.createElement('div');
    newTaskCard.classList.add('card', 'mt-8', 'task-card');
    newTaskCard.innerHTML = `
        <div class="header flex items-center">
            <div class="header-text flex items-center">
                <i id="calendar" class="bi bi-calendar-fill text-gray-500 text-xl mr-1 ms-1.5"></i>
                <p class="f1 pl-1">${date}</p>
            </div>
            <div>
                <p class="mod font-medium priority">${priority}</p>
            </div>
        </div>
        <div class="line"></div>
        <div class="card-body p-4">
            <p class="f">${category}</p>
            <h2 class="font-medium text-lg">${task}</h2>
        </div>
    `;
    return newTaskCard;
}

function crearTarjetaTarea2(date, priority, category, task) {
    const newTaskCard = document.createElement('div');
    newTaskCard.classList.add('card', 'mt-8', 'task-card');
    newTaskCard.innerHTML = `
        <div class="header flex items-center">
            <div class="header-text flex items-center">
                <i id="calendar" class="bi bi-calendar-fill text-gray-500 text-xl mr-1 ms-1.5"></i>
                <p class="f1 pl-1">${date}</p>
            </div>
            <div>
                <p class="mod font-medium priority">${priority}</p>
            </div>
        </div>
        <div class="line"></div>
        <div class="card-body p-4">
            <div class="flex">
                <p class="f">${category}</p>
                <input type="checkbox" class="checkbox [--chkbg:theme(colors.slate.100)] [--chkfg:theme(colors.zinc.600)] me-1"/>
            </div>
            <div class="flex justify-between">
              <h2 class="font-medium text-lg">${task}</h2>
              <button type="button" class="text-error me-1 pe-0.5">
                <i class="bi bi-trash3-fill text-xl"></i>
              </button>
            </div>
        </div>
    `;
    return newTaskCard;
}

// Función para cambiar el color del encabezado y la clase "mod" de las tarjetas según la prioridad seleccionada
function cambiarColorPrioridad() {
    const cards = document.querySelectorAll('.task-card');
    cards.forEach(card => {
        const priority = card.querySelector('.priority').textContent;
        const header = card.querySelector('.header');
        const mod = card.querySelector('.mod');
        if (priority === 'Baja') {
            header.style.backgroundColor = '#6FC866';
            mod.style.color = '#0D8B00';
        }
        if (priority === 'Urgente') {
            header.style.backgroundColor = '#F54F42';
            mod.style.color = '#8F0A00';
        }
    });
}