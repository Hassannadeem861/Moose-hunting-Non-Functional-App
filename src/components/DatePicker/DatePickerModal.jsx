import React, { useState, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
} from 'react-native';
import { FONTS } from '../../utils/fonts';
import { fs, vh, vw } from '../../utils/responsive';

const PRIMARY = '#E01F00';
const ITEM_HEIGHT = 44;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS   = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const YEARS  = Array.from({ length: 51 }, (_, i) => String(new Date().getFullYear() - 10 + i));

const ColumnPicker = ({ data, selectedIndex, onSelect }) => {
    const scrollRef = useRef(null);

    const handleScroll = (e) => {
        const y = e.nativeEvent.contentOffset.y;
        const index = Math.round(y / ITEM_HEIGHT);
        if (index >= 0 && index < data.length) onSelect(index);
    };

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.column}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onMomentumScrollEnd={handleScroll}
            onScrollEndDrag={handleScroll}
            contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
        >
            {data.map((item, index) => (
                <TouchableOpacity
                    key={item}
                    style={[styles.columnItem, selectedIndex === index && styles.columnItemSelected]}
                    onPress={() => {
                        onSelect(index);
                        scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: true });
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.columnText, selectedIndex === index && styles.columnTextSelected]}>
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

/**
 * Reusable date picker modal.
 *
 * Props:
 *   visible      {boolean}
 *   onClose      {() => void}
 *   onConfirm    {(dateString: string) => void}  — returns e.g. "15 Jan 2025"
 *   title        {string}  optional header label
 */
const DatePickerModal = ({ visible, onClose, onConfirm, title = 'Select Date' }) => {
    const today = new Date();
    const [monthIdx, setMonthIdx] = useState(today.getMonth());
    const [dayIdx,   setDayIdx]   = useState(today.getDate() - 1);
    const [yearIdx,  setYearIdx]  = useState(10); // YEARS[10] = current year

    const handleConfirm = () => {
        const dateStr = `${DAYS[dayIdx]} ${MONTHS[monthIdx]} ${YEARS[yearIdx]}`;
        onConfirm(dateStr);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
                <View style={styles.sheet} onStartShouldSetResponder={() => true}>

                    {/* Handle bar */}
                    <View style={styles.handle} />

                    <Text style={styles.title}>{title}</Text>

                    {/* Highlight bar for selected row */}
                    <View pointerEvents="none" style={styles.selectionHighlight} />

                    <View style={styles.columns}>
                        <ColumnPicker data={DAYS}   selectedIndex={dayIdx}   onSelect={setDayIdx} />
                        <ColumnPicker data={MONTHS} selectedIndex={monthIdx} onSelect={setMonthIdx} />
                        <ColumnPicker data={YEARS}  selectedIndex={yearIdx}  onSelect={setYearIdx} />
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} activeOpacity={0.8}>
                            <Text style={styles.confirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default DatePickerModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
        paddingHorizontal: vw(4),
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#DDD',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 4,
    },
    title: {
        textAlign: 'center',
        fontSize: fs(16),
        fontFamily: FONTS.display_medium,
        color: '#222',
        marginBottom: 8,
        paddingTop: 4,
    },
    columns: {
        flexDirection: 'row',
        height: ITEM_HEIGHT * 3,
        overflow: 'hidden',
    },
    column: {
        flex: 1,
    },
    columnItem: {
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    columnItemSelected: {
        // visually highlighted via selectionHighlight overlay
    },
    columnText: {
        fontSize: fs(15),
        fontFamily: FONTS.display_regular,
        color: '#999',
    },
    columnTextSelected: {
        fontSize: fs(16),
        fontFamily: FONTS.display_medium,
        color: '#111',
    },
    selectionHighlight: {
        position: 'absolute',
        left: vw(4),
        right: vw(4),
        top: ITEM_HEIGHT * 1 + 62, // title area approx
        height: ITEM_HEIGHT,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEE',
        backgroundColor: '#F7F7F7',
    },
    actions: {
        flexDirection: 'row',
        gap: vw(3),
        marginTop: 16,
    },
    cancelBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: PRIMARY,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelText: {
        color: PRIMARY,
        fontSize: fs(15),
        fontFamily: FONTS.display_medium,
    },
    confirmBtn: {
        flex: 1,
        backgroundColor: PRIMARY,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontSize: fs(15),
        fontFamily: FONTS.display_medium,
    },
});
