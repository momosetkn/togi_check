import { Line, Serie } from '@nivo/line'

export const Graph = ({data, length, dataTitle}: { data: number[], length: number, dataTitle?: string }) => {
  const nivoData: Serie[] = [
    {
      "id": dataTitle || 'データ',
      "color": "hsl(32, 70%, 50%)",
      "data": [...Array(length)].map((_, i) => (
        {
          "x": `${i}`,
          "y": data[i]
        }
      ))
    }
  ];

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