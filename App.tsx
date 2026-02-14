import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Vibration, Pressable, ScrollView } from 'react-native';
import { tokens } from './src/styles/tokens';
import { BlurView } from 'expo-blur';

interface SummaryPoint {
  text: string;
  timestamp: number;
}

export default function App() {
  const [isClassMode, setIsClassMode] = useState(true);
  const [timeToLeave, setTimeToLeave] = useState(15);
  const [isRaining, setIsRaining] = useState(true);
  const [glyphActive, setGlyphActive] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(18);
  const [onCampus, setOnCampus] = useState(true);
  const [batterySaverActive, setBatterySaverActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [summaryPoints, setSummaryPoints] = useState<SummaryPoint[]>([
    { text: 'Discussed quantum entanglement properties', timestamp: Date.now() - 50000 },
    { text: 'Reviewed Bell inequality theorem', timestamp: Date.now() - 30000 },
    { text: 'Assignment due next Tuesday', timestamp: Date.now() - 10000 }
  ]);
  const [isRecording, setIsRecording] = useState(false);

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modeTransition = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isRaining && timeToLeave <= 15) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Vibration.vibrate([0, 200, 100, 200]);
    }
  }, [isRaining, timeToLeave]);

  useEffect(() => {
    if (onCampus && batteryLevel < 20 && !batterySaverActive) {
      setBatterySaverActive(true);
    }
  }, [onCampus, batteryLevel, batterySaverActive]);

  useEffect(() => {
    if (glyphActive) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  }, [glyphActive]);

  const handleMagicSummarize = () => {
    const newSummary: SummaryPoint[] = [
      { text: 'Key concept: wave-particle duality', timestamp: Date.now() },
      { text: 'Exam covers chapters 8-12', timestamp: Date.now() },
      { text: 'Office hours Thursday 2-4pm', timestamp: Date.now() }
    ];
    setSummaryPoints(newSummary);
    
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true })
    ]).start();
  };

  const toggleBatterySaver = () => {
    setBatterySaverActive(!batterySaverActive);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleMode = () => {
    Animated.timing(modeTransition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsClassMode(!isClassMode);
      Animated.timing(modeTransition, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1]
  });

  return (
    <View style={styles.container}>
      <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {isClassMode ? (
            <Animated.View style={[styles.modeContent, { opacity: modeTransition }]}>
              <View style={styles.header}>
                <View style={styles.timerSection}>
                  {isRaining && timeToLeave <= 15 && (
                    <Animated.View style={[styles.rainAlert, { opacity: pulseOpacity }]}>
                      <Text style={styles.rainText}>☂</Text>
                    </Animated.View>
                  )}
                  <Text style={styles.timerLabel}>LEAVE IN</Text>
                  <Text style={styles.timerValue}>{timeToLeave}m</Text>
                </View>
              </View>

              {glyphActive && (
                <View style={styles.glyphBar}>
                  <View style={styles.glyphDot} />
                  <Text style={styles.glyphText}>GLYPHS: FOCUS PULSE ACTIVE</Text>
                  {isRecording && <View style={styles.recordingDot} />}
                </View>
              )}

              <ScrollView 
                style={styles.summaryContainer}
                contentContainerStyle={styles.summaryContent}
                showsVerticalScrollIndicator={false}
              >
                {summaryPoints.map((point, idx) => (
                  <View key={idx} style={styles.summaryRow}>
                    <View style={styles.dotMatrix}>
                      <View style={styles.matrixDot} />
                      <View style={styles.matrixDot} />
                      <View style={styles.matrixDot} />
                    </View>
                    <Text style={styles.summaryText} numberOfLines={2}>
                      {point.text}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.controls}>
                <Pressable 
                  style={[styles.button, styles.magicButton]}
                  onPress={handleMagicSummarize}
                >
                  <Text style={styles.buttonText}>✨ MAGIC</Text>
                </Pressable>

                <Pressable 
                  style={[styles.button, batterySaverActive && styles.buttonActive]}
                  onPress={toggleBatterySaver}
                >
                  <Text style={styles.buttonText}>
                    {batterySaverActive ? '⚡ ON' : '🔋 ' + batteryLevel + '%'}
                  </Text>
                </Pressable>

                <Pressable 
                  style={[
                    styles.button, 
                    styles.muteButton,
                    isMuted && styles.muteActive
                  ]}
                  onPress={toggleMute}
                >
                  <Text style={styles.buttonText}>{isMuted ? '🔇' : '🔊'}</Text>
                </Pressable>
              </View>

              <Pressable onPress={toggleMode} style={styles.modeToggle}>
                <Text style={styles.modeToggleText}>AWAY MODE</Text>
              </Pressable>
            </Animated.View>
          ) : (
            <Animated.View style={[styles.modeContent, { opacity: modeTransition }]}>
              <Text style={styles.awayTitle}>AWAY MODE</Text>
              <Text style={styles.awaySubtitle}>Next Class</Text>
              <Text style={styles.awayTime}>2:30 PM</Text>
              <Text style={styles.awayLocation}>Building C, Room 204</Text>

              <Pressable onPress={toggleMode} style={styles.modeToggle}>
                <Text style={styles.modeToggleText}>CLASS MODE</Text>
              </Pressable>
            </Animated.View>
          )}
        </Animated.View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 22,
    backgroundColor: tokens.colors.dark,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: tokens.spacing[4],
  },
  modeContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing[2],
  },
  timerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rainAlert: {
    position: 'absolute',
    top: -8,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
    borderRadius: tokens.borderRadius['2xl'],
    paddingVertical: tokens.spacing[1],
    paddingHorizontal: tokens.spacing[2],
  },
  rainText: {
    fontSize: 16,
    textAlign: 'center',
  },
  timerLabel: {
    ...tokens.textStyles.ndotHeadlineXSmall,
    fontSize: 12,
    lineHeight: 12,
    color: tokens.colors['secondary-light'],
    marginTop: tokens.spacing[2],
  },
  timerValue: {
    ...tokens.textStyles.ndotHeadlineMedium,
    fontSize: 28,
    lineHeight: 28,
    color: tokens.colors.light,
    marginTop: tokens.spacing[1],
  },
  glyphBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: tokens.borderRadius.lg,
    paddingVertical: tokens.spacing[1.5],
    paddingHorizontal: tokens.spacing[2],
    marginBottom: tokens.spacing[2],
  },
  glyphDot: {
    width: 6,
    height: 6,
    borderRadius: tokens.borderRadius.full,
    backgroundColor: tokens.colors.red,
    marginRight: tokens.spacing[1.5],
  },
  glyphText: {
    ...tokens.textStyles.ndotHeadlineXSmall,
    fontSize: 8,
    lineHeight: 8,
    color: tokens.colors.light,
    flex: 1,
    flexShrink: 1,
  },
  recordingDot: {
    width: 6,
    height: 6,
    borderRadius: tokens.borderRadius.full,
    backgroundColor: tokens.colors.red,
    marginLeft: tokens.spacing[1],
  },
  summaryContainer: {
    flex: 1,
    marginBottom: tokens.spacing[2],
  },
  summaryContent: {
    flexGrow: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing[1.5],
  },
  dotMatrix: {
    flexDirection: 'column',
    marginRight: tokens.spacing[1.5],
    marginTop: tokens.spacing[0.5],
  },
  matrixDot: {
    width: 3,
    height: 3,
    borderRadius: 1,
    backgroundColor: tokens.colors['secondary-light'],
    marginBottom: 2,
  },
  summaryText: {
    ...tokens.textStyles.bodySmall,
    fontSize: 11,
    lineHeight: 14,
    color: tokens.colors.light,
    flex: 1,
    flexShrink: 1,
  },
  controls: {
    flexDirection: 'row',
    gap: tokens.spacing[1.5],
  },
  button: {
    flex: 1,
    flexShrink: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: tokens.borderRadius.lg,
    paddingVertical: tokens.spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  magicButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
  },
  buttonActive: {
    backgroundColor: 'rgba(216, 25, 33, 0.3)',
  },
  muteButton: {
    backgroundColor: tokens.colors.dark,
  },
  muteActive: {
    backgroundColor: tokens.colors.dark,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  buttonText: {
    ...tokens.textStyles.labelUppercasedSmall,
    fontSize: 10,
    color: tokens.colors.light,
    flexShrink: 1,
  },
  modeToggle: {
    marginTop: tokens.spacing[2],
    alignItems: 'center',
    paddingVertical: tokens.spacing[1],
  },
  modeToggleText: {
    ...tokens.textStyles.ndotHeadlineXSmall,
    fontSize: 10,
    lineHeight: 10,
    color: tokens.colors['secondary-light'],
  },
  awayTitle: {
    ...tokens.textStyles.ndotHeadlineMedium,
    fontSize: 24,
    lineHeight: 24,
    color: tokens.colors.light,
    textAlign: 'center',
    marginBottom: tokens.spacing[4],
  },
  awaySubtitle: {
    ...tokens.textStyles.ndotHeadlineXSmall,
    fontSize: 14,
    lineHeight: 14,
    color: tokens.colors['secondary-light'],
    textAlign: 'center',
    marginBottom: tokens.spacing[2],
  },
  awayTime: {
    ...tokens.textStyles.ndotHeadlineMedium,
    fontSize: 32,
    lineHeight: 32,
    color: tokens.colors.light,
    textAlign: 'center',
    marginBottom: tokens.spacing[1],
  },
  awayLocation: {
    ...tokens.textStyles.bodyMedium,
    color: tokens.colors['secondary-light'],
    textAlign: 'center',
    marginBottom: tokens.spacing[4],
  },
});
