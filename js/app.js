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