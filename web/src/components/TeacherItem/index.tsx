import React, { useCallback, useEffect, useState } from "react";
/* eslint-disable */
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";
import userImgNotfound from "../../assets/images-v2/user.png";
import "./styles.css";
import convertHourToMinutes from "../../utils/convertHourToMinutes";
import { useToast } from "../../hooks/toast";

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  name: string;
  subject: string;
  user_id: string;
  whatsapp: string;
}

export interface SheduleItem {
  from: number;
  id: number;
  to: number;
  updated_at: string;
  week_day: number;
  day?: string;
  min: number;
  max: number;
}

export interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const { addToast } = useToast();
  const [shedulesList, setShedulesList] = useState<SheduleItem[]>([]);

  const setDay = useCallback((week_day: number) => {
    if (week_day === 0) return "Domingo";
    else if (week_day === 1) return "Segunda";
    else if (week_day === 2) return "Terça";
    else if (week_day === 3) return "Quarta";
    else if (week_day === 4) return "Quinta";
    else if (week_day === 5) return "Sexta";
    else return "Sabado";
  }, []);

  const listDay = useCallback((list: SheduleItem[], index: number) => {
    let min = 9999999;
    let max = -9999999;
    if (list.length > 0) {
      list.forEach((item: SheduleItem) => {
        if (item.from < min) min = item.from;

        if (item.to > max) max = item.to;
      });
      return { min, max };
    }
    return { min, max };
  }, []);

  useEffect(() => {
    api.get(`classes?id=${teacher.id}`).then((response) => {
      const { schedule } = response.data;

      const formattedShedules: SheduleItem[] = [];

      for (let index = 0; index < 7; index += 1) {
        const sheduleWeekDay = schedule.filter(
          (item: SheduleItem) => item.week_day === index
        );
        const { min, max } = listDay(sheduleWeekDay, index);

        if (sheduleWeekDay[0]) {
          formattedShedules[index] = {
            ...sheduleWeekDay[0],
            day: setDay(sheduleWeekDay[0].week_day),
            min: convertHourToMinutes(Number(min.toString())),
            max: convertHourToMinutes(Number(max.toString())),
          };
        } else {
          formattedShedules[index] = {
            from: 0,
            id: 0,
            to: 0,
            day: setDay(index),
            updated_at: " ",
            week_day: 0,
            min: 0,
            max: 0,
          };
        }
      }

      setShedulesList(formattedShedules);
    });
  }, [listDay, setDay, teacher]);

  function createNewConnection() {
    api
      .post("connections", {
        user_id: teacher.id,
      })
      .then((resposta) => {
        addToast({
          type: "success",
          title: "Conexão criada!",
        });
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Ocorreu algum erro!",
        });
      });
  }
 
  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar ? teacher.avatar : userImgNotfound}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <div className="list-shedules-cards">
        {shedulesList.map((item: SheduleItem, index) => {
          return item && item.id > 0 ? (
            <span className="list-shedules-cards-item">
              <div>
                <span>Dia</span>
                <strong>{item.day}</strong>
              </div>

              <div>
                <span>horário</span>
                <strong>
                  {item.min} - {item.max}
                </strong>
              </div>
            </span>
          ) : (
            <span className="list-shedules-cards-item disabled">
              <div>
                <span>Dia</span>
                <strong>{item.day}</strong>
              </div>

              <div>
                <span>horário</span>
                <strong>-</strong>
              </div>
            </span>
          );
        })}
      </div>

      <footer>
        <p>
          Preco/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          target="_blank"
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Entrar em contato" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
