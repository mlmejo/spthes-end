import TextInput from "@/Components/TextInput";

export default function Question({ id, questions, onChange }) {
  const question = questions.find((e) => e.id === id);

  const handleChange = (e) => {
    const choiceId = parseInt(e.target.id.split("-").at(-1)) - 1;

    const updatedChoice = {
      ...question.choices[choiceId],
      content: e.target.value,
    };

    question.choices[choiceId] = updatedChoice;

    const newQuestions = [
      ...questions.filter((el) => {
        return el.id !== question.id;
      }),
      question,
    ];

    onchange(newQuestions);
  };

  const setCorrect = (e) => {
    const choiceId = parseInt(e.target.id.split("-").at(-1)) - 1;

    const updatedChoice = {
      ...question.choices[choiceId],
      correct: true,
    };

    question.choices = question.choices.map((el) => {
      return { ...el, correct: false };
    });

    question.choices[choiceId] = updatedChoice;

    const newQuestions = [
      ...questions.filter((el) => {
        return el.id !== question.id;
      }),
      question,
    ];

    onChange(newQuestions);
  };

  const setQuestion = (e) => {
    const newQuestions = [
      ...questions.filter((el) => {
        return el.id !== question.id;
      }),
      { ...question, question: e.target.value },
    ];

    onChange(newQuestions);
  };

  return (
    <div className="grow bg-white p-4 shadow sm:rounded-lg sm:p-8">
      <TextInput
        placeholder="Untitled Question"
        value={question.content}
        onChange={setQuestion}
        className="mb-4 mt-1 block w-full max-w-xl"
        required
      />

      <div className="mb-4 mt-2 flex max-w-xl items-center">
        <input
          id={`question-${id}-radio-1`}
          type="radio"
          name={`question-${id}`}
          onChange={setCorrect}
          className="mr-2 h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <TextInput
          id={`question-${id}-option-1`}
          value={question.choices[0].content}
          onChange={handleChange}
          placeholder="Option 1"
          className="w-full"
          required
        />
      </div>

      <div className="mb-4 mt-2 flex max-w-xl items-center">
        <input
          id={`question-${id}-radio-2`}
          type="radio"
          name={`question-${id}`}
          onChange={setCorrect}
          className="mr-2 h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <TextInput
          id={`question-${id}-option-2`}
          value={question.choices[1].content}
          onChange={handleChange}
          placeholder="Option 2"
          className="w-full"
          required
        />
      </div>

      <div className="mb-4 mt-2 flex max-w-xl items-center">
        <input
          id={`question-${id}-radio-3`}
          type="radio"
          name={`question-${id}`}
          onChange={setCorrect}
          className="mr-2 h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <TextInput
          id={`question-${id}-option-3`}
          value={question.choices[2].content}
          onChange={handleChange}
          placeholder="Option 3"
          className="w-full"
          required
        />
      </div>

      <div className="mb-4 mt-2 flex max-w-xl items-center">
        <input
          id={`question-${id}-radio-4`}
          type="radio"
          name={`question-${id}`}
          onChange={setCorrect}
          className="mr-2 h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <TextInput
          id={`question-${id}-option-4`}
          value={question.choices[3].content}
          onChange={handleChange}
          placeholder="Option 4"
          className="w-full"
          required
        />
      </div>
    </div>
  );
}
