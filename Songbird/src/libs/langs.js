const langs = {
  en: {
    menu: {
      main: 'Main',
      quiz: 'Quiz',
      gallery: 'Gallery',
    },
    welcome: {
      header: 'Songbird Quiz',
      text: 'Guess which bird is ',
      textColor: 'yelling',
      welcomeButton: 'Start',
    },
    result: {
      headerWin: 'You win',
      headerLoss: 'Try again',
      resultScore: 'Score: ',
      resultButton: 'Restart',
    },
    quiz: {
      suborders: ['Warm Up', 'Sparrows', 'Forests', 'Songbirds', 'Carnivore', 'Seabird'],
      // defaultQuestion: '***',
      defaultMessage: 'Listen to the audio and select a bird',
      quizScore: 'Score: ',
      quizButton: 'Next',
    },
    gallery: {
      galleryHeader: 'Gallery',
      galleryMessageStart: 'Here they are, ',
      galleryMessageEnd: ', look at them',
      galleryTextColor: 'yellers',
    },
  },
  ru: {
    menu: {
      main: 'Главная',
      quiz: 'Игра',
      gallery: 'Галерея',
    },
    welcome: {
      header: 'Викторина Songbird',
      text: 'Угадай, кто из птиц ',
      textColor: 'орет',
      welcomeButton: 'Начать',
    },
    result: {
      headerWin: 'Победа',
      headerLoss: 'Попробуй еще',
      resultScore: 'Очки: ',
      resultButton: 'Заново',
    },
    quiz: {
      suborders: ['Разминка', 'Воробиные', 'Лесные', 'Певчие', 'Хищные', 'Морские'],
      // defaultQuestion: '***',
      defaultMessage: 'Прослушайте аудио и выберите птицу',
      quizScore: 'Очки: ',
      quizButton: 'Далее',
    },
    gallery: {
      galleryHeader: 'Галерея',
      galleryMessageStart: 'Вот они, ',
      galleryMessageEnd: ', посмотри на них',
      galleryTextColor: 'крикуны',
    },
  },
};

export default langs;
