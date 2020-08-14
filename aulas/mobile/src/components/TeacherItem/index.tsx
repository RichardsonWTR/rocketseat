import React, { useState } from 'react';
import { View, Image, Text, Linking } from "react-native";
import styles from "./styles";
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

export interface Teacher{
    id: number,
    name: string,
    avatar: string,
    bio: string,
    cost: number,
    subject: string,
    whatsapp:string
}
interface TeacherItemProps {
    teacher: Teacher,
    isFavorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, isFavorited: favorited}) => {
    const [isFavorited, setFavorited] = useState(favorited);

    function handleLinkToWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavoriteButton(newFavoritedState: boolean){
        const favorites = await AsyncStorage.getItem('favorites')
        let favArray = favorites ? JSON.parse(favorites): []
        if(newFavoritedState){
            favArray.push(teacher);
            
        }else{
            const favIndex = favArray.findIndex((teacherItem : Teacher) =>{
                teacherItem.id === teacher.id
            });
            favArray.splice(favIndex, 1);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favArray))
        setFavorited(newFavoritedState);
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: teacher.avatar}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {' '}
                    <Text style={styles.priceValue}>R$ {' '} {teacher.cost}</Text>
                </Text>
            
                <View style={styles.buttonsContainer}>
                    { isFavorited ? (
                        <RectButton style={[styles.favoriteButton, styles.favorited]} onPress={() => handleToggleFavoriteButton(false)}>
                            <Image source={unfavoriteIcon} />
                        </RectButton>
                    ): (
                        <RectButton style={styles.favoriteButton} onPress={() => handleToggleFavoriteButton(true)}>
                                <Image source={heartOutlineIcon} />
                        </RectButton>
                    )}
                    
                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image
                            source={whatsappIcon}
                        />
                    <Text style={styles.contactButtonText}>Entrar em contato</Text>
                </RectButton>
                </View>
            </View>
        </View>
    )
}
export default TeacherItem;