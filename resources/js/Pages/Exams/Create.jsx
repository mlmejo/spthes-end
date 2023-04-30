import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Question from "@/Components/Question";
import Container from "@/Components/Container";
import Card from "@/Components/Card";

export default function Create({ auth, enrollment }) {
  const [noOfQuestions, setNoOfQuestions] = useState("");
  const [questions, setQuestions] = useState([]);

  const { data, setData, post, processing, errors } = useForm({
    title: "Sample Title",
    questions: [],
  });

  useEffect(() => {
    setData("questions", questions);
  }, [questions]);

  const generate = () => {
    const newQuestions = Array.from(
      { length: noOfQuestions },
      (question, index) => ({
        id: index,
        content: "Sample Question",
        choices: [
          { id: 1, content: "Sample Option 1", correct: false },
          { id: 2, content: "Sample Option 2", correct: false },
          { id: 3, content: "Sample Option 3", correct: false },
          { id: 4, content: "Sample Option 4", correct: false },
        ],
      })
    );

    setQuestions(newQuestions);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("enrollments.exams.store", enrollment.id));
  };

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Create Exam" />

      <Container>
        <Card>
          <form onSubmit={submit}>
            <PrimaryButton type="submit" className="mb-4" disabled={false}>
              Save
            </PrimaryButton>
            <div className="max-w-xl">
              <TextInput
                placeholder="Exam title"
                value={data.title}
                onChange={(e) => {
                  setData("title", e.target.value);
                }}
                className="mt-1 block w-full"
                required
              />
            </div>

            <div className="mt-4 flex max-w-xl items-center">
              <TextInput
                type="number"
                placeholder="Number of items"
                value={noOfQuestions}
                onChange={(e) => {
                  setNoOfQuestions(e.target.value);
                }}
                className="mt-1 block w-full"
              />
              <PrimaryButton
                onClick={generate}
                className="ml-2"
                disabled={processing}
              >
                Generate
              </PrimaryButton>
            </div>

            {questions.map((question, index) => (
              <div key={index}>
                <Question
                  id={index}
                  questions={questions}
                  onChange={setQuestions}
                />
              </div>
            ))}
          </form>
        </Card>
      </Container>
    </TeacherLayout>
  );
}
