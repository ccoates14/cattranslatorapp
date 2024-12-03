import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import {startRecording, stopRecording} from './util/audio';
import { Audio } from 'expo-av';
import handleTranslate from './util/handleTranslate';

const getPermission = async () => {
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  if (permissionResponse.status !== 'granted') {
    console.log('Requesting permission..');
    await requestPermission();
  }
}

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [record, setRecord] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  getPermission();

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Text style={styles.text}>{isRecording ? "Recording..." : "Hold to Translate Cat Demands"}</Text>
      <TouchableOpacity
        style={styles.recordButton}
        onPressIn={() => {
          setIsRecording(true);
          startRecording(setRecord);
        }}
        onPressOut={() => {
          setIsRecording(false);
          setLoading(true);
          stopRecording(record, handleTranslate, setResponse).then(() => setLoading(false));
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{isRecording ? 'Release to Stop' : 'Hold to Start'}</Text>
      </TouchableOpacity>
    </View>
    {loading && <ActivityIndicator size="large" color="#0000ff" />}

    <Text style={styles.translation}>{response}</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  translation: { marginTop: 20, fontSize: 18 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  recordButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});