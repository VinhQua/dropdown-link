const triggers = document.querySelectorAll('.menu > li');
const bioImage = document.querySelector('#bio-image');
const dropdownBackground = document.querySelector('.dropdownBackground'); 
const projects = document.querySelector('.projects');
const imageLink = document.querySelector('.about a');
const enterHandle = function(){
    this.classList.add('trigger');
    setTimeout(()=> this.classList.contains('trigger') && this.classList.add('trigger-active'),150);
    const dropdown = this.querySelector('.dropdown');
    //console.log(dropdown);
    const dropdownCoords = dropdown.getBoundingClientRect();
    const Coords = {
        width: dropdownCoords.width,
        height: dropdownCoords.height,
        left: dropdownCoords.left,
        top:dropdownCoords.top
    };
    dropdownBackground.style.height = `${Coords.height}px`;
    dropdownBackground.style.width = `${Coords.width}px`;
    dropdownBackground.style.left = `${Coords.left}px`;
    dropdownBackground.style.top = `${Coords.top}px`;
    dropdownBackground.style.opacity = `1`;
    //console.log(dropdownCoords);
    
};
const addRepoToList = function(repoData){
    projects.innerHTML =  repoData.map(repo => `<li><a target="_blank" href="${repo.html_url}">View</a>${customizeProjectName(repo.name) }</li>`).join('');
};
const addBio = function(userData){
    bioImage.src = userData.avatar_url;
    imageLink.href = userData.html_url
};
const getRepoData = async function(){
    const request = await fetch(`https://api.github.com/users/VinhQua/repos?sort=created&per_page=10`);
    const repoData = await request.json();
    const requestUserData = await fetch(`https://api.github.com/users/VinhQua`);
    const userData = await requestUserData.json();
    addBio(userData);
    console.log(userData);
    addRepoToList(repoData);
};
const customizeProjectName = function(name){
    return name.replace('-',' ').split(' ').map(letter => letter[0].toUpperCase() + letter.slice(1)).join(' ');
};
getRepoData();
const leaveHandle = function(){
    //console.log('leave');
    this.classList.remove('trigger','trigger-active');
    dropdownBackground.style.opacity = `0`;

};
triggers.forEach(trigger => trigger.addEventListener('mouseenter',enterHandle));
triggers.forEach(trigger => trigger.addEventListener('mouseleave',leaveHandle));