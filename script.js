window.onload = function () {
  const apiUrl = 'https://api.github.com/repos/StressLevelZero/MarrowSDK/commits';
  var commitDate;

  // Replace {owner} and {repo} in the apiUrl with the respective GitHub owner and repository name

  function fetchTime() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        commitTime = data[0].commit.author.date;
        document.getElementById('commit-time').textContent = getTimeSinceCommit(commitTime);
        setInterval(() => {
          document.getElementById('commit-time').textContent = getTimeSinceCommit(commitTime);
        }, 1000);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }


  function getTimeSinceCommit(commitTime) {
    const currentTime = new Date();
    const lastCommitTime = new Date(commitTime);
    const timeDifference = currentTime - lastCommitTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const remainingMonths = months % 12;
    const remainingDays = days % 30;
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    const timeComponents = [];

    if (years > 0) {
      timeComponents.push(`${years} year${years > 1 ? 's' : ''}`);
    }

    if (remainingMonths > 0) {
      timeComponents.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`);
    }

    if (remainingDays > 0) {
      timeComponents.push(`${remainingDays} day${remainingDays > 1 ? 's' : ''}`);
    }

    if (remainingHours > 0) {
      timeComponents.push(`${remainingHours} hour${remainingHours > 1 ? 's' : ''}`);
    }

    if (remainingMinutes > 0) {
      timeComponents.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
    }

    if (remainingSeconds > 0) {
      timeComponents.push(`${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`);
    }

    if (timeComponents.length === 0) {
      return 'Just now 🥳🎊🎊🥳';
    }

    return timeComponents.join(', ') + ' ago';
  }

  const commitInfo = document.getElementById('commit-info');

  let hueShiftValue = 0;

  function applyHueShift() {
    commitInfo.style.filter = `hue-rotate(${hueShiftValue}deg)`;
  }

  function animateHueShift() {
    hueShiftValue += 2; // Adjust the value to control the speed and intensity of the hue shift
    applyHueShift();

    requestAnimationFrame(animateHueShift);
  }

  animateHueShift();

  fetchTime();
  setInterval(fetchTime, 60 * 1000)

};
