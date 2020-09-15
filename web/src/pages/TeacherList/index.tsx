import React, { FormEvent, useState } from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import api from "../../services/api";

import "./styles.css";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');

  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  async function searchTeacher(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("shedules", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader path="Estudar" title="Que incrivel que voce quer dar aulas.">
        <form onSubmit={searchTeacher} id="search-teachers">
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciência", label: "Ciência" },
              { value: "Edução fisica", label: "Edução fisica" },
              { value: "Fisica", label: "Fisica" },
              { value: "Geografia", label: "Geografia" },
              { value: "Historia", label: "Historia" },
              { value: "Portugues", label: "Portugues" },
              { value: "Quimica", label: "Quimica" },
              { value: "Matemática", label: "Matemática" },
            ]}
          />

          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda" },
              { value: "2", label: "Terça-Feira" },
              { value: "3", label: "Quarta-Feira" },
              { value: "4", label: "Quinta-Feira" },
              { value: "5", label: "Sexta-Feira" },
              { value: "6", label: "Sabado" },
            ]}
          />

          <Input
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            label="Hora"
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
