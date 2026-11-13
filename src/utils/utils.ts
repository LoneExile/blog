// Post dates are frontmatter strings like "2024-04-21 19:24". Only the day is
// shown, read in UTC so the build machine's timezone can't move it.
const isoDate = (date: string): string => date.slice(0, 10);

const formattedDate = (
  date: string,
  style: "long" | "short" = "long",
): string =>
  new Date(`${isoDate(date)}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: style === "long" ? "numeric" : undefined,
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });

export { formattedDate, isoDate };
