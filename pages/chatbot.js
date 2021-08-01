import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
const theme = {
    background: '#f5f8fb',
    headerBgColor: '#0b172e',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#0b172e',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };
  const config={
    width: "320px",
    height: "500px",
    floating:true
  };
  
export default function Chatbots() {
  return (
    <div className="App">
     <ThemeProvider theme={theme}>
      <ChatBot
  steps={[
    {
      id: '0',
      message: 'Hi Veronica',
      trigger:'1'
    },
    {
        id: '1',
        message: 'How can we help you today?',
        trigger:'2'
      },
      {
        id: '2',
        user: true,
        trigger: '3'
      },
      {
        id: '3',
        message: ' nice to meet you!',
        end: true,
      },

  ]}
  {...config}
/>
</ThemeProvider>
    </div>
  );
}