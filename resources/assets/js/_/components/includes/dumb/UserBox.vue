<template>
    <router-link :to="{name: 'profile',  params: { username: user.username }}">
        <div :class="['user-box', size]">
            <image-container class="user-image" :src="user._image.filename" :level="userLevel"></image-container>
            <div class="user-info">
                <div class="user-name">{{user.first_name}} {{user.last_name}}</div>
            </div>
        </div>
    </router-link>
</template>
<script>
    import ImageContainer from './ImageContainer.vue';
    import { level } from '../../../../utils';

    export default {
        props: {
            user: {
                type: Object,
                required: true,
            },
            size: {
                type: String,
            },
        },
        computed: {
            userLevel() {
                return level(this.user.xp);
            },
        },
        components: {
            ImageContainer,
        },
    };
</script>

<style scoped>
    .user-box{
        display: flex;
    }
    .user-image{
        height: 36px;
        width: 36px;
        align-self: center;
        border-radius: 100%;
    }
    .user-info{
        display: flex;
        flex:1;
        align-items: center;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-image{
        height: 24px;
        width: 24px;
    }
    .user-name{
        font-size: .9em;
    }
</style>