'use client'
import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpotRobot from "@/components/spot-robot";
import { IQADATA } from '@/data/IQA';
import { IqaContrast } from '@/data/IQACONTRAST';
import Image from 'next/image';

const ApexLineChart = dynamic(() => import('../components/ApexLineChart'), {
  ssr: false
});
const ApexLineChart2 = dynamic(() => import('../components/ApexLineChart2'), {
  ssr: false
});

const ApexRadarChart = dynamic(() => import('../components/ApexRadarChart'), {
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
  const [averagesRadar, setAveragesRadar] = useState([]);

  const calculateAverageIQAForAllAngles = (IQADATA) => {
    const angles = ['-45', '-30', '-15', '0', '15', '30', '45'];
    const totals = {};
    const counts = {};
    const averages = {};
  
    // Inicializar contadores y acumuladores para cada ángulo
    angles.forEach(angle => {
      totals[angle] = 0;
      counts[angle] = 0;
    });
  
    // Sumar y contar IQA para cada ángulo a través de todos los intervalos de tiempo
    Object.values(IQADATA).forEach(intervalData => {
      intervalData.forEach(entry => {
        angles.forEach(angle => {
          totals[angle] += entry[angle];
          counts[angle]++;
        });
      });
    });
  
    // Calcular el promedio para cada ángulo
    angles.forEach(angle => {
      averages[angle] = (totals[angle] / counts[angle]).toFixed(2);
    });
  
    return averages;
  };
  useEffect(() => {
    const averagesRadarData = calculateAverageIQAForAllAngles(IQADATA);
    setAveragesRadar(Object.values(averagesRadarData));
  }, []);


  // Función que se llamará cuando un ángulo sea seleccionado en SpotRobot
  const handleAngleSelection = (angle) => {
    setSelectedAngle(angle);
  };

  // Calcula el promedio para el ángulo seleccionado a lo largo de todos los intervalos de tiempo
  const radarData = useMemo(() => {
    if (selectedAngle === null) return [];

    const angleData = Object.values(IQADATA).flatMap(timeFrameData => 
      timeFrameData.map(entry => entry[selectedAngle])
    );

    const average = angleData.reduce((acc, value) => acc + value, 0) / angleData.length;
    return [average.toFixed(2)];
  }, [selectedAngle]);

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
    <main className=' w-full   flex justify-center items-center'>
      <Image
        src="/images/bg5.jpg"
        width={920}
        height={400}
        alt='Fondo'
        className='min-h-[100dvh] fixed z-0 top-0 left-0 w-full filter saturate-50 object-cover'
      />
      <section className='background  overflow-scroll h-[100dvh] flex  flex-col md:flex-row filter   w-full  items-center z-2 shadow-xl'>
        {/* <SpotRobot onAngleSelect={handleAngleSelection}/> */}
        {/* <ApexRadarChart data={averagesRadar}  title={`Average IQA ${selectedTimeFrame}`}/> */}
        <section className='flex overflow-scroll z-50 h-full w-full md:w-1/2 flex-col  gap-7 absolute left-full md:left-0  md:relative  bgChart p-10'>
          <div className="container w-full p-4 border-t border-b border-white/20 shadow-lg transition-shadow hover:shadow-2xl  rounded-[1.5rem] bg-white/5">
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(IQADATA).map(timeFrame => (
                <button
                  key={timeFrame}
                  onClick={() => setSelectedTimeFrame(timeFrame)}
                  className={`px-3 py-2 rounded-full text-xs text-white font-medium transition  border border-white/0 
                              ${selectedTimeFrame === timeFrame ? 'bg-cyan-600' : 'bg-white/20 hover:border-white/30'}`}
                >
                  {timeFrame}
                </button>
              ))}
            </div>
            {/* <p className='text-white text-sm font-medium px-2'>{`Average IQA for each angle during ${selectedTimeFrame}`}</p> */}
            <ApexLineChart data={averages} title={`Average IQA for each angle during ${selectedTimeFrame}`} />

          </div>
          <div className="container  flex w-full flex-col p-4 border-t border-b border-white/20 shadow-lg transition-shadow hover:shadow-2xl rounded-[1.5rem] bg-white/5">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(IqaContrast).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedContrastType(type)}
                  className={`px-3 py-2 rounded-full text-xs text-white font-medium transition border border-white/0 duration-300 
                              ${selectedContrastType === type ? 'bg-red-500' : 'bg-white/20 hover:border-white/30'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* <p className='text-white text-sm font-medium px-2'>{`Average Contrast Metrics for ${selectedContrastType}`}</p> */}
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
