export default function convertHourToMinutes(time: number) {
  const parseHour = String(time / 60)
  const hours = parseInt(parseHour)
  const minutes = parseFloat(String(((parseFloat(parseHour) - hours) * 60))).toFixed(0)

  return [
      String(hours).padStart(2, '0'),
      String(minutes).padStart(2, '0')
  ].join(":")
}

 
