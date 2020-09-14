import React, { FormEvent, useState, useEffect } from "react";
import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import convertHourToMinutes from "../../utils/convertHourToMinutes";
import { removePhoneMask } from "../../utils/Helper";
import userImgNotfound from "../../assets/images-v2/user.png";

interface SheduleDTO {
  id?: number;
  to: string;
  from: string;
  week_day: number;
  created_at?: Date;
  class_id?: string;
}

function TeacherForm() {
  const history = useHistory();

  const { user , updateUser } = useAuth();

  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  useEffect(() => {
    const load = async () => {
      const response = await api.get("classes");
      console.log("response: ", response.data);
      const { classes, schedule } = await response.data;

      setBio(user?.bio || "");

      setWhatsapp(user?.whatsapp || "");
      setCost(classes?.cost || "");
      setSubject(classes?.subject || "");

      const formattedShedule = schedule.map((item: SheduleDTO) => {
        return {
          ...item,
          to: convertHourToMinutes(item.to),
          from: convertHourToMinutes(item.from),
        };
      });

      if (formattedShedule) setScheduleItems(formattedShedule);
    };

    load();
  }, [user]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updateSheduleItems = scheduleItems.map((sheduleItem, index) => {
      if (index === position) {
        return { ...sheduleItem, [field]: value };
      }
      return sheduleItem;
    });
    setScheduleItems(updateSheduleItems);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .put("classes", {
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {


        updateUser({
          ...user,
          whatsapp: removePhoneMask({ value: whatsapp }),
          bio,
          id: user.id,
        });

        history.push("/CreatedShedule");
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que dar aulas"
        description="O Primeiro passo é preencher esse formulario de inscrição"
        iconHeader
        path="Dar aulas"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <div className="line">
              <div className="teacher-info">
                <img src={user.avatar_url ? user.avatar_url : userImgNotfound} alt="" />
                <strong>{user.name}</strong>
              </div>

              <Input
                col="col-40"
                name="whatsapp"
                mask="phone"
                prefix="R$"
                required
                label="whatsapp"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
                }}
              />
            </div>

            <div className="line">
              <Textarea
                name="bio"
                col="col-100"
                description="Máximo 300 caracteres"
                label="Biografia"
                required
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></Textarea>
            </div>
          </fieldset>

          <fieldset>
            <legend>Sobre Aula</legend>

            <div className="line">
              <Select
                col="col-60"
                name="subject"
                label="Matéria"
                required
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
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

              <Input
                col="col-40"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
                name="cost"
                label="Custo da sua hora por aula"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponiveis
              <button onClick={addNewScheduleItem} type="button">
                + Novo Horario
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="profile-schedule-item">
                  <div className="line">
                    <Select
                      col="col-50"
                      name="week_day"
                      label="Dia da Semana"
                      value={scheduleItem.week_day}
                      onChange={(e) =>
                        setScheduleItemValue(index, "week_day", e.target.value)
                      }
                      options={[
                        { value: "0", label: "Domingo" },
                        { value: "1", label: "Segunda" },
                        { value: "2", label: "Terça" },
                        { value: "3", label: "Quarta" },
                        { value: "4", label: "Quinta" },
                        { value: "5", label: "Sexta" },
                        { value: "6", label: "Sábado" },
                      ]}
                    />
                    <Input
                      col="col-25"
                      name="from"
                      label="Das"
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) =>
                        setScheduleItemValue(index, "from", e.target.value)
                      }
                    />
                    <Input
                      col="col-25"
                      name="to"
                      label="Até"
                      type="time"
                      value={scheduleItem.to}
                      onChange={(e) =>
                        setScheduleItemValue(index, "to", e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
