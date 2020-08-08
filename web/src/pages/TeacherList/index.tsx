import React from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";



import "./styles.css";

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Que incrivel que voce quer dar aulas.">
        <form id="search-teachers">

          <Input name="subject" label="Matéria" />
          <Input name="week_day" label="Dia da semana" />
          <Input type="time" name="time" label="Hora" />
        </form>
      </PageHeader>

      <main>
           <TeacherItem />
           <TeacherItem />
           <TeacherItem />
           <TeacherItem />
      </main>

    </div>
  );
}

export default TeacherList;
