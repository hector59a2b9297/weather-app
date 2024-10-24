import "./TempWeek.scss";
import moment from "moment";

// Assets
import ArrowTop from "../../assets/arrow_top.svg";
import ArrowDown from "../../assets/arrow_down.svg";
import SunnyRainy from "../../assets/sunny_rainy.svg";
import Rainy from "../../assets/rainy.svg";
import HailRain from "../../assets/hail_rain.svg";
import Sunny from "../../assets/sunny.svg";
import Storm from "../../assets/storm.svg";
import Covert from "../../assets/covert.svg";
import Cloudy from "../../assets/cloudy.svg";
import ArrowLeft from "../../assets/arrow_left.svg";
import ArrowRight from "../../assets/arrow_right.svg";
import { useState, useEffect } from "react";
import useResponsive from "../../hooks/useResponsive";

const weekDays = {
  Domingo: "Dom",
  "Segunda-feira": "Seg",
  "Terça-feira": "Ter",
  "Quarta-feira": "Qua",
  "Quinta-feira": "Qui",
  "Sexta-feira": "Sex",
  "Sábado": "Sab",
};

function TempWeek({ daysOfMonth, currentDay, setCurrentDay }) {
  const [ selectedDay, setSelectedDay ] = useState(currentDay.date); 
  const [ visibleDay, setVisibleDay ] = useState(currentDay.date); 
  const { isMobile } = useResponsive();
  const [ today, setToday ] = useState();

  useEffect(() => {
    setSelectedDay(currentDay.date);
    setVisibleDay(currentDay.date); 

    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna 0-11, então adicionamos 1
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    }
    
    setToday(
      formatDate(new Date())
    );
  }, [currentDay]);

  const getWeatherIcon = (weather) => {
    if (
      weather.toLowerCase().includes("chuva") ||
      weather.toLowerCase().includes("aguaceiros") ||
      weather.toLowerCase().includes("chuvisco")
    ) {
      return Rainy;
    }
    if (
      weather.toLowerCase().includes("sol") &&
      weather.toLowerCase().includes("chuva")
    ) {
      return SunnyRainy;
    }
    if (weather.toLowerCase().includes("granizo")) {
      return HailRain;
    }
    if (weather.toLowerCase().includes("sol")) {
      return Sunny;
    }
    if (
      weather.toLowerCase().includes("tempestade") ||
      (weather.toLowerCase().includes("chuva") &&
        weather.toLowerCase().includes("forte"))
    ) {
      return Storm;
    }
    if (
      weather.toLowerCase().includes("nublado") ||
      weather.toLowerCase().includes("encoberto")
    ) {
      return Covert;
    }
    if (weather.toLowerCase().includes("limpo")) {
      return Cloudy;
    }
  };

  const changeDay = (date) => {
    const currentDayData = daysOfMonth.find((data) => data.date === date);
    setCurrentDay(currentDayData);
    setSelectedDay(date); 
  };

  const getDatesToShow = () => {
    let todayIndex = null;
    for (let i = 0; i < daysOfMonth.length; i++) {
      if (visibleDay === daysOfMonth[i].date) {
        todayIndex = i;
      }
    }

    if (!isMobile) {
      if (todayIndex === 0) {
        return [
          daysOfMonth[todayIndex],
          daysOfMonth[todayIndex + 1],
          daysOfMonth[todayIndex + 2],
        ];
      }

      if (todayIndex === 1) {
        return [
          daysOfMonth[todayIndex - 1],
          daysOfMonth[todayIndex],
          daysOfMonth[todayIndex + 1],
          daysOfMonth[todayIndex + 2],
        ];
      }

      if (todayIndex === daysOfMonth.length - 1) {
        return [
          daysOfMonth[todayIndex - 2],
          daysOfMonth[todayIndex - 1],
          daysOfMonth[todayIndex],
        ];
      }

      if (todayIndex === daysOfMonth.length - 2) {
        return [
          daysOfMonth[todayIndex - 2],
          daysOfMonth[todayIndex - 1],
          daysOfMonth[todayIndex],
          daysOfMonth[todayIndex + 1],
        ];
      }

      return [
        daysOfMonth[todayIndex - 2],
        daysOfMonth[todayIndex - 1],
        daysOfMonth[todayIndex],
        daysOfMonth[todayIndex + 1],
        daysOfMonth[todayIndex + 2],
      ];
    } else {
      if (todayIndex === 0) {
        return [
          daysOfMonth[todayIndex],
          daysOfMonth[todayIndex + 1],
          daysOfMonth[todayIndex + 2],
        ];
      }

      if (todayIndex === 1) {
        return [
          daysOfMonth[todayIndex - 1],
          daysOfMonth[todayIndex],
          daysOfMonth[todayIndex + 1],
        ];
      }

      if (todayIndex === daysOfMonth.length - 1) {
        return [
          daysOfMonth[todayIndex - 2],
          daysOfMonth[todayIndex - 1],
          daysOfMonth[todayIndex],
        ];
      }

      if (todayIndex === daysOfMonth.length - 2) {
        return [
          daysOfMonth[todayIndex - 1],
          daysOfMonth[todayIndex],
          daysOfMonth[todayIndex + 1],
        ];
      }

      return [
        daysOfMonth[todayIndex - 1],
        daysOfMonth[todayIndex],
        daysOfMonth[todayIndex + 1],
      ];
    }
  };

  const onClickNextDay = () => {
    const nextDay = moment(visibleDay).add(1, "days").format("YYYY-MM-DD");
    setVisibleDay(nextDay); 
  };

  const onClickPreviousDay = () => {
    const prevDay = moment(visibleDay).add(-1, "days").format("YYYY-MM-DD");
    setVisibleDay(prevDay); 
  };

  return (
    <section className="container-temp-week">
      {!isMobile && (
        <div className="max-min">
          <div className="f-row">
            <p>Máx</p>
            <img src={ArrowTop} alt="" />
          </div>
          <div className="f-row">
            <p>Mín</p>
            <img src={ArrowDown} alt="" />
          </div>
        </div>
      )}


      <div className="week-content">
        {visibleDay !== daysOfMonth[0].date && (
          <div onClick={onClickPreviousDay} className="arrows-left">
            <img src={ArrowLeft} alt="" />
          </div>
        )}

        {getDatesToShow().map((date) => {
          const isSelectedDay = selectedDay === date.date; 
          const isCurrentDay = today === date.date; 

          return (
            <div
              className={`temp-day ${
                isSelectedDay
                  ? "highlight-today"
                  : isCurrentDay
                    ? "faded-current-day"
                    : "faded-day"
              }`}
              key={date.date}
              onClick={() => changeDay(date.date)} 
            >
              <h3>{weekDays[date.weekDayName]}</h3>
              <p>{moment(date.date).format("DD/MM")}</p>
              <img
                className="weather-icons"
                src={getWeatherIcon(date.description)}
                alt=""
              />
              <p>
                {date.maxTemperature} °{date.tempScale}
              </p>
              <p>
                {date.minTemperature} °{date.tempScale}
              </p>
            </div>
          );
        })}
        
        {visibleDay !== daysOfMonth[daysOfMonth.length - 1].date && (
          <div className="arrows-right">
            <img onClick={onClickNextDay} src={ArrowRight} alt="" />
          </div>
        )}
      </div>
    </section>
  );
}

export default TempWeek;
