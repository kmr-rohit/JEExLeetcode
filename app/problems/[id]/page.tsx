"use client"
import {useParams} from "next/navigation";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
export type Problem = {
  id: number
  title: string
  description: string
  difficulty: string
  subject: string
  submissionRate: number
  tags: string[]
  options : string[]
  correctAnswerIndex : number
  userAnswer : number
}



const problems: Problem[] = [
  {
    id: 1,
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    difficulty: 'Easy',
    subject: 'Physics',
    submissionRate: 0.5,
    tags: ['NLM', 'Work Energy'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 2,
    title: 'Add Two Numbers',
    description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit.',
    difficulty: 'Medium',
    subject: 'Chemistry',
    submissionRate: 0.7,
    tags: ['Chemical Reactions', 'Atomic Structure'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Hard',
    subject: 'Maths',
    submissionRate: 0.6,
    tags: ['Algebra', 'Calculus'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 4,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Hard',
    subject: 'Maths',
    submissionRate: 0.6,
    tags: ['Algebra', 'Calculus'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 5,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Hard',
    subject: 'Maths',
    submissionRate: 0.6,
    tags: ['Algebra', 'Calculus'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 6,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Hard',
    subject: 'Maths',
    submissionRate: 0.6,
    tags: ['Algebra', 'Calculus'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 7,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Hard',
    subject: 'Maths',
    submissionRate: 0.6,
    tags: ['Algebra', 'Calculus'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  },
  {
    id: 8,
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string, find the length of the longest substring without repeating characters.',
    difficulty: 'Hard',
    subject: 'Maths',
    submissionRate: 0.6,
    tags: ['Algebra', 'Calculus'],
    options : ['dafd','adfd','asdsf','adsd'],
    correctAnswerIndex : 1,
    userAnswer : 0
  }
]

// extract id from url slug 

function getProblem(id: number) {
  return problems.find((problem) => problem.id === id);
}

export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const problemId = parseInt(id as string, 10);
      const problem = getProblem(problemId);
      setProblem(problem);
    }
  }, [id]);
  
  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(Number(e.target.value));
  }

  function handleSave() {
    if (selectedOption === problem?.correctAnswerIndex-1) {
      setResult('Correct');
    } else {
      setResult('Incorrect');
    }
  }

  

  function renderProblem(problem: Problem) { 
    return (
      <Card className="w-11/12 mx-auto my-10 p-5 border-2 border-gray-300 rounded-md shadow-lg">
        <CardHeader className="pb-4 border-b-2 border-gray-200">
        <h2 className="text-2xl text-blue-600 font-bold">{problem.title}</h2>
          <div className='flex space-x-4 border-1 border-black mt-2'>
            <h2 className="text-md font-medium">Difficulty: {problem.difficulty}</h2>
            <p className="text-md font-medium">Submission Rate: {problem.submissionRate}</p>
            <p className="text-md font-medium">Subject: {problem.subject}</p>
            <p className="text-md font-medium">Tags: {problem.tags.join(", ")}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 py-4">
          <div className="space-y-2">
            <p className="text-xl font-semibold">Problem Description: </p>
            <p className='text-lg'>{problem.description}</p>
            <p className='text-xl font-semibold'>Options :</p>
            <div className="flex space-x-4 mt-2">
            {problem.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="options"
                      id={`option-${index}`}
                      value={index}
                      checked={selectedOption === index}
                      onChange={handleOptionChange}
                    />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4 m-4">
        <Button
            className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
            variant="outline"
          >
            Mark for review
          </Button>
          <Button
            className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded"
            variant="default"
            onClick={handleSave}
          >
            Save
          </Button>
        </CardFooter>
        {result && (
          <div className={`text-center mt-4 text-2xl font-bold ${result === 'Correct' ? 'text-green-500' : 'text-red-500'}`}>
            {result}
          </div>
        )}
      </Card>

    )
  }



  if (!problem) {
    return <div>Loading...</div>;
  }
  else{
    return renderProblem(problem);
  }

}
