// Fetch and render all pups in the dog bar
const fetchAndRenderPups = async () => {
    const response = await fetch('http://localhost:3000/pups');
    const pups = await response.json();
  
    const dogBar = document.getElementById('dog-bar');
    dogBar.innerHTML = '';
  
    pups.forEach(pup => {
      const pupSpan = document.createElement('span');
      pupSpan.textContent = pup.name;
      pupSpan.addEventListener('click', () => showPupInfo(pup));
      dogBar.appendChild(pupSpan);
    });
  };
  
  // Initial load of pups
  fetchAndRenderPups();
 
  // Display pup info in the dog-info div
const showPupInfo = (pup) => {
    const dogInfo = document.getElementById('dog-info');
    dogInfo.innerHTML = `
      <img src="${pup.image}" />
      <h2>${pup.name}</h2>
      <button id="toggle-btn">${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
    `;
  
    const toggleBtn = document.getElementById('toggle-btn');
    toggleBtn.addEventListener('click', () => toggleGoodDog(pup.id, !pup.isGoodDog));
  };

  // Toggle good/bad dog status and update the DOM
const toggleGoodDog = async (pupId, isGoodDog) => {
    const response = await fetch(`http://localhost:3000/pups/${pupId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isGoodDog }),
    });
  
    const updatedPup = await response.json();
    showPupInfo(updatedPup);
  };
  
  // Filter good dogs based on user selection
const filterBtn = document.getElementById('filter-btn');
let filterOn = false;

filterBtn.addEventListener('click', () => {
  filterOn = !filterOn;
  filterBtn.textContent = `Filter Good Dogs: ${filterOn ? 'ON' : 'OFF'}`;
  fetchAndRenderPups();
});
