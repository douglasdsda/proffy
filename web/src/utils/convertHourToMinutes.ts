export default function convertHourToMinutes(time: string) {
  let [hour , minutes] = (Number(time)/60).toString().split('.');
  if(minutes) minutes = formattedvalue(minutes);
  else minutes = '00';

  return hour+':'+minutes;
}

 function formattedvalue(value: string) {
  const prefix = '0.';

  const calc = Number(prefix+value) * 60; 

  const calcInteiro = parseInt(calc.toString()) + 1;
  return calcInteiro.toString();
}
