export default function useDateCombined(date: Date | null) {
  if (!date) return;
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let monthString = month.toString();
  let dateString = day.toString();
  let yearString = year.toString();

  if (monthString.length < 2) monthString = "0" + monthString;
  if (dateString.length < 2) dateString = "0" + dateString;

  const dateCombined = `${yearString}-${monthString}-${dateString}`;

  return dateCombined;
}
