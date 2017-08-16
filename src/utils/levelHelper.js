
// calculates bar width for the level bar in profile view
export const levelWidthCalculator = (score, totalWidth) => {
  if (score < 500) {
    return Math.ceil((score / 500) * totalWidth)
  } else if (score > 500 && score < 5000) {
    return Math.ceil((score / 5000) * totalWidth)
  } else if (score > 5000 && score < 50000) {
    return Math.ceil((score / 50000) * totalWidth)
  }
}

// calculates label for the level bar in profile view
export const levelLabelCalculator = (score) => {
  if (!score) return '';
  if (score < 500) {
    return '1'
  } else if (score > 500 && score < 5000) {
    return '2'
  } else if (score > 5000 && score < 50000) {
    return '3'
  }
}
