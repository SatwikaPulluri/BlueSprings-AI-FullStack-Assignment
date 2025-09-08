const Message = require('../models/messageModel');
const Session = require('../models/sessionModel');

exports.streamChat = async (req, res) => {
  const { sessionId, message, provider, model } = req.body;

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();

  // Save user message
  await Message.create({ sessionId, role: 'user', content: message, provider, model });

  const sendDelta = (delta) => {
    res.write(`data: ${JSON.stringify({ delta })}\n\n`);
  };

  try {
    // Simulate AI streaming
    const simulatedResponse = "Hello, this is the AI response streaming...";
    for (const ch of simulatedResponse) {
      sendDelta(ch);
      await new Promise(r => setTimeout(r, 50)); // simulate streaming
    }

    res.write(`data: ${JSON.stringify({ delta: '', done: true })}\n\n`);
    res.end();

    // Save AI message
    await Message.create({ sessionId, role: 'assistant', content: simulatedResponse, provider, model });

  } catch (err) {
    console.error(err);
    res.write(`data: ${JSON.stringify({ delta: 'Error: ' + err.message, done: true })}\n\n`);
    res.end();
  }
};

exports.createSession = async (req, res) => {
  const { title, provider, model } = req.body;
  const session = await Session.create({ title, provider, model });
  res.json(session);
};
