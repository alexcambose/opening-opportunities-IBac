const SERVER = 'http://localhost:8000/';
export default {
    url: {
        SERVER,
        LOGIN: SERVER + 'login/',
        LOGOUT: SERVER + 'logout/',
        REGISTER: SERVER + 'register/',
        USER: SERVER + 'user/',
        USER_UPDATE: SERVER + 'user/update/',
        USER_UPDATE_PASSWORD: SERVER + 'user/update/password/',
        USER_MENTOR: SERVER + 'user/mentor/register/',
        USER_UPDATE_PROFILE: SERVER + 'user/update/profile/',
        USER_UPDATE_PROFILE_IMAGE: SERVER + 'user/update/profileImage/',
        POST_ALL: 'user/post/', // get
        POST_ADD: 'user/post/', // post
        ACHIEVEMENTS: SERVER + 'achievement/',
        NOTIFICATION: SERVER + 'notification/',
        NOTIFICATION_TOGGLE_READ: SERVER + 'notification/toggle/',
        NOTIFICATION_TOGGLE_READ_ALL: SERVER + 'notification/toggleReadAll/',
        COURSE: SERVER + 'course/slug/',
        COURSE_FIND: SERVER + 'course/find/',
        COURSE_TAGS: SERVER + 'course/tag/',
        COURSE_ALL: SERVER + 'course/all/',
        COURSE_ADD: SERVER + 'course/add/',
        COURSE_BEST_SLUG: SERVER + 'course/slug/best/',
        COURSE_USER_JOIN: SERVER + 'course/user/join/',
        COURSE_UPDATE_NOTE: SERVER + 'course/user/note/update/',
        COURSE_ADD_NOTE: SERVER + 'course/user/note/add/',
        COURSE_DELETE_NOTE: SERVER + 'course/user/note/delete/',
        COURSE_LESSON_WATCHED: SERVER + 'course/user/lesson/watched/',
        LESSON_ALL: SERVER + 'lesson/all/',
        PLAYLISTS: SERVER + 'playlist/',
        PLAYLIST_CREATE: SERVER + 'playlist/create/',
        PLAYLIST_DELETE: SERVER + 'playlist/delete/',
        PLAYLIST_EDIT: SERVER + 'playlist/update/',
        PLAYLIST_ADD_COURSE: (playlistId, courseId) => SERVER + `playlist/${playlistId}/addCourse/${courseId}`,
        PLAYLIST_DELETE_COURSE: (playlistId, courseId) => SERVER + `playlist/${playlistId}/addCourse/${courseId}`,
    },
    notifications: {
        PASSWORD_CHANGED: {
            title: 'Parola schimbată',
            message: ({ f_created_at }) => `Parola a fost schimbată cu ${f_created_at}.`,
        },
        BECAME_MENTOR: {
            title: 'Ai devenit mentor',
            message: () => 'Tocmai ai devenit mentor! Contribuie și tu la succesul altora!',
        },
        COURSE_FINISHED: {
            title: 'Ai terminat un curs',
            message: () => 'Tocmai ai terminat un curs. Bravo!',
        },
        FIRST_COURSE_JOINED: {
            title: 'Te-ai înscris prima dată la un curs!',
            message: () => 'Spor la învățat!',
        },
        FIRST_COURSE_POSTED: {
            title: 'Ai publicat primul tău curs!',
            message: () => 'Felicitări pentru contribuție!',
        },
    },
    classLevels: ['Altceva', 'Școala generală', 'Gimnaziu', 'Liceu', 'Facultate'],
    course: {
        loadAmount: 10,
    },
    profile: {
        postsLoadAmount: 10,
    },
    xpLevelColors: {
        10: '#dfdbff',
        20: '#afff9d',
        30: '#ffed41',
        40: '#991fff',
        50: '#ff4d00',
        60: '#4d7edc',
    },
};
