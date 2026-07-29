document.addEventListener("DOMContentLoaded", async () => {
  const listEl = document.getElementById("starred-list");
  const countEl = document.getElementById("star-count");

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Failed to load events.json: ${response.status} ${response.statusText}`);
    }

    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error("Invalid JSON format: expected an array of starred repositories.");
    }

    countEl.textContent = `${events.length} starred repositories`;
    listEl.innerHTML = events
      .map(
        (repo) => `
          <li class="repo-item">
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
            <p class="repo-desc">${repo.description}</p>
            <p class="repo-meta">Starred at ${new Date(repo.starredAt).toLocaleString()}</p>
          </li>
        `
      )
      .join("");
  } catch (error) {
    listEl.innerHTML = `
      <div class="error-message">
        <strong>Unable to load repository data.</strong>
        <p>${error.message}</p>
      </div>
    `;
    countEl.textContent = "0 starred repositories";
    console.error(error);
  }
});
