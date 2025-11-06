import { Avatar } from "@radix-ui/react-avatar";
import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    const loadChat = async () => {
      // Evitar que se cargue más de una vez
      if (window.__n8nChatLoaded) return;
      window.__n8nChatLoaded = true;

      try {
        // Cargar los estilos del chat
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        document.head.appendChild(link);

        // Importar el módulo dinámicamente
        const { createChat } = await import(
          "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js"
        );

        // Inicializar el chat con tu webhook
        createChat({
          webhookUrl: import.meta.env.VITE_N8N_CHAT_ENDPOINT,
	webhookConfig: {
		method: 'POST',
		headers: {}
	},
	target: '#n8n-chat',
	mode: 'window',
	chatInputKey: 'chatInput',
	chatSessionKey: 'sessionId',
	loadPreviousSession: true,
	metadata: {},
	showWelcomeScreen: false,
	defaultLanguage: 'en',
	initialMessages: [
		'¡Hola! 👋',
		'Soy NashBot, el asistente virtual de Ignacio Sánchez Yuste. ¿En qué puedo ayudarte hoy? '
	],
	i18n: {
		en: {
			title: 'NashBot',
			subtitle: "Cuando Ignacio no está disponible, yo puedo ayudarte.😁",
			footer: '',
			getStarted: 'Nueva Conversación',
			inputPlaceholder: 'Escribe tu pregunta..'
		},
	},
	avatar: 'public/img/ChatGPT Image 6 nov 2025, 17_42_35.png',
	enableStreaming: true,
});
      } catch (error) {
        console.error("Error cargando el chat de n8n:", error);
      }
    };

    loadChat();
  }, []);

  return null; // No renderiza nada en el DOM directamente
}
