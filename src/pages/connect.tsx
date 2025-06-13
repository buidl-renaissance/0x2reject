import styled, { keyframes } from 'styled-components';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #1A1A1A;
  color: #F9FAFB;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
`;

const RejectButton = styled.button`
  background: #FF4D4F;
  color: #F9FAFB;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0.5rem;
  
  &:hover {
    animation: ${shake} 0.5s ease-in-out;
  }
`;

const RedeemButton = styled.button`
  background: #4F46E5;
  color: #F9FAFB;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0.5rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Modal = styled.div`
  background: #2A2A2A;
  border: 4px solid #FF4D4F;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem;
  
  h2 {
    font-family: 'Space Grotesk', sans-serif;
    color: #FF4D4F;
    border-bottom: 2px solid #FF4D4F;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const TypingText = styled.p`
  overflow: hidden;
  white-space: nowrap;
  font-family: 'IBM Plex Mono', monospace;
  animation: ${typewriter} 2s steps(40, end);
  margin: 1rem 0;
`;

const GhostMessage = styled.div`
  color: #9CA3AF;
  text-align: center;
  padding: 2rem;
  opacity: 0.7;
  font-family: 'IBM Plex Mono', monospace;
  transition: opacity 0.5s ease;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  background: #2A2A2A;
  border-radius: 16px;
  margin: 2rem auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const VideoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 1.2rem;
`;

const SwipeContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
`;

const SwipeButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  color: #F9FAFB;
  border: none;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ActionButton = styled.button`
  background: #4F46E5;
  color: #F9FAFB;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  margin: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    background: #4338CA;
  }

  &.pass {
    background: #FF4D4F;
    &:hover {
      background: #DC2626;
    }
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const ShootYourShotModal = styled(Modal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 500px;
  width: 90%;
  background: #2A2A2A;
  border: 4px solid #4F46E5;
  
  h2 {
    color: #4F46E5;
    border-bottom: 2px solid #4F46E5;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const ShotButton = styled(ActionButton)`
  width: 100%;
  margin: 0.5rem 0;
  
  &.accept {
    background: #10B981;
    &:hover {
      background: #059669;
    }
  }
  
  &.decline {
    background: #FF4D4F;
    &:hover {
      background: #DC2626;
    }
  }
`;

const MessageContainer = styled.div`
  background: #2A2A2A;
  border: 4px solid #10B981;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
`;

const Timer = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  color: #10B981;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  background: #1A1A1A;
  border: 2px solid #4F46E5;
  border-radius: 8px;
  color: #F9FAFB;
  padding: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  margin-bottom: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #10B981;
  }
`;

const SendButton = styled(ActionButton)`
  width: 100%;
  background: #10B981;
  
  &:hover {
    background: #059669;
  }
  
  &:disabled {
    background: #374151;
    cursor: not-allowed;
    transform: none;
  }
`;

export default function Connect() {
  const [showShotModal, setShowShotModal] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60); // 24 hours in seconds
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (hasAccepted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasAccepted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShowMeWhatYouGot = () => {
    setShowShotModal(true);
  };

  const handleShotResponse = (accepted: boolean) => {
    setShowShotModal(false);
    if (accepted) {
      setHasAccepted(true);
    }
  };

  const handleSendMessage = () => {
    // Here you would typically make an API call to send the message
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <Container>
      <Head>
        <title>Connect | Epicurious</title>
        <meta name="description" content="Make connections, embrace rejection" />
      </Head>

      <VideoContainer>
        <VideoPlaceholder>
          Video Preview Coming Soon
        </VideoPlaceholder>
        <SwipeContainer>
          <SwipeButton>👈</SwipeButton>
          <SwipeButton>👉</SwipeButton>
        </SwipeContainer>
      </VideoContainer>

      <ActionButtonGroup>
        <ActionButton onClick={handleShowMeWhatYouGot}>Show Me What You Got 🎯</ActionButton>
        <ActionButton className="pass">Pass ⏭️</ActionButton>
      </ActionButtonGroup>

      {hasAccepted && timeRemaining > 0 && (
        <MessageContainer>
          <Timer>
            Time Remaining: {formatTime(timeRemaining)}
          </Timer>
          <MessageInput
            placeholder="Type your message or paste a meme URL here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendButton
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            Send Message 🚀
          </SendButton>
        </MessageContainer>
      )}

      {showShotModal && (
        <>
          <Overlay onClick={() => setShowShotModal(false)} />
          <ShootYourShotModal>
            <h2>Shoot Your Shot! 🎯</h2>
            <TypingText>
              Someone wants to see what you&apos;ve got...
            </TypingText>
            <ShotButton className="accept" onClick={() => handleShotResponse(true)}>
              Let&apos;s Do This! 💪
            </ShotButton>
            <ShotButton className="decline" onClick={() => handleShotResponse(false)}>
              Maybe Next Time 😅
            </ShotButton>
          </ShootYourShotModal>
        </>
      )}

      <ButtonGroup>
        <RejectButton>Nah 😬</RejectButton>
        <RejectButton>Pass 👋</RejectButton>
        <RejectButton>Not Feeling It 💅</RejectButton>
      </ButtonGroup>

      <Modal>
        <h2>Redemption Time</h2>
        <TypingText>
          Making a comeback with style...
        </TypingText>
        <RedeemButton>Redeem Myself 🤝</RedeemButton>
        <RedeemButton>Try Again 👀</RedeemButton>
      </Modal>

      <GhostMessage>
        👻 You&apos;ve ghosted. We get it.
      </GhostMessage>
    </Container>
  );
}
