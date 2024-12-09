import React from 'react';
import { Container } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';

const ChartPenalty = () => {
    const sample = [1, 10, 30, 50, 70, 90, 100];
    const [chartData, setChartData] = useState(false)
    const [listChart, setListChart] = useState(false)

    

    function generateListFromArray(arr) {
        console.log(arr)
        
    }

    useEffect(() => {
        console.log("test")
        // Обработчик события для получения сообщений из родительского окна
        const handleMessage = (event) => {
            // Проверьте источник сообщения для безопасности
            if (event.origin !== window.location.origin) {
                return;
            }
            const data = event.data;

            if (data && data.penalty_factors && data.penalty_values) {
                console.log('Полученные данные:', data.penalty_factors);
                setChartData(data);
                setListChart(generateListFromArray(data.penalty_factors));
            }
        };

        // Добавляем слушатель
        window.addEventListener('message', handleMessage);

        // Очистка события при размонтировании компонента
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

        
    // Генерация данных для xAxis
    const penaltyFactors = chartData?.penalty_factors || [];
    const penaltyValues = chartData?.penalty_values || [];
    const xAxisData = Array.from({ length: penaltyFactors.length }, (_, i) => i + 1);

    return (
    <Container >
        {chartData ? 
        <div>
            {/* <button onClick={()=>{generateListFromArray(xAxisData)}}></button> */}
            {/* <p>{chartData.name}</p> */}
            <LineChart
                xAxis={[{ data: xAxisData }]} // Общие значения X для всех линий
                series={[
                    {
                        data: penaltyFactors, // Первая линия
                        label: 'штрафные значения', // Метка линии
                        color: 'blue', // Цвет линии
                    },
                    {
                        data: penaltyValues, // Вторая линия
                        label: 'штрафной коэффициент', // Метка линии
                        color: 'red', // Цвет линии
                    },
                ]}
                width={750}
                height={550}
            />
        </div> : 
        <div>
            Загрузка...
        </div>

        }
    </Container>
  );
};

export default ChartPenalty;


