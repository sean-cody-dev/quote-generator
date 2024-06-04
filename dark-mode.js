const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');

const elementConfig = [
    {
        id: 'nav',
        darkClass: 'nav-dark',
        lightClass: 'nav-light'
    },
    {
        id: 'text-box',
        darkClass: 'text-box-dark',
        lightClass: 'text-box-light'
    }
]

// Switch Theme Dynamically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    }
}

// Event Listeners
toggleSwitch.addEventListener('change', switchTheme);
