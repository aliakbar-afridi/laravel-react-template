<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected   $skills = [
        "Communication Skills",
        "Active Listening",
        "Conflict Resolution",
        "Empathy and Emotional Intelligence",
        "Teamwork and Collaboration",
        "Negotiation Skills",
        "Leadership and Management",
        "Adaptability and Flexibility",
        "Problem-Solving",
        "Decision-Making",
        "Time Management",
        "Critical Thinking",
        "Interpersonal Skills",
        "Customer Service",
        "Presentation Skills",
        "Networking and Relationship Building",
        "Cultural Competence",
        "Stress Management",
        "Mentoring and Coaching",
        "Persuasion and Influence",
        "Self-Motivation",
        "Creativity and Innovation",
        "Organizational Skills",
    ];

    protected $educations = [
        "Matriculation (Matric)",
        "Intermediate (FA/FSc)",
        "Associate Degree",
        "Bachelor of Arts (BA)",
        "Bachelor of Science (BSc)",
        "Bachelor of Commerce (BCom)",
        "Bachelor of Engineering (BEng)",
        "Bachelor of Business Administration (BBA)",
        "Bachelor of Information Technology (BIT)",
        "Bachelor of Computer Science (BCS)",
        "Master of Arts (MA)",
        "Master of Science (MSc)",
        "Master of Business Administration (MBA)",
        "Master of Engineering (MEng)",
        "Master of Computer Applications (MCA)",
        "Master of Information Technology (MIT)",
        "Doctor of Philosophy (PhD)",
        "Doctor of Engineering (DEng)",
        "Doctor of Computer Science (DCS)",
        "Doctor of Business Administration (DBA)",
        "PHP Certification",
        "Certified Web Developer"
    ];

    public function definition(): array
    {
        $user = User::factory()->create();
        $user->assignRole("watcher");

        return [
            'user_id' => $user->id,
            'parent' => fake()->name(),
            'gender' => fake()->randomElement(['male', 'female']),
            'state' => fake()->state(),
            'city' => fake()->city(),
            'phone' => fake()->phoneNumber(),
            'about' => fake()->paragraph(),
            'skills' => implode(",", fake()->randomElements($this->skills, 5)),
            'education' => implode(",", fake()->randomElements($this->educations, 5)),
        ];
    }
}
