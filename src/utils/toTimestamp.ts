function toTimestamp(date: string): number {
  let datum = Date.parse(date)
  return (datum / 1000) as number
}

export { toTimestamp }
