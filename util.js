function numberToText(num) {
  let mins = num / 60;
  mins = Math.floor(mins)
  if(mins < 10) {
    mins = 0 + mins.toString();
  }

  let secs = num % 60;
  if(secs < 10) {
    secs = 0 + secs.toString();
  }

  return `${mins}:${secs}`;
}

export { numberToText };