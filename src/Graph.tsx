import { Line, Serie } from '@nivo/line'

const colors = [
  "rgb(241, 225, 91)",
  "rgb(244, 117, 96)",
  "rgb(97, 205, 187)"
]

export type Item = { data: number[], title?: string };

export const Graph = ({items, length }: {items: Item[], length: number}) => {
  const nivoData: Serie[] = items.map(({data, title}, index) => (
    {
      id: title || `データ${index}`,
      color: colors[index % colors.length],
      data: [...Array(length)].map((_, i) => (
        {
          x: `${i}`,
          y: data[i] || 0
        }
      ))
    }));

  return (
    <Line
      width={900}
      height={400}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      animate={true}
      enableSlices={'x'}
      data={nivoData}
      enableArea={true}
      yScale={{
        type: 'linear',
        stacked: true,
      }}
      curve="natural"
      fill={[{ match: '*', id: 'gradientA' }]}
    />
  )
}