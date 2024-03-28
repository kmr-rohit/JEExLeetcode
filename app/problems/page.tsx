import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
// Define type of Problem Data : id , title , description , difficulty , subject , submissionRate , tags

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

// Define list of problems

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

// Define a function to render list of problems

function renderProblems(problems: Problem[]) {
  return (
// render table of Problem component using clean tailwind css styles 

    
    <div>
    <Table className="w-full mt-6">
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg text-blue-500">Problem Title</TableHead>
          <TableHead className=' text-lg text-blue-500'>Subject</TableHead>
          <TableHead className='text-lg text-blue-500'>Difficulty</TableHead>
          <TableHead className='text-lg pl-6 w-[100px]'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {problems.map((problem) => (
          <TableRow key={problem.id}>
            <TableCell className='text-md text-left'>{problem.title}</TableCell>
            <TableCell className='text-left '>
              <span className='bg-black text-white rounded-lg p-2'>
                {problem.subject}
              </span>
            </TableCell>
            <TableCell className='text-left'>
              {problem.difficulty === 'Easy' ? (
            <span className='rounded-lg bg-green-500 rounded-lg p-2'>
                {problem.difficulty}
              </span> 
              ) : problem.difficulty === 'Medium' ? (
                <span className=' rounded-lg bg-blue-500 rounded-lg p-2'>
                {problem.difficulty}
              </span>
              ) : (
                <span className='rounded-lg bg-red-500 rounded-lg p-2'>
                {problem.difficulty}
              </span>
              )}
            </TableCell>
            <TableCell className="items-start">
              <Link href={`/problems/${problem.id}`}>
               <Button className="bg-black text-white" size="sm">Solve</Button>
              </Link>

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>


    </div>

  )
}


function Problems() {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="text-center m-2">
        {/* <h1 className="text-3xl font-semibold text-indigo-500">Problems</h1> */}
        <p className="text-lg text-black">This page hosts list of well setted problems by Experts , List of problems with supported fillters like , subject , difficulty , submission rate etc. </p>
        {renderProblems(problems)}
      </div>
      </div>
  )
}

export default Problems