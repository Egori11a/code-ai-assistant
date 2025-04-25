require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

/* const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 1000
}); */

const openai = new OpenAI({
    baseURL: "https://api.mistral.ai/v1",
    apiKey: "MokjKhYm9WyYwTUFB2ev8RX2tHYWTrho"
});

app.post('/api/review', async (req, res) => {
    try {
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        const { code } = req.body;

        if (!code || typeof code !== 'string') {
            return res.status(400).json({
                error: 'Invalid request format',
                details: 'Expected { code: string } in request body'
            });
        }

        if (code.length > 10000) {
            return res.status(400).json({
                error: 'Code too long',
                details: 'Maximum 10000 characters allowed'
            });
        }

        console.log('Creating OpenAI completion with code length:', code.length);

        const completion = await openai.chat.completions.create({
            model: "mistral-tiny",
            messages: [
                {
                    role: "system",
                    content: `Ты — опытный инженер по код-ревью. Твоя задача:
                    1. Проанализировать код на:
                       - Ошибки и потенциальные баги
                       - Возможности оптимизации
                       - Проблемы безопасности
                       - Нарушения стиля кода
                    2. Формат ответа:
                       - Краткое резюме
                       - Исправленный код
                       - Конкретные рекомендации
                    3. Будь профессиональным, но понятным
                    4. Отвечай на русском языке
                    5. На форматирование кода не обращай внимание`
                },
                {
                    role: "user",
                    content: `Проведи детальный анализ кода:\n\`\`\`\n${code}\n\`\`\`\nДавай ответ на русском языке.`
                }
            ],
            temperature: 0.3,
            max_tokens: 1500
        });

        const result = completion.choices[0]?.message?.content;
        console.log('Successfully received response from OpenAI');

        res.json({ result });
    } catch (error) {
        console.error('Full server error:', error);

        res.status(500).json({
            error: 'Internal server error',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('OpenAI Key:', process.env.OPENAI_API_KEY ? '***' + process.env.OPENAI_API_KEY.slice(-4) : 'MISSING!');
});