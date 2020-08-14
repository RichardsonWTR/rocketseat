import React, { useState } from 'react';
import { View,Text,ScrollView, TextInput } from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader'
import TeacherItem ,{ Teacher } from '../../components/TeacherItem';
import {  BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favoriteIds, setFavoritesIds] = useState<number[]>([]);
    const [teachers,setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [weekday, setWeekday] = useState('');
    const [time, setTime] = useState('');


    useFocusEffect(()=>{
        loadFavorites();
    })
    
    function loadFavorites(){
        AsyncStorage
            .getItem('favorites')
            .then((res:any) => {
                if(res){
                    const favoritedTeachers = JSON.parse(res);
                    const favoritedTeachersIds = favoritedTeachers.map((t : Teacher) => t.id)
                    setFavoritesIds(favoritedTeachersIds)
                }
            })
    }

    function handleToogleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    function handleFilterSubmit(){
        loadFavorites();
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
                    return (
                    <TeacherItem 
                        key={teacher.id}
                        teacher={teacher}
                        isFavorited={favoriteIds.includes(teacher.id)}/>
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;