document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const usernameInput = document.getElementById("username");
    const repoGallery = document.getElementById("repository-gallery");
 
 
    searchButton.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchRepos(username);
        }
    });
 
 
    async function fetchRepos(username) {
        const url = `https://api.github.com/users/${username}/repos?per_page=20&sort=created`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("User not found");
            }
            const repos = await response.json();
            for (let repo of repos) {
                await fetchAdditionalRepoData(repo);
            }
            displayRepos(repos);
        } catch (error) {
            repoGallery.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    }
 
 
    async function fetchAdditionalRepoData(repo) {
        const commitsUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits?per_page=1`;
        const languagesUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`;
 
 
        try {
            const [commitsResponse, languagesResponse] = await Promise.all([
                fetch(commitsUrl),
                fetch(languagesUrl)
            ]);
 
 
            const commits = commitsResponse.ok ? await commitsResponse.json() : [];
            const languages = languagesResponse.ok ? await languagesResponse.json() : {};
 
 
            repo.commitCount = commits.length > 0 ? commits.length : 0;
            repo.languages = Object.keys(languages).join(", ");
        } catch (error) {
            console.error(`Error fetching additional data for ${repo.name}:`, error);
            repo.commitCount = 0;
            repo.languages = "Unknown";
        }
    }
 
 
    function displayRepos(repos) {
        repoGallery.innerHTML = "";
        repos.forEach(repo => {
            const repoCard = document.createElement("div");
            repoCard.classList.add("repo-card");
            repoCard.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p><strong>Description:</strong> ${repo.description || "No description available"}</p>
                <p><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString()}</p>
                <p><strong>Updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                <p><strong>Commits:</strong> ${repo.commitCount}</p>
                <p><strong>Languages:</strong> ${repo.languages}</p>
                <p><strong>Watchers:</strong> ${repo.watchers_count}</p>
            `;
            repoGallery.appendChild(repoCard);
        });
    }
 
 
    fetchRepos("cicureton");
 });
 
 
 