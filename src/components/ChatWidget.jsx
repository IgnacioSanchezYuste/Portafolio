import { useEffect } from "react";

export default function ChatWidget() {
  useEffect(() => {
    if (window.__n8nChatLoaded) return;

    const loadChat = async () => {
      window.__n8nChatLoaded = true;
      try {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
        document.head.appendChild(link);

        const { createChat } = await import(
          "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js"
        );

        createChat({
          webhookUrl: import.meta.env.VITE_N8N_CHAT_ENDPOINT,
          webhookConfig: { method: "POST", headers: {} },
          target: "#n8n-chat",
          mode: "window",
          chatInputKey: "chatInput",
          chatSessionKey: "sessionId",
          loadPreviousSession: true,
          metadata: {},
          showWelcomeScreen: false,
          defaultLanguage: "en",
          initialMessages: [
            "¡Hola! 👋",
            "Soy NashBot, el asistente virtual de Ignacio Sánchez Yuste. ¿En qué puedo ayudarte hoy? ",
          ],
          i18n: {
            en: {
              title: "NashBot",
              subtitle: "Cuando Ignacio no está disponible, yo puedo ayudarte.😁",
              footer: "",
              getStarted: "Nueva Conversación",
              inputPlaceholder: "Escribe tu pregunta..",
            },
          },
          avatar: "/img/ChatGPT Image 6 nov 2025, 17_42_35.png",
          enableStreaming: true,
        });
      } catch (error) {
        console.error("Error cargando el chat de n8n:", error);
      }
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(loadChat, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(loadChat, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
}
