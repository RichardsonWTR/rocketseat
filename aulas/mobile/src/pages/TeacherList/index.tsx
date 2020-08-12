import React, { useState } from 'react';
import { View,Text } from 'react-native';
import styles from './styles'

import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    function handleToogleFiltersVisible(){
        setIsFiltersVisible(!isFiltersVisible)
    }

    function handleSubmitButton(){
        handleToogleFiltersVisible();
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
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                placeholderTextColor='#c1bccc'
                                style={styles.input}
                                placeholder="Qual o dia?"
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                placeholderTextColor='#c1bccc'
                                style={styles.input}
                                placeholder="Qual o horário?"
                            />
                        </View>
                    </View>

                    <RectButton style={styles.submitButton} onPress={handleSubmitButton}>
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
                <TeacherItem/>
                <TeacherItem/>
                <TeacherItem/>
                <TeacherItem/>
            </ScrollView>
        </View>
    );
}

export default TeacherList;