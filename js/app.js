const GEMINI_API_KEY = 'paste-your-gemini-key-here';
let selectedSubject = '';

async function submitSubject() {
  const input = document.getElementById('subject-input').value.trim();
  if (!input) return alert('Please enter a subject first');

  selectedSubject = input;

  document.getElementById('screen1').classList.add('hidden');
  document.getElementById('screen2').classList.remove('hidden');
  document.getElementById('screen2-title').innerText = input + ' — Where did you get lost?';

  const topicsList = document.getElementById('topics-list');
  topicsList.innerHTML = '<p class="loading">Generating topics...</p>';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `List exactly 6 core topics a high school student typically studies in ${selectedSubject}. Return ONLY a JSON array of topic strings, nothing else. Example: ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6"]`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    console.log('API response:', JSON.stringify(data));

    const rawText = data.candidates[0].content.parts[0].text;
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const topics = JSON.parse(cleaned);

    topicsList.innerHTML = '';
    topics.forEach(topic => {
      const btn = document.createElement('button');
      btn.className = 'topic-btn';
      btn.innerText = topic;
      btn.onclick = () => selectTopic(topic);
      topicsList.appendChild(btn);
    });

  } catch(err) {
    console.log('Error:', err);
    topicsList.innerHTML = '<p style="color:red">Something went wrong. Check the console.</p>';
  }
}

async function selectTopic(topic) {
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('screen3').classList.remove('hidden');
  document.getElementById('subject-tag-display').innerHTML = `<div class="subject-tag">${selectedSubject} — ${topic}</div>`;

  const planOutput = document.getElementById('plan-output');
  planOutput.innerText = 'Building your catch-up plan...';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `A high school student is struggling with "${topic}" in ${selectedSubject}. Do the following: 1. Identify the most likely root gap — the concept they probably missed earlier that caused this confusion. 2. Give a simple plain-English explanation of that root concept (no jargon). 3. Build a 3-step catch-up plan to get them back on track. 4. End with one practice question to test if they now understand. Write in a warm encouraging tone like a patient tutor talking directly to the student.`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Plan response:', JSON.stringify(data));
    planOutput.innerText = data.candidates[0].content.parts[0].text;

  } catch(err) {
    console.log('Error:', err);
    planOutput.innerText = 'Something went wrong. Check the console.';
  }
}

function goBack() {
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('screen1').classList.remove('hidden');
}

function goBack2() {
  document.getElementById('screen3').classList.add('hidden');
  document.getElementById('screen2').classList.remove('hidden');
}

function restart() {
  document.getElementById('screen3').classList.add('hidden');
  document.getElementById('screen1').classList.remove('hidden');
  document.getElementById('subject-input').value = '';
}