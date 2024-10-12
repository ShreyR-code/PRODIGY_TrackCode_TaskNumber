// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic project loading
const projects = [
    {
        title: "Project 1",
        description: "This is a description of project 1. It showcases web development skills."
    },
    {
        title: "Project 2",
        description: "This is a description of project 2. It includes interactive UI features."
    },
    {
        title: "Project 3",
        description: "This is a description of project 3. It focuses on responsive design."
    }
];

const projectsContainer = document.getElementById('projects');

// Function to load projects dynamically
function loadProjects() {
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');

        const title = document.createElement('h3');
        title.textContent = project.title;

        const description = document.createElement('p');
        description.textContent = project.description;

        projectElement.appendChild(title);
        projectElement.appendChild(description);
        projectsContainer.appendChild(projectElement);
    });
}

// Call the function to load projects when the page loads
document.addEventListener("DOMContentLoaded", function() {
    console.log("Website loaded by Shrey Rawal!");
    loadProjects();
});
