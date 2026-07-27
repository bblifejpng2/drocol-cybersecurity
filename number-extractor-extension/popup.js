// Pattern definitions for sensitive data
const PATTERNS = {
  phone: {
    label: 'Phone',
    regex: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
  },
  email: {
    label: 'Email',
    regex: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
  },
  creditCard: {
    label: 'Credit Card',
    regex: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g
  },
  ip: {
    label: 'IP',
    regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g
  },
  ssn: {
    label: 'SSN',
    regex: /\b\d{3}-\d{2}-\d{4}\b/g
  }
};

// Extract text from the current page
function extractPageText() {
  return document.body.innerText || document.body.textContent || '';
}

// Run extraction using the page's own context
function runExtraction() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) {
        resolve({});
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const PATTERNS = {
            phone: { label: 'Phone', regex: /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g },
            email: { label: 'Email', regex: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g },
            creditCard: { label: 'Credit Card', regex: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g },
            ip: { label: 'IP', regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g },
            ssn: { label: 'SSN', regex: /\b\d{3}-\d{2}-\d{4}\b/g }
          };

          const text = document.body.innerText || '';
          const results = {};

          for (const key in PATTERNS) {
            const matches = text.match(PATTERNS[key].regex) || [];
            results[key] = Array.from(new Set(matches));
          }

          return results;
        }
      }, () => {
        // Fallback if script execution fails
        resolve({});
      });
    });
  });
}

// Render extracted items to a list
function renderResults(results) {
  const map = {
    phones: results.phone || [],
    emails: results.email || [],
    cards: results.creditCard || [],
    ips: results.ip || [],
    ssns: results.ssn || []
  };

  const containers = {
    phones: document.getElementById('phones'),
    emails: document.getElementById('emails'),
    cards: document.getElementById('cards'),
    ips: document.getElementById('ips'),
    ssns: document.getElementById('ssns')
  };

  for (const key in containers) {
    const ul = containers[key];
    ul.innerHTML = '';
    const items = map[key] || [];

    if (items.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'None found';
      li.className = 'no-results';
      ul.appendChild(li);
      continue;
    }

    items.slice(0, 20).forEach((value) => {
      const li = document.createElement('li');
      li.textContent = value;
      ul.appendChild(li);
    });
  }

  const total = Object.values(map).reduce((acc, arr) => acc + arr.length, 0);
  document.getElementById('totalCount').textContent = `Total: ${total}`;
}

// Clear results
function clearResults() {
  const containers = ['phones', 'emails', 'cards', 'ips', 'ssns'];
  containers.forEach((id) => {
    const ul = document.getElementById(id);
    ul.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = 'None found';
    li.className = 'no-results';
    ul.appendChild(li);
  });
  document.getElementById('totalCount').textContent = 'Total: 0';
}

// Event listeners
document.getElementById('extractBtn').addEventListener('click', async () => {
  const results = await runExtraction();
  renderResults(results);
});

document.getElementById('clearBtn').addEventListener('click', clearResults);

// Initialize with empty state
clearResults();