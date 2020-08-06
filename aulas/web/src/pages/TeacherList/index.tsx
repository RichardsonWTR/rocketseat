import React from 'react';

import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import './styles.css'
import Input from '../../components/Input';

function TeacherList(){
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
              <form  id="search-teachers">
                <Input name="subject" label="Matéria" />
                <Input name="week-day" label="Dia da Semana" />
                <Input name="time" label="Time" type="time"/>
              </form>
                </PageHeader>

                <main>
                    <TeacherItem/>
                    <TeacherItem/>
                    <TeacherItem/>
                </main>
        </div>
    )
}

export default TeacherList;