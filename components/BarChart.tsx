'use client'
import React from 'react'
import dynamic from 'next/dynamic'

const SingleBarChart = dynamic(
  () => import('@mui/x-charts').then((module) => module.BarChart),
  {
    ssr: false,
  }
)

const BarChart = ({ addresses }: { addresses: any }) => {
  const chartData = () => {
    const data = new Map()
    const labels: any[] = []
    const dataValues: any[] = []
    addresses.map((address: any) => {
      const date = new Date(address.createdAt).toDateString()
      if (data.has(date)) {
        data.set(date, data.get(date) + 1)
      } else {
        data.set(date, 1)
      }
    })
    data.forEach((value, key) => {
      labels.push(key.substring(key.indexOf(' ') + 1))
      dataValues.push(value)
    })
    return { labels, dataValues }
  }
  const { labels, dataValues } = chartData()
  return (
    <>
      <SingleBarChart
        xAxis={[{ scaleType: 'band', data: labels }]}
        series={[{ data: dataValues, color: '#4393e4' }]}
        height={350}
      />
    </>
  )
}

export default BarChart
