const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const themeToggle = document.getElementById('theme-toggle');

const THEME_KEY = 'todo-theme';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
};

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem(THEME_KEY, currentTheme);
});

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    return;
  }

  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  todoInput.value = '';
  todoInput.focus();
});
