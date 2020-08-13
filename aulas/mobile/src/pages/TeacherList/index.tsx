import React, { useState } from 'react';
import { View,Text } from 'react-native';
import styles from './styles'

import PageHeader from '../../components/PageHeader'
import TeacherItem ,{ Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [teachers,setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [weekday, setWeekday] = useState('');
    const [time, setTime] = useState('');

    function handleToogleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    function handleFilterSubmit(){
        api.get('classes',{
            params:{
                subject,
                week_day: weekday,
                time
            }
        })
        .then(res => {
            setIsFiltersVisible(false);
            setTeachers(res.data);
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" 
                headerRight={
                    <BorderlessButton style={styles.filterButton} onPress={handleToogleFiltersVisible}>
                        <Feather name="filter" size={25} color="#fff"/>
                    </BorderlessButton>
                }>
                { isFiltersVisible && (
                    <View style={styles.searchForm}>
                    <View>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            placeholderTextColor='#c1bccc'
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                placeholderTextColor='#c1bccc'
                                style={styles.input}
                                placeholder="Qual o dia?"
                                value={weekday}
                                onChangeText={text => setWeekday(text)}
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                placeholderTextColor='#c1bccc'
                                style={styles.input}
                                placeholder="Qual o horário?"
                                value={time}
                                onChangeText={text => setTime(text)}
                            />
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Pesquisar</Text>
                    </RectButton>
                </View>
                )}
            </PageHeader>

            <ScrollView
              style={styles.teacherList}
              contentContainerStyle={{
                  paddingHorizontal: 16,
                  paddingBottom: 16
              }}
            >
                {teachers.map((teacher: Teacher)=>{
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;