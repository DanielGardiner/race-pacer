function convertSecondsToMinSecs(seconds) {
  const mins = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return {
    mins,
    seconds: remainingSeconds,
  };
}

export default convertSecondsToMinSecs;
