import React from 'react'
import dynamic from 'next/dynamic'

const SingleBarChart = dynamic(() => import('@mui/x-charts').then((module) => module.BarChart), {
    ssr: false,
})


const BarChart = () => {
    return (
        <>
            <SingleBarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
            />
        </>
    )
}

export default BarChart
