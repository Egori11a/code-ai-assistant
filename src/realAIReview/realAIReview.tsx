export const getRealAIReview = async (code: string): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка сервера');
      }
  
      return (await response.json()).result;
    } catch (error) {
      console.error('Ошибка запроса:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Неизвестная ошибка при анализе кода'
      );
    }
  };