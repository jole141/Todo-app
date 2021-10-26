export function dateConverter(timestamp: string) {
  const date = new Date(timestamp);

  return `${convertNumber(date.getDate())}.${convertNumber(
    date.getMonth() + 1
  )}.${date.getFullYear()} ${convertNumber(date.getHours())}:${convertNumber(
    date.getMinutes()
  )}:${convertNumber(date.getSeconds())}`;
}

const convertNumber = (value: number) => {
  return value < 10 ? `0${value}` : value.toString();
};
