export default function convertHourToMinutes(time: string) {
  let [hour , minutes] = (Number(time)/60).toString().split('.');
  if(minutes && parseInt(minutes) > 0) minutes = formattedvalue(minutes);
  else minutes = '00';
 
  return hour+':'+minutes;
}

 function formattedvalue(value: string) {
  const prefix = '0.';

  const calc = Number(prefix+value) * 60; 

  const calcInteiro = Math.round(calc);
  const valuereturn = calcInteiro < 10 ? '0'+ calcInteiro : calcInteiro;
  return valuereturn.toString();
}
