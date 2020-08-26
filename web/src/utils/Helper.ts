
interface Phone {
  value: any;
}


const removePhoneMask = ({ value }: Phone) => {
  value = value.toString();
  value = value.replace("(", '')
  value = value.replace(")", '')
  value = value.replace(")", '')
  value = value.trim();
  return value;
}

export {removePhoneMask }
 