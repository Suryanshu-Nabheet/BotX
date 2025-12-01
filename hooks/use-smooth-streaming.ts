import { useEffect, useState, useRef } from 'react';

export function useSmoothStreaming(
  targetText: string,
  isStreaming: boolean,
  speed: number = 10 // ms per char
) {
  const [currentText, setCurrentText] = useState(isStreaming ? "" : targetText);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentTextRef = useRef(currentText);

  // Sync ref
  useEffect(() => {
    currentTextRef.current = currentText;
  }, [currentText]);

  // If not streaming, just show immediately (e.g. history)
  useEffect(() => {
    if (!isStreaming) {
      setCurrentText(targetText);
      currentTextRef.current = targetText;
    }
  }, [isStreaming, targetText]);

  useEffect(() => {
    if (!isStreaming) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const current = currentTextRef.current;
      if (current.length < targetText.length) {
        const nextChar = targetText.charAt(current.length);
        const nextText = current + nextChar;
        setCurrentText(nextText);
        currentTextRef.current = nextText;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetText, isStreaming, speed]);

  return currentText;
}
