import Card from "@/Components/Card";
import Container from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Show({ auth, exam, student, answers }) {
  const { data, setData, post, errors } = useForm({
    "answer-sheet": null,
  });

  const inputRef = useRef(null);

  const [filename, setFilename] = useState("");

  const submit = (e) => {
    e.preventDefault();

    post(route("answers.scan", [exam.id, student.id]));
  };

  console.log(answers);

  return (
    <TeacherLayout user={auth.user}>
      <Head title="Exam Results" />

      <Container>
        <Card>
          {auth.user.userable_type.includes("Teacher") ? (
            <form onSubmit={submit}>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg, image/png"
                name="answer-sheet"
                onChange={(e) => {
                  setFilename(e.target.files[0].name);
                  setData("answer-sheet", e.target.files[0]);
                }}
                id="answer-sheet"
                className="hidden"
              />

              <div className="max-w-xl">
                <InputLabel value="Student's Answer Sheet" />

                <TextInput value={filename} className="block w-full" readOnly />

                <InputError message={errors["answer-sheet"]} className="mt-1" />
              </div>

              <div className="mt-4 flex space-x-2">
                <PrimaryButton
                  type="button"
                  disabled={false}
                  onClick={() => inputRef.current.click()}
                >
                  Scan
                </PrimaryButton>
                <PrimaryButton type="submit" disabled={false}>
                  Generate Score
                </PrimaryButton>
              </div>
            </form>
          ) : (
            <></>
          )}

          <div className="mb-2 mt-6 flex justify-between">
            <h2 className="font-medium text-gray-900">Results</h2>
            <span>
              {answers.filter((answer) => answer.choice.correct === 1).length} /{" "}
              {exam.questions.length}
            </span>
          </div>
          {answers ? (
            exam.questions.map((question, index) => {
              return (
                <div
                  key={question.id}
                  className="mb-4 bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                  <div className="flex justify-between">
                    <p className="mb-4">
                      {++index}. {question.content}
                    </p>
                  </div>
                  {question.choices.map((choice, index) => {
                    return (
                      <div key={choice.id} className="mb-4 flex items-center">
                        <input
                          id={`question-${question.id}-choice-${choice.id}`}
                          type="radio"
                          value={choice.id}
                          name={`question-${question.id}}`}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                          required
                          checked={answers.some(
                            (answer) => answer.choice.id === choice.id
                          )}
                          readOnly
                        />
                        <label
                          htmlFor={`question-${question.id}-choice-${index}`}
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          <span
                            className={`${
                              answers.some(
                                (answer) => answer.choice.id === choice.id
                              )
                                ? "answer-correct"
                                : "answer-incorrect"
                            }`}
                          >
                            {choice.content}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <p className="mt-2 font-medium text-gray-500">
              This student has not yet taken this exam.
            </p>
          )}
        </Card>
      </Container>
    </TeacherLayout>
  );
}
