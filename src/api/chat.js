import axios from "axios";

const RAG_API_URL = "http://localhost:8000";

/**
 * Send a chat message to the Ralitee AI RAG backend.
 * @param {string} message - User's message
 * @param {string} sessionId - Chat session ID
 * @param {string|null} userId - Optional user ID for order lookups
 * @returns {Promise<{reply, model_used, query_type, sources, session_id}>}
 */
export const sendChatMessage = async (message, sessionId, userId = null) => {
  const response = await axios.post(`${RAG_API_URL}/api/chat`, {
    message,
    session_id: sessionId,
    user_id: userId,
  });
  return response.data;
};

/**
 * Check if the RAG backend is healthy.
 */
export const checkRagHealth = async () => {
  try {
    const response = await axios.get(`${RAG_API_URL}/api/health`);
    return response.data;
  } catch {
    return null;
  }
};
