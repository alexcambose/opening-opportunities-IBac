<template>
    <div v-if="fetched">
        <b-modal :active.sync="isQuestionsModalActive" has-modal-card>
            <lesson-questions :onSuccess="lessonWatched"></lesson-questions>
        </b-modal>

        <section class="hero is-info">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        {{course.title}}
                    </h1>
                    <h2 class="subtitle mt-4 is-pulled-right">
                        <b-icon pack="fa" icon="clock-o" size="is-small"></b-icon>
                        {{length}}
                    </h2>
                    <progress class="progress is-dark" :value="progress" max="100"></progress>
                </div>
            </div>
        </section>
        <div v-if="fetched" class="course-watch">
            <div class="lesson-content">
                <div class="columns">
                    <div class="column is-4">
                        <lesson-sidebar></lesson-sidebar>
                        <lesson-notes></lesson-notes>
                    </div>
                    <div class="column is-8">
                        <lesson-video :onEnded="onVideoEnded"></lesson-video>
                    </div>
                </div>
            </div>
            <div class="container lesson-footer">
                <lesson-footer></lesson-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import { timeConvert } from '../../../../../../utils';
    import { mapActions, mapState, mapGetters } from 'vuex';
    import LessonVideo from './LessonVideo.vue';
    import LessonSidebar from './LessonSidebar.vue';
    import LessonQuestions from './LessonQuestions.vue';
    import LessonFooter from './LessonFooter.vue';
    import LessonNotes from './notes/CourseNotes.vue';
    export default {
        mounted() {
            const loadingComponent = this.$loading.open();
            this.getLessons(this.$route.params.slug)
                .then(() => this.getCourseInfo(this.$route.params.slug))
                .then(() => {
                    this.fetched = true;
                    loadingComponent.close();
                })
                .catch(() => {
                    this.$router.replace({ name: 'courseWelcome', params: { slug: this.$route.params.slug } });
                    loadingComponent.close();
                });
        },
        data() {
            return {
                fetched: false,
                isQuestionsModalActive: false,
            };
        },
        computed: {
            ...mapState({
                course: ({ course }) => course.courseInfo,
            }),
            ...mapGetters(['progress', 'lessons']),
            lesson() {
                const { currentLessonIndex } = this.$store.state.course;
                return this.lessons[currentLessonIndex];
            },
            length() {
                const total = this.course._lessons.reduce((time, lesson) => time + lesson.length, 0);
                return timeConvert(total);
            },
        },
        methods: {
            ...mapActions(['getLessons', 'getCourseInfo', 'lessonMarkAsViewed']),
            onVideoEnded() {
                if (this.lesson._questions.length) {
                    this.isQuestionsModalActive = true;
                } else if (!this.lesson._watched) {
                    this.lessonWatched();
                }
            },
            lessonWatched() {
                this.isQuestionsModalActive = false;
                this.lessonMarkAsViewed()
                    .then(() => {
                        if (this.$store.state.course.currentLessonIndex === this.lessons.length - 1 && this.lessons[this.$store.state.course.currentLessonIndex]._watched === true) {
                            this.$dialog.alert({
                                title: 'Felicitări!',
                                message: 'Tocmai ai terminat acest curs!',
                                confirmText: 'Super!',
                                onConfirm: () => {
                                    this.$router.push({ name: 'root' });
                                },
                            });
                        } else {
                            this.$dialog.alert({
                                title: 'Ai terminat o lecție!',
                                message: `Felicitări pentru terminarea lecției <b>${this.lesson.title}</b>.`,
                                confirmText: 'Următoarea lecție!',
                            });
                        }
                    });
            },
        },
        components: {
            LessonVideo,
            LessonSidebar,
            LessonFooter,
            LessonNotes,
            LessonQuestions,
            // CourseBox,
            // CourseCard,
        },
    };
</script>
