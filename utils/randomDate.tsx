export const getRandomDate = (isMrp?: boolean) => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  // return new Date(timestamp);

  const randomDate = new Date(timestamp);
  const monthRandom = randomDate.getMonth() + 1;
  const dateRandom = randomDate.getDate();
  const yearRandom = randomDate.getFullYear();

  let monthString = monthRandom.toString();
  let dateString = dateRandom.toString();
  let yearString = yearRandom.toString();

  if (monthString.length < 2) monthString = "0" + monthString;
  if (dateString.length < 2) dateString = "0" + dateString;

  if (isMrp) {
    if (yearRandom < 2013) yearString = "2013";
  } else {
    if (yearRandom < 1997) yearString = "1997";
  }

  const dateCombined = `${yearString}-${monthString}-${dateString}`;

  return dateCombined;
};
