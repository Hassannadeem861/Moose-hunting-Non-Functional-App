import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
} from 'react-native';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const PRIMARY = '#E01F00';

const UploadImageComponent = ({ onImageSelect, mediaType = 'photo' }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePress = () => {
        Alert.alert(
            'Select Photo',
            'Choose how to add your photo',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Enter URL (Demo)',
                    onPress: () => {
                        const demoUri = 'https://i.pravatar.cc/400';
                        setSelectedImage(demoUri);
                        if (onImageSelect) {
                            onImageSelect(demoUri, mediaType);
                        }
                    },
                },
            ],
        );
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            {selectedImage ? (
                <Image
                    source={{ uri: selectedImage }}
                    style={styles.preview}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.placeholder}>
                    <View style={styles.iconCircle}>
                        <Text style={styles.iconText}>+</Text>
                    </View>
                    <Text style={styles.uploadTitle}>Upload Photo</Text>
                    <Text style={styles.uploadSubtitle}>
                        Tap to select your profile photo
                    </Text>
                </View>
            )}

            {selectedImage && (
                <View style={styles.changeOverlay}>
                    <Text style={styles.changeText}>Tap to change</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default UploadImageComponent;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        alignItems: 'center',
        gap: 12,
    },
    iconCircle: {
        width: vw(20),
        height: vw(20),
        borderRadius: vw(10),
        backgroundColor: '#FFE8E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: fs(36),
        color: PRIMARY,
        lineHeight: fs(40),
    },
    uploadTitle: {
        fontSize: fs(18),
        fontFamily: FONTS.display_bold,
        fontWeight: '700',
        color: '#111',
    },
    uploadSubtitle: {
        fontSize: fs(13),
        fontFamily: FONTS.display_regular,
        fontWeight: '400',
        color: '#888',
        textAlign: 'center',
        paddingHorizontal: vw(8),
    },
    preview: {
        width: '100%',
        height: '100%',
    },
    changeOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        paddingVertical: vh(1.5),
        alignItems: 'center',
    },
    changeText: {
        fontSize: fs(13),
        fontFamily: FONTS.display_regular,
        fontWeight: '600',
        color: '#fff',
    },
});
