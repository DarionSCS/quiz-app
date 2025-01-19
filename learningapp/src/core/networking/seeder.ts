import { API } from "./supabaseClient";
import { faker } from "@faker-js/faker";
import { Question } from "@core/questions/types";

async function seedQuestions() {
  // Fetch valid `subject_id` values
  const { data: subjects, error: subjectsError } = await API.from(
    "subjects"
  ).select("id");
  if (subjectsError || !subjects || subjects.length === 0) {
    console.error(
      "Error fetching subjects. Ensure subjects are seeded first:",
      subjectsError
    );
    return;
  }

  // Generate random questions
  const questions: Omit<Question, "id">[] = Array.from({ length: 90 }).map(
    () => {
      const isMultipleChoice = faker.datatype.boolean();

      return {
        question: faker.lorem.sentence(),
        subject_id: faker.helpers.arrayElement(subjects).id,
        img: faker.image.url(),
        question_type: isMultipleChoice ? "multiple-choice" : "open-ended", // Explicitly typed
        options: isMultipleChoice
          ? JSON.stringify([
              faker.word.noun(),
              faker.word.noun(),
              faker.word.noun(),
              faker.word.noun(),
            ])
          : null,
        answer: isMultipleChoice
          ? faker.helpers.arrayElement(["A", "B", "C", "D"])
          : faker.lorem.sentence(),
        difficulty: faker.helpers.arrayElement([
          "Beginner",
          "Intermediate",
          "Advanced",
        ]),
        created_at: new Date().toISOString(),
      };
    }
  );

  // Insert questions into the table
  const { data, error } = await API.from("questions").insert(questions);

  if (error) {
    console.error("Error seeding questions:", error);
  } else {
    console.log("Questions seeded successfully:", data);
  }
}
