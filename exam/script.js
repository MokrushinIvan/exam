// Данные тестов (обновленная структура с уровнями сложности)
// Каждая категория теперь имеет levels: easy, medium, hard
// Для существующих вопросов использованы как base для easy, добавлены новые для medium и hard
const quizzes = {
    math: {
        title: "Математика",
        levels: {
            easy: {
                title: "Математика · Лёгкий",
                questions: [
                    { question: "Что такое 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
                    { question: "Сколько сторон у треугольника?", options: ["3", "4", "5", "6"], correct: "3" },
                    { question: "Что такое корень из 16?", options: ["2", "3", "4", "5"], correct: "4" },
                    { question: "Что такое 5 × 8?", options: ["30", "35", "40", "45"], correct: "40" },
                    { question: "Сколько градусов в прямом угле?", options: ["45", "90", "180", "360"], correct: "90" }
                ]
            },
            medium: {
                title: "Математика · Средний",
                questions: [
                    { question: "Корень квадратный из 144?", options: ["10", "11", "12", "13"], correct: "12" },
                    { question: "25 × 4 = ?", options: ["75", "100", "125", "150"], correct: "100" },
                    { question: "Чему равно 10! (факториал)?", options: ["362880", "3628800", "36288", "362800"], correct: "3628800" },
                    { question: "Решите: 2x + 5 = 17", options: ["4", "5", "6", "7"], correct: "6" },
                    { question: "Площадь круга с радиусом 3 (π≈3.14)?", options: ["28.26", "18.84", "9.42", "37.68"], correct: "28.26" }
                ]
            },
            hard: {
                title: "Математика · Сложный",
                questions: [
                    { question: "Чему равно 17²?", options: ["269", "289", "309", "329"], correct: "289" },
                    { question: "Решите: 3x² - 12x + 9 = 0", options: ["x=1,3", "x=1,1", "x=3,3", "x=2,2"], correct: "x=1,3" },
                    { question: "Синус 90°?", options: ["0", "1", "0.5", "-1"], correct: "1" },
                    { question: "Логарифм 100 по основанию 10?", options: ["1", "2", "10", "100"], correct: "2" },
                    { question: "Производная f(x)=x³?", options: ["3x²", "x²", "3x", "x⁴/4"], correct: "3x²" }
                ]
            }
        }
    },
    geography: {
        title: "География",
        levels: {
            easy: {
                title: "География · Лёгкий",
                questions: [
                    { question: "Какая река самая длинная в мире?", options: ["Амазонка", "Нил", "Янцзы", "Миссисипи"], correct: "Нил" },
                    { question: "В какой стране находится город Рио-де-Жанейро?", options: ["Аргентина", "Бразилия", "Перу", "Чили"], correct: "Бразилия" },
                    { question: "Какой континент самый большой по площади?", options: ["Африка", "Азия", "Северная Америка", "Австралия"], correct: "Азия" },
                    { question: "Столица Австралии?", options: ["Сидней", "Мельбурн", "Канберра", "Перт"], correct: "Канберра" },
                    { question: "Какое море самое солёное в мире?", options: ["Мёртвое море", "Красное море", "Средиземное море", "Каспийское море"], correct: "Мёртвое море" }
                ]
            },
            medium: {
                title: "География · Средний",
                questions: [
                    { question: "Какой океан самый большой?", options: ["Атлантический", "Тихий", "Индийский", "Северный Ледовитый"], correct: "Тихий" },
                    { question: "Столица Канады?", options: ["Торонто", "Оттава", "Ванкувер", "Монреаль"], correct: "Оттава" },
                    { question: "Какой город расположен на двух континентах?", options: ["Стамбул", "Москва", "Париж", "Нью-Йорк"], correct: "Стамбул" },
                    { question: "Самая высокая гора в мире?", options: ["Килиманджаро", "Эверест", "Монблан", "Аконкагуа"], correct: "Эверест" },
                    { question: "Какой пролив разделяет Европу и Азию?", options: ["Берингов", "Босфор", "Гибралтар", "Магелланов"], correct: "Босфор" }
                ]
            },
            hard: {
                title: "География · Сложный",
                questions: [
                    { question: "Какова площадь России (примерно)?", options: ["17 млн км²", "10 млн км²", "20 млн км²", "15 млн км²"], correct: "17 млн км²" },
                    { question: "Какой город является столицей Боливии?", options: ["Ла-Пас", "Сукре", "Санта-Крус", "Кочабамба"], correct: "Сукре" },
                    { question: "Самая глубокая точка океана?", options: ["Марианская впадина", "Пуэрто-Рико", "Тонга", "Кермадек"], correct: "Марианская впадина" },
                    { question: "Какой рекой питается Аральское море?", options: ["Амударья", "Волга", "Днепр", "Дунай"], correct: "Амударья" },
                    { question: "Столица государства Науру?", options: ["Ярен", "Нет официальной", "Менака", "Аиво"], correct: "Нет официальной" }
                ]
            }
        }
    },
    history: {
        title: "История",
        levels: {
            easy: {
                title: "История · Лёгкий",
                questions: [
                    { question: "В каком году началась Вторая мировая война?", options: ["1937", "1939", "1941", "1945"], correct: "1939" },
                    { question: "Кто был первым президентом США?", options: ["Томас Джефферсон", "Авраам Линкольн", "Джордж Вашингтон", "Бенджамин Франклин"], correct: "Джордж Вашингтон" },
                    { question: "Какой древний город был разрушен вулканом Везувий?", options: ["Рим", "Афины", "Помпеи", "Карфаген"], correct: "Помпеи" },
                    { question: "В каком веке произошло Крещение Руси?", options: ["VIII", "IX", "X", "XI"], correct: "X" },
                    { question: "Кто открыл Америку в 1492 году?", options: ["Васко да Гама", "Христофор Колумб", "Фернан Магеллан", "Джеймс Кук"], correct: "Христофор Колумб" }
                ]
            },
            medium: {
                title: "История · Средний",
                questions: [
                    { question: "Когда была подписана Великая хартия вольностей?", options: ["1066", "1215", "1492", "1776"], correct: "1215" },
                    { question: "Кто был императором Рима во время пожара 64 г. н.э.?", options: ["Нерон", "Цезарь", "Август", "Калигула"], correct: "Нерон" },
                    { question: "В каком году произошла Октябрьская революция?", options: ["1905", "1917", "1922", "1941"], correct: "1917" },
                    { question: "Кто изобрел печатный станок?", options: ["Гутенберг", "Эдисон", "Да Винчи", "Ньютон"], correct: "Гутенберг" },
                    { question: "Когда закончилась Первая мировая война?", options: ["1914", "1918", "1939", "1945"], correct: "1918" }
                ]
            },
            hard: {
                title: "История · Сложный",
                questions: [
                    { question: "Кто был последним императором Российской империи?", options: ["Пётр I", "Николай II", "Александр III", "Иван Грозный"], correct: "Николай II" },
                    { question: "В каком году произошла битва при Ватерлоо?", options: ["1812", "1815", "1805", "1799"], correct: "1815" },
                    { question: "Кто основал династию Тюдоров?", options: ["Генрих VII", "Генрих VIII", "Елизавета I", "Мария I"], correct: "Генрих VII" },
                    { question: "Когда была принята Декларация независимости США?", options: ["1776", "1789", "1812", "1865"], correct: "1776" },
                    { question: "Кто был фараоном во время Исхода евреев?", options: ["Рамсес II", "Тутанхамон", "Хеопс", "Аменхотеп IV"], correct: "Рамсес II" }
                ]
            }
        }
    },
    biology: {
        title: "Биология",
        levels: {
            easy: {
                title: "Биология · Лёгкий",
                questions: [
                    { question: "Какой орган потребляет больше всего кислорода в покое?", options: ["Сердце", "Печень", "Мозг", "Почки"], correct: "Мозг" },
                    { question: "Сколько хромосом у человека в норме?", options: ["23", "46", "44", "48"], correct: "46" },
                    { question: "Как называется превращение гусеницы в бабочку?", options: ["Метаморфоз", "Мутация", "Митоз", "Мейоз"], correct: "Метаморфоз" },
                    { question: "Какой газ выделяют растения при фотосинтезе?", options: ["Углекислый газ", "Кислород", "Азот", "Водород"], correct: "Кислород" },
                    { question: "Самый большой орган человеческого тела?", options: ["Печень", "Кожа", "Кишечник", "Лёгкие"], correct: "Кожа" }
                ]
            },
            medium: {
                title: "Биология · Средний",
                questions: [
                    { question: "Что такое ДНК?", options: ["Дезоксирибонуклеиновая кислота", "Рибонуклеиновая кислота", "Белок", "Углевод"], correct: "Дезоксирибонуклеиновая кислота" },
                    { question: "Какой процесс отвечает за деление клеток?", options: ["Митоз", "Фотосинтез", "Дыхание", "Транспирация"], correct: "Митоз" },
                    { question: "Какое животное является млекопитающим?", options: ["Крокодил", "Кит", "Акула", "Черепаха"], correct: "Кит" },
                    { question: "Что такое экосистема?", options: ["Сообщество организмов и их среды", "Только растения", "Только животные", "Почва"], correct: "Сообщество организмов и их среды" },
                    { question: "Какой витамин синтезируется на солнце?", options: ["A", "B", "C", "D"], correct: "D" }
                ]
            },
            hard: {
                title: "Биология · Сложный",
                questions: [
                    { question: "Что такое CRISPR?", options: ["Генетическая редактирующая система", "Вирус", "Бактерия", "Гормон"], correct: "Генетическая редактирующая система" },
                    { question: "Какой процесс происходит в митохондриях?", options: ["Клеточное дыхание", "Фотосинтез", "Транскрипция", "Трансляция"], correct: "Клеточное дыхание" },
                    { question: "Что такое гомологичные хромосомы?", options: ["Пары хромосом", "Разные хромосомы", "Мутации", "Гены"], correct: "Пары хромосом" },
                    { question: "Какой фермент расщепляет крахмал?", options: ["Амилаза", "Липаза", "Пепсин", "Трипсин"], correct: "Амилаза" },
                    { question: "Что такое симбиоз?", options: ["Взаимовыгодное сожительство", "Паразитизм", "Хищничество", "Конкуренция"], correct: "Взаимовыгодное сожительство" }
                ]
            }
        }
    },
    movies: {
        title: "Кино",
        levels: {
            easy: {
                title: "Кино · Лёгкий",
                questions: [
                    { question: "Кто сыграл Железного человека в MCU?", options: ["Крис Эванс", "Роберт Дауни мл.", "Крис Хемсворт", "Марк Руффало"], correct: "Роберт Дауни мл." },
                    { question: "В каком фильме фраза «Я — король мира!»?", options: ["Гладиатор", "Титаник", "Пираты...", "Начало"], correct: "Титаник" },
                    { question: "Режиссёр фильма «Оппенгеймер» (2023)?", options: ["Нолан", "Тарантино", "Вильнёв", "Дель Торо"], correct: "Нолан" },
                    { question: "Как звали динозавра в «Истории игрушек»?", options: ["Рекс", "Базз", "Вуди", "Хэм"], correct: "Рекс" },
                    { question: "Фраза «Я вернусь» из какого фильма?", options: ["Робокоп", "Терминатор", "Рэмбо", "Крепкий орешек"], correct: "Терминатор" }
                ]
            },
            medium: {
                title: "Кино · Средний",
                questions: [
                    { question: "Кто режиссёр «Интерстеллар»?", options: ["Спилберг", "Нолан", "Камерон", "Скорсезе"], correct: "Нолан" },
                    { question: "В каком фильме снимался Брэд Питт как Ахилл?", options: ["Троя", "Бесславные ублюдки", "Семь", "Бойцовский клуб"], correct: "Троя" },
                    { question: "Какой фильм выиграл Оскар за лучший фильм в 1994?", options: ["Форрест Гамп", "Пульп Фикшн", "Шоушенк", "Титаник"], correct: "Форрест Гамп" },
                    { question: "Кто сыграл Джокера в «Тёмном рыцаре»?", options: ["Джек Николсон", "Хит Леджер", "Хоакин Феникс", "Джаред Лето"], correct: "Хит Леджер" },
                    { question: "Фильм с фразой «Хьюстон, у нас проблема»?", options: ["Аполлон 13", "Интерстеллар", "Гравитация", "Марсианин"], correct: "Аполлон 13" }
                ]
            },
            hard: {
                title: "Кино · Сложный",
                questions: [
                    { question: "Кто режиссёр «2001: Космическая одиссея»?", options: ["Кубрик", "Хичкок", "Феллини", "Тарковский"], correct: "Кубрик" },
                    { question: "В каком году вышел «Гражданин Кейн»?", options: ["1939", "1941", "1945", "1950"], correct: "1941" },
                    { question: "Кто сыграл главную роль в «Таксист»?", options: ["Де Ниро", "Пачино", "Хопкинс", "Брандо"], correct: "Де Ниро" },
                    { question: "Какой фильм имеет больше всего Оскаров?", options: ["Титаник", "Бен-Гур", "Властелин колец: Возвращение короля", "Все выше"], correct: "Все выше" },
                    { question: "Режиссёр «Семь самураев»?", options: ["Куросава", "Мидзогути", "Озу", "Инариту"], correct: "Куросава" }
                ]
            }
        }
    },
    animals: {
        title: "Животные",
        levels: {
            easy: {
                title: "Животные · Лёгкий",
                questions: [
                    { question: "Какое животное спит стоя?", options: ["Слон", "Лошадь", "Жираф", "Все перечисленные"], correct: "Все перечисленные" },
                    { question: "Самое быстрое животное на суше?", options: ["Гепард", "Лев", "Антилопа", "Страус"], correct: "Гепард" },
                    { question: "Детёныш кенгуру называется...", options: ["Джоуи", "Китти", "Бэби", "Кенгурёнок"], correct: "Джоуи" },
                    { question: "Какое животное поворачивает голову на 360°?", options: ["Сова", "Попугай", "Ящерица", "Кошка"], correct: "Сова" },
                    { question: "Самое большое животное в мире?", options: ["Слон", "Синий кит", "Жираф", "Белый медведь"], correct: "Синий кит" }
                ]
            },
            medium: {
                title: "Животные · Средний",
                questions: [
                    { question: "Какое животное имеет самый длинный язык относительно тела?", options: ["Хамелеон", "Жираф", "Муравьед", "Змея"], correct: "Хамелеон" },
                    { question: "Сколько сердец у осьминога?", options: ["1", "2", "3", "4"], correct: "3" },
                    { question: "Какое млекопитающее может летать?", options: ["Птица", "Летучая мышь", "Бабочка", "Пчела"], correct: "Летучая мышь" },
                    { question: "Самое умное животное после человека?", options: ["Шимпанзе", "Собака", "Кошка", "Слон"], correct: "Шимпанзе" },
                    { question: "Какое животное не пьёт воду?", options: ["Верблюд", "Кенгуру", "Коала", "Крот"], correct: "Коала" }
                ]
            },
            hard: {
                title: "Животные · Сложный",
                questions: [
                    { question: "Какое животное имеет голубую кровь?", options: ["Осьминог", "Человек", "Собака", "Кошка"], correct: "Осьминог" },
                    { question: "Сколько видов пингвинов существует?", options: ["10", "18", "25", "30"], correct: "18" },
                    { question: "Какое животное может регенерировать потерянные конечности?", options: ["Ящерица", "Собака", "Кошка", "Птица"], correct: "Ящерица" },
                    { question: "Самое ядовитое животное в мире?", options: ["Змея", "Паук", "Медуза", "Скорпион"], correct: "Медуза" },
                    { question: "Какое животное спит всего 2 часа в сутки?", options: ["Жираф", "Слон", "Лошадь", "Кошка"], correct: "Жираф" }
                ]
            }
        }
    },
    physics: {
        title: "Физика",
        levels: {
            easy: {
                title: "Физика · Лёгкий",
                questions: [
                    { question: "Что такое скорость света в вакууме?", options: ["300 000 км/с", "150 000 км/с", "500 000 км/с", "1 000 000 км/с"], correct: "300 000 км/с" },
                    { question: "Какой закон описывает F = ma?", options: ["Первый закон Ньютона", "Второй закон Ньютона", "Третий закон Ньютона", "Закон Ома"], correct: "Второй закон Ньютона" },
                    { question: "Что такое гравитация?", options: ["Сила притяжения", "Сила отталкивания", "Электрическая сила", "Магнитная сила"], correct: "Сила притяжения" },
                    { question: "Какой элемент является самым лёгким?", options: ["Водород", "Гелий", "Кислород", "Углерод"], correct: "Водород" },
                    { question: "Что такое температура кипения воды?", options: ["0°C", "100°C", "50°C", "200°C"], correct: "100°C" }
                ]
            },
            medium: {
                title: "Физика · Средний",
                questions: [
                    { question: "Что такое квантовая механика?", options: ["Изучение частиц", "Изучение макромира", "Изучение космоса", "Изучение химии"], correct: "Изучение частиц" },
                    { question: "Какой закон сохранения энергии?", options: ["Энергия не создаётся и не уничтожается", "Энергия уничтожается", "Энергия создаётся", "Энергия не сохраняется"], correct: "Энергия не создаётся и не уничтожается" },
                    { question: "Что такое релятивистская скорость?", options: ["Скорость близкая к свету", "Малая скорость", "Средняя скорость", "Нулевая скорость"], correct: "Скорость близкая к свету" },
                    { question: "Какой эффект Доплера?", options: ["Изменение частоты", "Изменение амплитуды", "Изменение фазы", "Изменение периода"], correct: "Изменение частоты" },
                    { question: "Что такое ядерная реакция?", options: ["Расщепление или слияние ядер", "Химическая реакция", "Биологическая реакция", "Электрическая реакция"], correct: "Расщепление или слияние ядер" }
                ]
            },
            hard: {
                title: "Физика · Сложный",
                questions: [
                    { question: "Что такое теория струн?", options: ["Теория фундаментальных струн", "Теория частиц", "Теория волн", "Теория полей"], correct: "Теория фундаментальных струн" },
                    { question: "Какова формула Эйнштейна?", options: ["E=mc²", "F=ma", "V=IR", "P=IV"], correct: "E=mc²" },
                    { question: "Что такое чёрная дыра?", options: ["Объект с сильной гравитацией", "Планета", "Звезда", "Галактика"], correct: "Объект с сильной гравитацией" },
                    { question: "Какой принцип неопределённости Гейзенберга?", options: ["Нельзя точно знать позицию и импульс", "Можно точно знать всё", "Только позицию", "Только импульс"], correct: "Нельзя точно знать позицию и импульс" },
                    { question: "Что такое сверхпроводимость?", options: ["Нулевое сопротивление", "Высокое сопротивление", "Среднее сопротивление", "Отрицательное сопротивление"], correct: "Нулевое сопротивление" }
                ]
            }
        }
    },
    literature: {
        title: "Литература",
        levels: {
            easy: {
                title: "Литература · Лёгкий",
                questions: [
                    { question: "Кто написал «Войну и мир»?", options: ["Толстой", "Достоевский", "Пушкин", "Чехов"], correct: "Толстой" },
                    { question: "Какой герой Шекспира сказал «Быть или не быть»?", options: ["Ромео", "Гамлет", "Отелло", "Макбет"], correct: "Гамлет" },
                    { question: "Кто автор «Гарри Поттера»?", options: ["Роулинг", "Толкин", "Льюис", "Мартин"], correct: "Роулинг" },
                    { question: "Что такое эпос?", options: ["Большое повествование", "Короткий рассказ", "Стихотворение", "Драма"], correct: "Большое повествование" },
                    { question: "Кто написал «Преступление и наказание»?", options: ["Достоевский", "Толстой", "Гоголь", "Тургенев"], correct: "Достоевский" }
                ]
            },
            medium: {
                title: "Литература · Средний",
                questions: [
                    { question: "Кто автор «1984»?", options: ["Оруэлл", "Хаксли", "Брэдбери", "Камю"], correct: "Оруэлл" },
                    { question: "Что такое сонет?", options: ["Форма стихотворения", "Роман", "Повесть", "Драма"], correct: "Форма стихотворения" },
                    { question: "Кто написал «Властелин колец»?", options: ["Толкин", "Льюис", "Роулинг", "Мартин"], correct: "Толкин" },
                    { question: "Какой жанр «Фауста» Гёте?", options: ["Трагедия", "Комедия", "Роман", "Поэма"], correct: "Трагедия" },
                    { question: "Кто автор «Алисы в Зазеркалье»?", options: ["Кэрролл", "Баум", "Милн", "Андерсен"], correct: "Кэрролл" }
                ]
            },
            hard: {
                title: "Литература · Сложный",
                questions: [
                    { question: "Кто написал «Улисс»?", options: ["Джойс", "Пруст", "Кафка", "Вулф"], correct: "Джойс" },
                    { question: "Что такое модернизм?", options: ["Литературное течение 20 века", "Классицизм", "Романтизм", "Реализм"], correct: "Литературное течение 20 века" },
                    { question: "Кто автор «Процесса»?", options: ["Кафка", "Камю", "Сартр", "Ницше"], correct: "Кафка" },
                    { question: "Какой роман начинается «Все счастливые семьи похожи друг на друга»?", options: ["Анна Каренина", "Война и мир", "Идиот", "Братья Карамазовы"], correct: "Анна Каренина" },
                    { question: "Кто написал «Сто лет одиночества»?", options: ["Маркес", "Борхес", "Неруда", "Кортасар"], correct: "Маркес" }
                ]
            }
        }
    },
    programming: {
        title: "Программирование",
        levels: {
            easy: {
                title: "Программирование · Лёгкий",
                questions: [
                    { question: "Что такое переменная?", options: ["Хранение данных", "Функция", "Цикл", "Условие"], correct: "Хранение данных" },
                    { question: "Какой язык для веб-разработки?", options: ["HTML", "Python", "Java", "C++"], correct: "HTML" },
                    { question: "Что такое цикл?", options: ["Повторение кода", "Условие", "Функция", "Класс"], correct: "Повторение кода" },
                    { question: "Что такое функция?", options: ["Блок кода", "Переменная", "Массив", "Объект"], correct: "Блок кода" },
                    { question: "Какой оператор для равенства?", options: ["==", "=", "===", "!="], correct: "==" }
                ]
            },
            medium: {
                title: "Программирование · Средний",
                questions: [
                    { question: "Что такое рекурсия?", options: ["Функция вызывает себя", "Цикл", "Условие", "Массив"], correct: "Функция вызывает себя" },
                    { question: "Что такое ООП?", options: ["Объектно-ориентированное программирование", "Процедурное", "Функциональное", "Логическое"], correct: "Объектно-ориентированное программирование" },
                    { question: "Что такое API?", options: ["Интерфейс программирования приложений", "База данных", "Сервер", "Клиент"], correct: "Интерфейс программирования приложений" },
                    { question: "Какой фреймворк для JS?", options: ["React", "Django", "Spring", "Laravel"], correct: "React" },
                    { question: "Что такое Git?", options: ["Система контроля версий", "Язык", "IDE", "Компилятор"], correct: "Система контроля версий" }
                ]
            },
            hard: {
                title: "Программирование · Сложный",
                questions: [
                    { question: "Что такое Big O нотация?", options: ["Сложность алгоритма", "Тип данных", "Функция", "Класс"], correct: "Сложность алгоритма" },
                    { question: "Что такое блокчейн?", options: ["Распределённая база данных", "Централизованная", "Файл", "Сервер"], correct: "Распределённая база данных" },
                    { question: "Что такое машинное обучение?", options: ["Алгоритмы учатся на данных", "Ручное программирование", "База данных", "Сеть"], correct: "Алгоритмы учатся на данных" },
                    { question: "Что такое concurrency?", options: ["Параллельное выполнение", "Последовательное", "Рекурсия", "Итерация"], correct: "Параллельное выполнение" },
                    { question: "Что такое Docker?", options: ["Контейнеризация", "Виртуальная машина", "Компилятор", "IDE"], correct: "Контейнеризация" }
                ]
            }
        }
    },
    space: {
        title: "Космос",
        levels: {
            easy: {
                title: "Космос · Лёгкий",
                questions: [
                    { question: "Какой планета ближайшая к Солнцу?", options: ["Меркурий", "Венера", "Земля", "Марс"], correct: "Меркурий" },
                    { question: "Сколько планет в Солнечной системе?", options: ["7", "8", "9", "10"], correct: "8" },
                    { question: "Что такое комета?", options: ["Ледяной объект", "Планета", "Звезда", "Спутник"], correct: "Ледяной объект" },
                    { question: "Какой спутник Земли?", options: ["Луна", "Фобос", "Европа", "Титан"], correct: "Луна" },
                    { question: "Что такое галактика?", options: ["Скопление звёзд", "Планета", "Комета", "Астероид"], correct: "Скопление звёзд" }
                ]
            },
            medium: {
                title: "Космос · Средний",
                questions: [
                    { question: "Что такое чёрная дыра?", options: ["Объект с сильной гравитацией", "Звезда", "Планета", "Галактика"], correct: "Объект с сильной гравитацией" },
                    { question: "Какова температура на поверхности Солнца?", options: ["5500°C", "1000°C", "10000°C", "100°C"], correct: "5500°C" },
                    { question: "Что такое экзопланета?", options: ["Планета вне Солнечной системы", "Внутри", "Спутник", "Астероид"], correct: "Планета вне Солнечной системы" },
                    { question: "Кто первый космонавт?", options: ["Гагарин", "Армстронг", "Терешкова", "Леонов"], correct: "Гагарин" },
                    { question: "Что такое Большой Взрыв?", options: ["Начало Вселенной", "Конец", "Звезда", "Планета"], correct: "Начало Вселенной" }
                ]
            },
            hard: {
                title: "Космос · Сложный",
                questions: [
                    { question: "Что такое горизонт событий?", options: ["Граница чёрной дыры", "Орбита", "Атмосфера", "Поверхность"], correct: "Граница чёрной дыры" },
                    { question: "Какова скорость света?", options: ["299 792 км/с", "300 000 км/с", "150 000 км/с", "1 млн км/с"], correct: "299 792 км/с" },
                    { question: "Кто предложил теорию Большого Взрыва?", options: ["Леметр", "Хаббл", "Эйнштейн", "Хокинг"], correct: "Леметр" },
                    { question: "Что такое пульсар?", options: ["Вращающаяся нейтронная звезда", "Чёрная дыра", "Сверхновая", "Квазар"], correct: "Вращающаяся нейтронная звезда" },
                    { question: "Расстояние до ближайшей звезды (Проксима Центавра)?", options: ["4.24 световых года", "1 световой год", "10 световых лет", "2 световых года"], correct: "4.24 световых года" }
                ]
            }
        }
    },
    technology: {
        title: "Технологии",
        levels: {
            easy: {
                title: "Технологии · Лёгкий",
                questions: [
                    { question: "В каком году был выпущен первый iPhone?", options: ["2005", "2007", "2009", "2011"], correct: "2007" },
                    { question: "Что означает аббревиатура AI в контексте современных технологий?", options: ["Automated Interface", "Artificial Intelligence", "Advanced Internet", "Augmented Interaction"], correct: "Artificial Intelligence" },
                    { question: "Как называется первая широко распространённая версия операционной системы Android?", options: ["Cupcake", "Donut", "Éclair", "Froyo"], correct: "Cupcake" },
                    { question: "Какой протокол чаще всего используется для передачи веб-страниц?", options: ["FTP", "HTTP/HTTPS", "SMTP", "POP3"], correct: "HTTP/HTTPS" },
                    { question: "Что означает сокращение NFT?", options: ["New Future Technology", "Non-Fungible Token", "Network File Transfer", "Next Frame Transition"], correct: "Non-Fungible Token" }
                ]
            },
            medium: {
                title: "Технологии · Средний",
                questions: [
                    { question: "Что такое облачные вычисления?", options: ["Хранение данных в интернете", "Локальный сервер", "Флешка", "Жёсткий диск"], correct: "Хранение данных в интернете" },
                    { question: "Кто основал Microsoft?", options: ["Гейтс и Аллен", "Джобс и Возняк", "Цукерберг", "Брин и Пейдж"], correct: "Гейтс и Аллен" },
                    { question: "Что такое VR?", options: ["Виртуальная реальность", "Видео редактор", "Вирус", "Веб-браузер"], correct: "Виртуальная реальность" },
                    { question: "Какой язык программирования для веб-разработки?", options: ["JavaScript", "C++", "Python", "Java"], correct: "JavaScript" },
                    { question: "Что такое IoT?", options: ["Интернет вещей", "Интернет торговля", "Интернет обучение", "Интернет общение"], correct: "Интернет вещей" }
                ]
            },
            hard: {
                title: "Технологии · Сложный",
                questions: [
                    { question: "Что такое квантовая криптография?", options: ["Защита данных квантами", "Шифрование", "Хэширование", "Компрессия"], correct: "Защита данных квантами" },
                    { question: "Кто изобрёл World Wide Web?", options: ["Бернерс-Ли", "Гейтс", "Джобс", "Тьюринг"], correct: "Бернерс-Ли" },
                    { question: "Что такое машинное обучение?", options: ["Алгоритмы, обучающиеся на данных", "Ручное программирование", "База данных", "Сеть"], correct: "Алгоритмы, обучающиеся на данных" },
                    { question: "Какой процессор в первом компьютере?", options: ["ENIAC", "UNIVAC", "Colossus", "Z3"], correct: "ENIAC" },
                    { question: "Что такое 5G?", options: ["Пятое поколение мобильной связи", "Четвёртое", "Шестое", "Третье"], correct: "Пятое поколение мобильной связи" }
                ]
            }
        }
    },
    music: {
        title: "Музыка",
        levels: {
            easy: {
                title: "Музыка · Лёгкий",
                questions: [
                    { question: "Кто написал музыку к балету «Лебединое озеро»?", options: ["Чайковский", "Моцарт", "Бетховен", "Вагнер"], correct: "Чайковский" },
                    { question: "Какой музыкальный инструмент считается королём инструментов?", options: ["Скрипка", "Орган", "Фортепиано", "Гитара"], correct: "Орган" },
                    { question: "В каком году произошёл легендарный концерт «Live Aid»?", options: ["1983", "1985", "1987", "1989"], correct: "1985" },
                    { question: "Как называется самая продаваемая музыкальная группа всех времён?", options: ["Queen", "The Beatles", "Led Zeppelin", "Pink Floyd"], correct: "The Beatles" },
                    { question: "Кто исполнил песню «Bohemian Rhapsody»?", options: ["The Rolling Stones", "Queen", "Aerosmith", "Nirvana"], correct: "Queen" }
                ]
            },
            medium: {
                title: "Музыка · Средний",
                questions: [
                    { question: "Кто автор «Лунной сонаты»?", options: ["Бетховен", "Моцарт", "Бах", "Шопен"], correct: "Бетховен" },
                    { question: "Какой жанр музыки ассоциируется с Элвисом Пресли?", options: ["Рок-н-ролл", "Джаз", "Классика", "Хип-хоп"], correct: "Рок-н-ролл" },
                    { question: "Кто основал группу The Rolling Stones?", options: ["Джаггер и Ричардс", "Леннон и Маккартни", "Плант и Пейдж", "Меркьюри и Мэй"], correct: "Джаггер и Ричардс" },
                    { question: "Что такое октава?", options: ["Интервал в 8 нот", "4 ноты", "12 нот", "2 ноты"], correct: "Интервал в 8 нот" },
                    { question: "Кто написал «Реквием»?", options: ["Моцарт", "Верди", "Берлиоз", "Брамс"], correct: "Моцарт" }
                ]
            },
            hard: {
                title: "Музыка · Сложный",
                questions: [
                    { question: "Кто изобрёл фуга?", options: ["Бах", "Вивальди", "Гендель", "Скарлатти"], correct: "Бах" },
                    { question: "В каком году вышел альбом «Thriller» Майкла Джексона?", options: ["1980", "1982", "1984", "1986"], correct: "1982" },
                    { question: "Что такое полифония?", options: ["Многоголосие", "Одноголосие", "Инструментал", "Вокал"], correct: "Многоголосие" },
                    { question: "Кто автор оперы «Кармен»?", options: ["Бизе", "Верди", "Пуччини", "Росссини"], correct: "Бизе" },
                    { question: "Какой инструмент в джазе ассоциируется с Майлзом Дэвисом?", options: ["Труба", "Саксофон", "Барабаны", "Бас"], correct: "Труба" }
                ]
            }
        }
    }
};

const TOTAL_TIME = 300;
let timeRemaining = TOTAL_TIME;
let timerId = null;
let score = 0;
let currentQuiz = null;
let currentLevel = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// Элементы DOM
const elements = {
    categoryScreen: document.getElementById('category-screen'),
    levelScreen: document.getElementById('level-screen'),
    levelTitle: document.getElementById('level-title'),
    backToCategoriesBtn: document.getElementById('back-to-categories'),
    quiz: document.getElementById('quiz'),
    quizTitle: document.getElementById('quiz-title'),
    questionContainer: document.getElementById('current-question'),
    timerDisplay: document.getElementById('timer'),
    progressBar: document.getElementById('progress'),
    progressText: document.getElementById('progress-text'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    submitBtn: document.getElementById('submit-btn'),
    finishEarlyBtn: document.getElementById('finish-early-btn'),
    resultScreen: document.getElementById('result'),
    scoreText: document.getElementById('score'),
    restartBtn: document.getElementById('restart-btn')
};

// События для категорий
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => showLevelSelection(btn.dataset.quiz));
});

// События для уровней
document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        startQuizWithLevel(btn.dataset.level);
    });
});

elements.backToCategoriesBtn.addEventListener('click', () => {
    elements.levelScreen.style.display = 'none';
    elements.categoryScreen.style.display = 'block';
});

elements.prevBtn.addEventListener('click', () => changeQuestion(-1));
elements.nextBtn.addEventListener('click', () => changeQuestion(1));

elements.submitBtn.addEventListener('click', finishQuiz);
elements.finishEarlyBtn.addEventListener('click', finishQuiz);
elements.restartBtn.addEventListener('click', restartToCategories);

// Функция для рандомизации массива (Fisher-Yates shuffle)
function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Показ выбора уровня
function showLevelSelection(quizKey) {
    currentQuiz = quizzes[quizKey];
    currentLevel = null;
    
    elements.categoryScreen.style.display = 'none';
    elements.levelScreen.style.display = 'block';
    elements.levelTitle.textContent = `${currentQuiz.title} · Выберите уровень`;
}

// Запуск теста с уровнем
function startQuizWithLevel(level) {
    currentLevel = level;
    
    // Копируем вопросы, чтобы не модифицировать оригинал
    let questionsCopy = [...currentQuiz.levels[level].questions];
    
    // Рандомизируем порядок вопросов
    shuffle(questionsCopy);
    
    // Для каждого вопроса рандомизируем порядок вариантов ответов
    questionsCopy.forEach(q => {
        shuffle(q.options);
    });
    
    currentQuestions = questionsCopy;
    
    if (!currentQuestions || currentQuestions.length === 0) {
        alert("В этом уровне пока нет вопросов!");
        return;
    }

    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    
    elements.levelScreen.style.display = 'none';
    elements.quiz.style.display = 'block';
    
    elements.quizTitle.textContent = currentQuiz.levels[level].title;
    
    startTimer();
    renderCurrentQuestion();
    updateProgress();
}

// Отрисовка текущего вопроса
function renderCurrentQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    
    let html = `
        <div class="question active">
            <h3>${currentQuestionIndex + 1}. ${q.question}</h3>
            <div class="options">
    `;

    q.options.forEach(option => {
        const isChecked = userAnswers[currentQuestionIndex] === option ? 'checked' : '';
        html += `
            <label>
                <input type="radio" 
                       name="q-${currentQuestionIndex}" 
                       value="${option}"
                       ${isChecked}>
                ${option}
            </label>
        `;
    });

    html += `</div></div>`;

    elements.questionContainer.innerHTML = html;

    // Сохраняем выбор
    document.querySelectorAll(`input[name="q-${currentQuestionIndex}"]`)
        .forEach(radio => {
            radio.addEventListener('change', (e) => {
                userAnswers[currentQuestionIndex] = e.target.value;
                updateProgress();
            });
        });

    // Кнопки навигации
    elements.prevBtn.disabled = currentQuestionIndex === 0;
    elements.nextBtn.disabled = currentQuestionIndex === currentQuestions.length - 1;
}

// Переключение вопроса
function changeQuestion(direction) {
    const newIndex = currentQuestionIndex + direction;
    
    if (newIndex >= 0 && newIndex < currentQuestions.length) {
        currentQuestionIndex = newIndex;
        renderCurrentQuestion();
        updateProgress();
    }
}

// Управление клавиатурой
document.addEventListener('keydown', (e) => {
    if (elements.quiz.style.display !== 'block') return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        changeQuestion(-1);
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        changeQuestion(1);
    }
});

// Таймер
function startTimer() {
    timeRemaining = TOTAL_TIME;
    elements.timerDisplay.textContent = `Оставшееся время: 5:00`;

    timerId = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        elements.timerDisplay.textContent = 
            `Оставшееся время: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeRemaining <= 0) {
            clearInterval(timerId);
            finishQuiz();
        }
    }, 1000);
}

// Прогресс
function updateProgress() {
    const total = currentQuestions.length;
    const current = currentQuestionIndex + 1;
    
    const answered = userAnswers.filter(a => a !== null).length;
    const percentage = (answered / total) * 100;
    
    elements.progressBar.style.width = `${percentage}%`;
    elements.progressText.textContent = `${current} / ${total}`;
}

// Завершение теста
function finishQuiz() {
    if (timerId) clearInterval(timerId);

    score = 0;
    currentQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });

    const timeUsed = TOTAL_TIME - timeRemaining;
    const minutesUsed = Math.floor(timeUsed / 60);
    const secondsUsed = timeUsed % 60;

    let message = `Уровень: ${currentQuiz.levels[currentLevel].title}\n`;
    message += `Вы набрали ${score} из ${currentQuestions.length} баллов!`;

    if (timeRemaining > 0 && timeUsed < TOTAL_TIME - 30) {
        message += `\n(досрочное завершение — ${minutesUsed} мин ${secondsUsed} сек)`;
    }

    elements.quiz.style.display = 'none';
    elements.resultScreen.style.display = 'block';
    elements.scoreText.textContent = message;
}

// Возврат к категориям
function restartToCategories() {
    if (timerId) clearInterval(timerId);
    
    timeRemaining = TOTAL_TIME;
    score = 0;
    currentQuiz = null;
    currentLevel = null;
    currentQuestions = [];
    currentQuestionIndex = 0;
    userAnswers = [];
    
    elements.progressBar.style.width = '0%';
    elements.questionContainer.innerHTML = '';
    
    elements.resultScreen.style.display = 'none';
    elements.quiz.style.display = 'none';
    elements.levelScreen.style.display = 'none';
    elements.categoryScreen.style.display = 'block';
}