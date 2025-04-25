export interface MockReview {
    role: string;
    content: string;
    timestamp: number;
}

const CODE_REVIEW_EXAMPLES = [
    {
        pattern: /\.on\w+\s*=/g,
        message: "Устаревший способ подписки на события. Используйте addEventListener()."
    },
    {
        pattern: /if\s*$[^)]*\.includes$['"]@['"]$/g,
        message: "Слишком простая валидация email. Используйте регулярные выражения."
    },
    {
        pattern: /\bvar\s/g,
        message: "Устаревшее 'var'. Используйте 'const' или 'let'."
    },
    {
        pattern: /console\.log/g,
        message: "Отладочный console.log следует удалить в production."
    },
    {
        pattern: /\beval$/g,
        message: "Опасное использование eval()! Это уязвимость безопасности."
    },
];

export const getMockReview = async (code: string): Promise<{message: {role: string, content: string, timestamp: number}}> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    CODE_REVIEW_EXAMPLES.forEach(item => {
        item.pattern.lastIndex = 0;
    });

    const issues = CODE_REVIEW_EXAMPLES
        .filter(item => item.pattern.test(code))
        .map(item => `• ${item.message}`);

    const responseContent = issues.length > 0
        ? `Анализ кода выявил следующие проблемы:\n${issues.join('\n')}\n\nРекомендации:\n1. Исправьте выявленные проблемы.\n2. Проверьте изменения.` 
        : "Код выглядит хорошо! Не найдено явных проблем. Рекомендуется:\n• Добавить unit-тесты.\n• Проверить edge cases.";
    
    return {
        message: {
            role: "assistant",
            content: responseContent,
            timestamp: Date.now()
        }
    };
};