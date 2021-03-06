<?php

use Faker\Generator as Faker;

/* @var Illuminate\Database\Eloquent\Factory $factory */

$factory->define(App\Lesson::class, function (Faker $faker) {
    return [
        'title' => $faker->text($maxNbChars = 100),
        'short_description' => $faker->text($maxNbChars = 240),
        'content' => $faker->text($maxNbChars = 4000),
        'length' => $faker->numberBetween($min = 1000, $max = 9000),
        'thumbnail_id' => function() {
            return factory(App\Media::class)->create()->id;
        },
        'video_id' => function() {
            return factory(App\Media::class)->create([
                'type' => 1,
                'filename' => 'userdata/courses/videos/test.mp4',
            ])->id;
        },
        'course_id' => App\Course::all()->random()->id,
        'order_index' => 0, //not good
    ];
});