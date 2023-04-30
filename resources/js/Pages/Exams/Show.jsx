import Card from "@/Components/Card";
import Container from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import StudentLayout from "@/Layouts/StudentLayout";
import TeacherLayout from "@/Layouts/TeacherLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Show({ auth, enrollment, exam }) {
  const { data, setData, post, errors, processing } = useForm({
    answers: exam.questions.map((question) => {
      return { question_id: question.id, choice_id: "" };
    }),
  });

  const handleChangeAnswer = (e) => {
    const questionId = e.target.id.split("-").at(1);

    setData(
      "answers",
      data.answers.map((answer) => {
        if (answer.question_id == questionId) {
          return { ...answer, choice_id: e.target.value };
        }

        return answer;
      })
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("exams.answers.store", exam.id));
  };

  return auth.user.userable_type.includes("Student") ? (
    <StudentLayout user={auth.user}>
      <Head title="Take Exam" />

      <div className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <form onSubmit={submit}>
            {exam.questions.map((question, index) => {
              return (
                <div
                  key={question.id}
                  className="mb-4 bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                  <p className="mb-4">
                    {++index}. {question.content}
                  </p>
                  {question.choices.map((choice, index) => {
                    return (
                      <div key={choice.id} className="mb-4 flex items-center">
                        <input
                          id={`question-${question.id}-choice-${choice.id}`}
                          type="radio"
                          value={choice.id}
                          onChange={handleChangeAnswer}
                          name={`question-${question.id}}`}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                        <label
                          htmlFor={`question-${question.id}-choice-${index}`}
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          {choice.content}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            <PrimaryButton disabled={processing}>Submit</PrimaryButton>
          </form>
        </div>
      </div>
    </StudentLayout>
  ) : (
    <TeacherLayout user={auth.user}>
      <Container>
        <Card>You are not allowed to take an exam!</Card>
      </Container>
    </TeacherLayout>
  );
}
