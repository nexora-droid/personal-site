/* I changed my mind, not pulling from GitAPI
const projectWrapper = document.getElementById('projects-wrapper');
const username = 'nexora-droid';
async function fetchRepos(){
    try{
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await res.json();
        projectWrapper.innerHTML = '';
        repos.forEach(repo => {
            const card=document.createElement('div');
            card.classList.add('project-card');
            card.addEventListener('click', ()=>{
                window.open(repo.html_url, "_blank");
            });
            const title = document.createElement('p');
            title.classList.add('project-title');
            title.textContent = repo.name;
            const text = document.createElement('p');
            text.classList.add('project-text');
            text.textContent = repo.description || 'No Description';

            card.appendChild(title);
            card.appendChild(text);
            projectWrapper.appendChild(card);
        })
    } catch (err){
        console.error('Error fetching repos: ', err);
    }
}
fetchRepos()
setInterval(fetchRepos, 600000)*/