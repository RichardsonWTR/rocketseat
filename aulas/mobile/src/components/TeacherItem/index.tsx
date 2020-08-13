import React, { useState } from 'react';
import { View, Image, Text, Linking, AsyncStorage } from "react-native";
import styles from "./styles";
import { RectButton } from 'react-native-gesture-handler';

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

    async function handleToggleFavoriteButton(isFavorited: boolean){
        const favorites = await AsyncStorage.getItem('favorites')
        let favArray = favorites ? JSON.parse(favorites): []
        
        if(isFavorited){
            const favIndex = favArray.findIndex((teacherItem : Teacher) =>{
                teacherItem.id === teacher.id
            });
            favArray.splice(favIndex, 1);
            setFavorited(false);
        }else{
            favArray.push(teacher);
            await AsyncStorage.setItem('favorites', JSON.stringify(favArray))
            setFavorited(true);
        }
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
                        <RectButton style={[styles.favoriteButton, styles.favorited]} onPress={() => handleToggleFavoriteButton(true)}>
                            <Image source={unfavoriteIcon} />
                        </RectButton>
                    ): (
                        <RectButton style={styles.favoriteButton} onPress={() => handleToggleFavoriteButton(false)}>
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