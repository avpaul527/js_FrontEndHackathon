document.getElementById('fetchData').addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    if (!username) return alert('Please enter an existing GitHub username');
  
    const userProfile = await fetchUserProfile(username); //may have to change callback 
    const userRepos = await fetchUserRepos(username); //may have to change callback
  
    displayProfile(userProfile);
    displayRepos(userRepos);
  });
  
  async function fetchUserProfile(username) {
   const clientId = '_';  //may change due to no use of client?
   const clientSecret = '_';  //may change due to no use of client?
  
    try {
      const response = await fetch(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}`); //may change due to no use of client?
      if (!response.ok) throw new Error('User not found!');
      return await response.json();
    } catch (error) {
      alert(error.message);
    }
  }
  
  async function fetchUserRepos(username) {
   const clientId = '_';  //may change due to no use of client?
   const clientSecret = '_';  //may change due to no use of client?
  
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&client_id=${clientId}&client_secret=${clientSecret}`); //may change due to no use of client?
      if (!response.ok) throw new Error('Repositories not found!');
      return await response.json();
    } catch (error) {
      alert(error.message);
    }
  }
  
  function displayProfile(profile) {
    const profileContainer = document.getElementById('profile');
    profileContainer.innerHTML = `
      <div class="profile-info">
        <img src="${profile.avatar_url}" alt="Profile Picture" class="rounded-circle" width="150">
        <h2>${profile.name || 'No name provided'}</h2>
        <p>Joined GitHub on: ${new Date(profile.created_at).toLocaleDateString()}</p>
        <a href="${profile.html_url}" target="_blank" class="btn btn-secondary" id="viewbutton">View GitHub Profile</a>
        <p class="mt-2">Website: <a href="${profile.blog}" target="_blank">${profile.blog || 'None'}</a></p>
      </div>
    `;
  }
  
  function displayRepos(repos) {
    const repoListContainer = document.getElementById('repoList');
    repoListContainer.innerHTML = `<h3>Last 5 Repositories:</h3>`;
    
    repos.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.classList.add('repo-item');
      repoElement.innerHTML = `
        <span>${repo.name}</span>
        <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-primary" id="viewbutton">View Repo</a>
      `;
      repoListContainer.appendChild(repoElement);
    });
  }