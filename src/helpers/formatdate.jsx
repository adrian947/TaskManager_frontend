export const format = (dateFn) => {
  let date = dateFn.split("-");
  date.splice(1, 0, date);
  date.splice(1, 2, date[2]);

  const newDate = new Date(date);

  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return newDate.toLocaleDateString("en-EN", option);
};
