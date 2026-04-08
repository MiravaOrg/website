const mirrorContainer = document.getElementById("mirrorCards");
const toast = document.getElementById("copyToast");

/* LOAD MIRRORS */
fetch("mirror.json")
  .then(res => res.json())
  .then(data => {
    const allMirrors = [
      ...data.official_iran_mirrors,
      ...data.global_mirrors
    ];

    allMirrors.forEach(m => {
      const card = document.createElement("div");
      card.className = "mirror-card glass";

      card.innerHTML = `
        <h3>${m.name}</h3>
        <p class="desc">${m.description}</p>
        <div class="status checking">⏳ Checking status…</div>

        <div class="packages">
          ${m.packages.map(p => `<span class="package">${p}</span>`).join("")}
        </div>

        <span class="mirror-link">${m.url}</span>
      `;

      mirrorContainer.appendChild(card);

      /* COPY URL ON CLICK */
      card.addEventListener("click", () => {
        navigator.clipboard.writeText(m.url);
        showToast();
      });

      /* STATUS CHECK */
      const statusEl = card.querySelector(".status");
      fetch(m.url, { method: "HEAD", mode: "no-cors" })
        .then(() => {
          statusEl.textContent = "● Online";
          statusEl.className = "status up";
        })
        .catch(() => {
          statusEl.textContent = "● Offline";
          statusEl.className = "status down";
        });
    });
  })
  .catch(() => {
    mirrorContainer.innerHTML = "<p>Failed to load mirrors.</p>";
  });

/* SHOW COPY TOAST */
function showToast() {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}


/* -----------------------------
   CONTRIBUTORS (STATIC LIST)
--------------------------------*/
const contributors = [
    "GeeDook",
    "ArmanTaheriGhaleTaki",
    "maede-ps",
  "amirparsadd",
  "Vesal-J",
  "SinaAboutalebi",
  "ehsannarmani",
  "Linuxmaster14",
  "imdanieldev",
  "MrAriaNet",
  "hesam-init",
  "aliinreallife",
  "alireza5969",
  "sirwanveisi",
];

const contributorsContainer = document.getElementById("contributors");

if(contributorsContainer){
contributors.forEach(username => {
  const a = document.createElement("a");
  a.href = `https://github.com/${username}`;
  a.target = "_blank";
  a.rel = "noopener";

  const img = document.createElement("img");
  img.src = `https://github.com/${username}.png`;
  img.alt = username;
  img.title = username;

  a.appendChild(img);
  contributorsContainer.appendChild(a);
});}


// radar 
const mirrorTableBody = document.querySelector("#mirrorTable tbody");
// const toast2 = document.getElementById("toast");
let mirrorData = [];
let historyMap = {}; // mirror.url => last 20 checks

// Load mirrors
fetch("mirror.json")
  .then(r => r.json())
  .then(data => {
    mirrorData = [...data.official_iran_mirrors, ...data.global_mirrors];
    mirrorData.forEach(m => historyMap[m.url] = []);
    renderTable();
    updateConnectivity();
    setInterval(updateConnectivity, 15000);
  });

function checkMirror(url, timeout = 4000) {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(false), timeout);
    fetch(url, { mode: "no-cors", cache: "no-store" })
      .then(() => { clearTimeout(timer); resolve(true); })
      .catch(() => { clearTimeout(timer); resolve(false); });
  });
}

function renderTable() {
  mirrorTableBody.innerHTML = "";
  mirrorData.forEach(m => {
    const tr = document.createElement("tr");
    tr.dataset.url = m.url;

    tr.innerHTML = `
      <td class="history-cell"></td>
      <td class="mirror-name">${m.name}</td>
      <td><div class="status-circle"><span></span></div></td>
      <td class="status-text">Checking…</td>
    `;

    // Click row or name to copy URL
    tr.querySelector(".mirror-name").addEventListener("click", e => {
      navigator.clipboard.writeText(m.url).then(() => {
               showToast();

      });
    });

    mirrorTableBody.appendChild(tr);
  });
}

async function updateConnectivity() {
  for (const mirror of mirrorData) {
    const result = await checkMirror(mirror.url);

    // Update history
    historyMap[mirror.url].push(result);
    // Keep the full history for potential future use or detailed view, but limit rendering
    if (historyMap[mirror.url].length > 30) historyMap[mirror.url].shift();

    const tr = mirrorTableBody.querySelector(`tr[data-url='${mirror.url}']`);
    const historyCell = tr.querySelector(".history-cell");
    const circle = tr.querySelector(".status-circle span");
    const statusText = tr.querySelector(".status-text");

    // --- MODIFIED HISTORY RENDERING ---
    const historyDots = historyMap[mirror.url]
      .slice(-10) // Take only the last 10 results
      .map(r => `<span class="history-dot" data-url="${mirror.url}" style="background-color:${r ? '#4dffb8':'#ff6b6b'}"></span>`)
      .join("");
    historyCell.innerHTML = historyDots;
    // --- END MODIFIED HISTORY RENDERING ---

    // Update circle
    circle.style.backgroundColor = result ? "#4dffb8" : "#ff6b6b";
    circle.style.boxShadow = result
      ? "0 0 12px rgba(77,255,184,0.8)"
      : "0 0 12px rgba(255,107,107,0.7)";

    // Status hint
    statusText.textContent = result ? "Online — reachable" : "Offline — not responding";
  }
}

const searchInput = document.getElementById("mirrorSearchInput");
let allMirrors = []; // To store all mirrors for filtering

/* DEBOUNCE FUNCTION */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* DISPLAY MIRRORS FUNCTION */
function displayMirrors(mirrorsToDisplay) {
  mirrorContainer.innerHTML = ""; // Clear current mirrors

  if (mirrorsToDisplay.length === 0) {
    mirrorContainer.innerHTML = "<p>No mirrors found matching your search.</p>";
    return;
  }

  mirrorsToDisplay.forEach(m => {
    const card = document.createElement("div");
    card.className = "mirror-card glass";

    card.innerHTML = `
      <h3>${m.name}</h3>
      <p class="desc">${m.description}</p>
      <div class="status checking">⏳ Checking status…</div>

      <div class="packages">
        ${m.packages.map(p => `<span class="package">${p}</span>`).join("")}
      </div>

      <span class="mirror-link">${m.url}</span>
    `;

    mirrorContainer.appendChild(card);

    /* COPY URL ON CLICK */
    card.addEventListener("click", () => {
      navigator.clipboard.writeText(m.url);
      showToast(); // Assuming showToast() is defined elsewhere in your script
    });

    /* STATUS CHECK */
    const statusEl = card.querySelector(".status");
    // Using fetch with 'no-cors' is good for checking availability without exposing cross-origin data.
    // However, the response for 'no-cors' requests is always 'opaque', meaning you can't read status codes.
    // The .then() will only trigger if the request doesn't throw an immediate network error.
    // A more robust check might involve a backend service, but this is a common client-side approach.
    fetch(m.url, { method: "HEAD", mode: "no-cors" })
      .then(() => {
        // This part is tricky with no-cors. It means the request didn't fail immediately.
        // We assume it's online if no immediate error occurred.
        statusEl.textContent = "● Online";
        statusEl.className = "status up";
      })
      .catch(() => {
        statusEl.textContent = "● Offline";
        statusEl.className = "status down";
      });
  });
}

/* FILTERING LOGIC */
function filterMirrors() {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allMirrors.filter(m =>
    m.name.toLowerCase().includes(searchTerm) ||
    m.description.toLowerCase().includes(searchTerm) ||
    m.packages.some(p => p.toLowerCase().includes(searchTerm)) ||
    m.url.toLowerCase().includes(searchTerm)
  );
  displayMirrors(filtered);
}

/* DEBOUNCED FILTER FUNCTION */
const debouncedFilterMirrors = debounce(filterMirrors, 300); // 300ms delay

/* EVENT LISTENER FOR SEARCH INPUT */
searchInput.addEventListener("input", debouncedFilterMirrors);

/* INITIAL LOAD */
fetch("mirror.json")
  .then(res => res.json())
  .then(data => {
    // Combine Iranian and global mirrors. Assuming global_mirrors exists in your JSON.
    // If not, adjust this line to only use official_iran_mirrors or fetch global mirrors elsewhere.
    allMirrors = [
      ...(data.official_iran_mirrors || []),
      ...(data.global_mirrors || []) // Assuming you might have a global_mirrors array
    ];
    displayMirrors(allMirrors); // Display all mirrors initially
  })
  .catch(() => {
    if (mirrorContainer) {
      mirrorContainer.innerHTML = "<p>Failed to load mirrors.</p>";
    }
  });

// --- Helper function for toast (assuming it exists in your project) ---
function showToast() {
  const toast = document.getElementById("copyToast");
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000); // Hide after 3 seconds
  }
}

// You might need to adjust the 'mirrorContainer' initialization if it's not directly available.
// For example, if it's inside the fetch callback's scope, ensure it's accessible.

