'use client'
import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import SpotRobot from "@/components/spot-robot";
import { IQADATA } from '@/data/IQA';
import { IqaContrast } from '@/data/IQACONTRAST';

const ApexLineChart = dynamic(() => import('../components/ApexLineChart'), {
  ssr: false
});
const ApexLineChart2 = dynamic(() => import('../components/ApexLineChart2'), {
  ssr: false
});

const calculateContrastAverages = (contrastData) => {
  const totals = {};
  const counts = {};

  const columns = Object.keys(contrastData[0]);
  columns.forEach(column => {
    totals[column] = 0;
    counts[column] = 0;
  });

  contrastData.forEach(item => {
    columns.forEach(column => {
      totals[column] += item[column];
      counts[column]++;
    });
  });

  return columns.map(column => ({
    x: column.replace('Column', ''),
    y: (totals[column] / counts[column]).toFixed(2)
  }));
};

export default function Home() {
  const [selectedAngle, setSelectedAngle] = useState(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('9-12AM');
  const [selectedContrastType, setSelectedContrastType] = useState('Uniformity');


  // Función que se llamará cuando un ángulo sea seleccionado en SpotRobot
  const handleAngleSelection = (angle) => {
    setSelectedAngle(angle);
  };

  const averages = useMemo(() => {
    const timeFrameData = IQADATA[selectedTimeFrame] || [];
    const angles = ['-45', '-30', '-15', '0', '15', '30', '45'];
    return angles.map(angle => {
      const angleData = timeFrameData.map(entry => entry[angle]);
      const sum = angleData.reduce((acc, value) => acc + value, 0);
      return (sum / angleData.length).toFixed(2);
    });
  }, [selectedTimeFrame]);

  const contrastAverages = useMemo(() => {
    return calculateContrastAverages(IqaContrast[selectedContrastType]);
  }, [selectedContrastType]);

  return (
    <main>
      <section className='flex flex-col md:flex-row'>
        <SpotRobot onAngleSelect={handleAngleSelection}/>
        <section className='flex w-full md:w-1/2 flex-col'>
          <div className="container w-full p-4">
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(IQADATA).map(timeFrame => (
                <button
                  key={timeFrame}
                  onClick={() => setSelectedTimeFrame(timeFrame)}
                  className={`px-3 py-2 rounded-[8px] text-white font-medium transition duration-300 
                              ${selectedTimeFrame === timeFrame ? 'bg-blue-500' : 'bg-gray-300 hover:bg-blue-500'}`}
                >
                  {timeFrame}
                </button>
              ))}
            </div>
            <ApexLineChart data={averages} title={`Average IQA for each angle during ${selectedTimeFrame}`} />
          </div>
          <div className="container flex w-full p-4 flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(IqaContrast).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedContrastType(type)}
                  className={`px-3 py-2 rounded-[8px] text-white font-medium transition duration-300 
                              ${selectedContrastType === type ? 'bg-red-500' : 'bg-gray-300 hover:bg-red-500'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <ApexLineChart2
              data={contrastAverages}
              title={`Average Contrast Metrics for ${selectedContrastType}`}
            />
          </div>
        </section>
      </section>
    </main>
  );
}
