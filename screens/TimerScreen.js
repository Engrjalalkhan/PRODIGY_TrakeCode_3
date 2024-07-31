import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TimerScreen = () => {
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [totalSeconds, setTotalSeconds] = useState(0); // Total timer seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTotalSeconds(prevSeconds => {
          if (prevSeconds <= 0) {
            clearInterval(id);
            setIsRunning(false);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    setTotalSeconds(parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds));
  }, [hours, minutes, seconds]);

  const formatTime = (time) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out my timer set to: ${formatTime(totalSeconds)}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeInputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={hours}
          onChangeText={setHours}
          maxLength={2}
          placeholder="HH"
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
          maxLength={2}
          placeholder="MM"
        />
        <Text style={styles.colon}>:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
          maxLength={2}
          placeholder="SS"
        />
      </View>
      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>{formatTime(totalSeconds)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Icon name="refresh" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStartPause}>
          <Icon name={isRunning ? "pause" : "play"} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Icon name="share-social" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  colon: {
    fontSize: 30,
    color: '#fff',
  },
  timerContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 150,
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    fontSize: 40,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    margin: 5,
    borderWidth:1
  },
});

export default TimerScreen;
