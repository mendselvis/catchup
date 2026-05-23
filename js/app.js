// Topics for each subject
const topicMap = {
  'Math': [
    'Understanding variables',
    'Solving equations',
    'Fractions and decimals',
    'Graphs and coordinates',
    'Word problems'
  ],
  'Science': [
    'Cell structure',
    'Photosynthesis',
    'Forces and motion',
    'The periodic table',
    'Ecosystems'
  ],
  'English': [
    'Essay structure',
    'Grammar and punctuation',
    'Reading comprehension',
    'Vocabulary',
    'Analyzing texts'
  ],
  'History': [
    'Causes of World War 1',
    'The Cold War',
    'Ancient civilizations',
    'The Civil Rights Movement',
    'colonialism'
  ]
};

function selectSubject(subject) {
  // Hide screen 1
  document.getElementById('screen1').classList.add('hidden');

  // Show screen 2
  document.getElementById('screen2').classList.remove('hidden');

  // Set the title
  document.getElementById('screen2-title').innerText = subject + ' — Where did you get lost?';

  // Fill in the topics for that subject
  const topicsList = document.getElementById('topics-list');
  topicsList.innerHTML = '';

  topicMap[subject].forEach(topic => {
    const btn = document.createElement('button');
    btn.className = 'topic-btn';
    btn.innerText = topic;
    btn.onclick = () => selectTopic(subject, topic);
    topicsList.appendChild(btn);
  });
}

function selectTopic(subject, topic) {
  alert('Subject: ' + subject + '\nLost at: ' + topic);
}