import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const clockSize = width * 0.8;
const center = { x: clockSize / 2, y: clockSize / 2 };
const radius = clockSize / 2;

const AnalogClock = ({ onTimeSelect }) => {
  const [time, setTime] = useState(new Date());
  const [amPm, setAmPm] = useState(time.getHours() >= 12 ? 'PM' : 'AM');
  const [showDoubleValueDigits, setShowDoubleValueDigits] = useState(false);
  const [selectedDigit, setSelectedDigit] = useState(null);

  const secondHand = useRef(new Animated.Value(0)).current;
  const minuteHand = useRef(new Animated.Value(0)).current;
  const hourHand = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now);
      
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours() % 12;

      Animated.timing(secondHand, {
        toValue: seconds * 6,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(minuteHand, {
        toValue: (minutes + seconds / 60) * 6,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      Animated.timing(hourHand, {
        toValue: (hours + minutes / 60) * 30,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      setAmPm(now.getHours() >= 12 ? 'PM' : 'AM');
    };

    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [secondHand, minuteHand, hourHand]);

  const formattedTime = `${String(time.getHours() % 12 || 12).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')} ${amPm}`;

  const renderHourDigits = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i - 3) * (Math.PI / 6);
      const x = center.x + (radius - 30) * Math.cos(angle);
      const y = center.y + (radius - 30) * Math.sin(angle);
      numbers.push(
        <TouchableOpacity
          key={i}
          style={[styles.numberContainer, { left: x - 20, top: y - 20 }]}
          onPress={() => handleDigitPress(i)}
        >
          <Text style={styles.number}>
            {i}
          </Text>
        </TouchableOpacity>
      );
    }
    return numbers;
  };

  const renderDoubleValueDigits = () => {
    const digits = [];
    for (let i = 0; i <= 55; i += 5) {
      const angle = (i / 60) * (Math.PI * 2) - Math.PI / 2;
      const x = center.x + (radius - 30) * Math.cos(angle);
      const y = center.y + (radius - 30) * Math.sin(angle);
      digits.push(
        <TouchableOpacity
          key={i}
          style={[styles.doubleValueContainer, { left: x - 20, top: y - 20 }]}
          onPress={() => handleDoubleValuePress(i)}
        >
          <Text style={styles.doubleValue}>
            {String(i).padStart(2, '0')}
          </Text>
        </TouchableOpacity>
      );
    }
    return digits;
  };

  const handleDigitPress = (digit) => {
    setSelectedDigit(digit);
    setShowDoubleValueDigits(true);
  };

  const handleDoubleValuePress = (value) => {
    const hours = selectedDigit || 0;
    const minutes = value;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    setShowDoubleValueDigits(false);
    setSelectedDigit(null);
    onTimeSelect({ hours, minutes });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formattedTime}</Text>
      <View style={styles.clock}>
        {!showDoubleValueDigits ? renderHourDigits() : renderDoubleValueDigits()}
        <Animated.View style={[styles.hand, styles.secondHand, { transform: [{ rotate: secondHand.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }]} />
        <Animated.View style={[styles.hand, styles.minuteHand, { transform: [{ rotate: minuteHand.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }]} />
        <Animated.View style={[styles.hand, styles.hourHand, { transform: [{ rotate: hourHand.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }] }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: clockSize,
    height: clockSize,
  },
  timeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  clock: {
    width: clockSize,
    height: clockSize,
    borderRadius: clockSize / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 18,
    textAlign: 'center',
  },
  doubleValueContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doubleValue: {
    fontSize: 14,
    textAlign: 'center',
  },
  hand: {
    position: 'absolute',
    width: '50%',
    backgroundColor: 'black',
  },
  hourHand: {
    height: 6,
    backgroundColor: 'black',
  },
  minuteHand: {
    height: 4,
    backgroundColor: 'blue',
  },
  secondHand: {
    height: 2,
    backgroundColor: 'red',
  },
});

export default AnalogClock;
