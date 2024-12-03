import { Audio } from 'expo-av';

export async function startRecording(setRecording) {
  try {
   
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

export async function stopRecording(recording, handleTranslate, setResponse) {
  try {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
  }
  catch (err) {
    console.error('Failed to stop recording', err);
  }

  const uri = recording.getURI();
  const { sound } = await Audio.Sound.createAsync(
    { uri } 
  );


  // Get the duration after the audio is loaded
  const status = await sound.getStatusAsync();

  // setDuration(status.durationMillis);
  await handleTranslate(status.durationMillis, setResponse);

  return status.durationMillis;
}