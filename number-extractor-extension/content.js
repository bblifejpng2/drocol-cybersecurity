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

// Extract data from page text
function extractSensitiveData() {
  const text = document.body.innerText || document.body.textContent || '';
  const results = {};

  for (const key in PATTERNS) {
    const matches = text.match(PATTERNS[key].regex) || [];
    results[key] = Array.from(new Set(matches));
  }

  return results;
}

// Initialize on page load
(function() {
  console.log('Number Extractor extension loaded');
})();