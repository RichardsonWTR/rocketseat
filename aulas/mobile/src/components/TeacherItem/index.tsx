import React from 'react';
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

function TeacherItem(){
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    style={styles.avatar}
                    source={{ uri: 'https://avatars2.githubusercontent.com/u/12430174?s=460&u=bc64b18611667c3fc3623f814c6c3f4d36a942fd&v=4'}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Richardson Rosa</Text>
                    <Text style={styles.subject}>English</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                psam consequatur sapiente dignissimos dolore nemo! Illum tenetur libero atque, facere eum earum accusamus ex consequatur maxime sint? Cumque odio nam eligendi?
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {' '}
                    <Text style={styles.priceValue}>R$ 100,00</Text>
                </Text>
            
                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/* <Image source={heartOutlineIcon} /> */}
                        <Image source={unfavoriteIcon} />
                    </RectButton>

                    <RectButton style={styles.contactButton}>
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