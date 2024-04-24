'use client'
import React, { useState } from 'react';
import SpotRobot from "@/components/spot-robot";
import { IQADATA } from '@/data/IQA';
import dynamic from 'next/dynamic';

const ApexLineChart = dynamic(() => import('../components/ApexLineChart'), {
  ssr: false
});

export default function Home() {
  const [selectedAngle, setSelectedAngle] = useState(null);
  const [selectedTime, setSelectedTime] = useState("9-12AM"); // Este es el rango de tiempo inicial por defecto
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('9-12AM');

  // Función que se llamará cuando un ángulo sea seleccionado en SpotRobot
  const handleAngleSelection = (angle) => {
    setSelectedAngle(angle);
  };

  // Función que se llamará cuando se seleccione un rango de tiempo en GraphComponent
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  // Calcula el promedio para el ángulo y el intervalo de tiempo seleccionado
  const calculateAverage = () => {
    const timeFrameData = IQADATA[selectedTimeFrame];
    const angleData = timeFrameData.map(entry => entry[selectedAngle]);
    const sum = angleData.reduce((acc, value) => acc + value, 0);
    return (sum / angleData.length).toFixed(2);
  };

  const average = calculateAverage();

  const calculateAverages = () => {
    const timeFrameData = IQADATA[selectedTimeFrame] || [];
    const angles = ['-45', '-30', '-15', '0', '15', '30', '45'];
    return angles.map(angle => {
      const angleData = timeFrameData.map(entry => entry[angle]);
      const sum = angleData.reduce((acc, value) => acc + value, 0);
      return (sum / angleData.length).toFixed(2);
    });
  };

  const averages = calculateAverages();

  return (
    <main>
      <section className='flex flex-row'>
        <SpotRobot onAngleSelect={handleAngleSelection} />
        <div className="container w-1/2 md:mr-20 p-4">
          <div className="flex flex-wrap  gap-2 mb-8">
            {Object.keys(IQADATA).map(timeFrame => (
              <button
                key={timeFrame}
                onClick={() => setSelectedTimeFrame(timeFrame)}
                className={`px-3 py-2 rounded-xl text-white font-medium transition duration-300 
                            ${selectedTimeFrame === timeFrame ? 'bg-cyan-400' : 'bg-gray-300 hover:bg-cyan-400'}`}
              >
                {timeFrame}
              </button>
            ))}
          </div>

          {/* Componente del gráfico */}
          <div className=" rounded-lg overflow-hidden">
            <ApexLineChart data={averages} title={`Average IQA for each angle during ${selectedTimeFrame}`} />
          </div>
        </div>
      </section>
    </main>
  );
}
