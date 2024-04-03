"use client"
import {useParams} from "next/navigation";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input} from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Client, Storage , Databases ,Query  } from "appwrite";

export type Problem = {
  id: String
  description: string
  difficulty: string
  subject: string
  tags: string[]
  imgId: string
  solutionImgId: string
  correctAnswer: string
}


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660aa6a870bf3eccb816');

const storage = new Storage(client);
const databases = new Databases(client);

const options = ["A" , "B" , "C" , "D"];

function getProblem(id: string): Promise<Problem> {
  console.log(id)
  const document = databases.getDocument('660aa6df1feb26fb9908', '660aa6ee26e26d787177', id);
  
  return document.then(function (response) {
      console.log(response);
      const problem: Problem = {
        id: response.$id,
        description: response.description,
        difficulty: response.difficulty,
        subject: response.subject,
        tags: response.tags,
        imgId: response.imgId,
        solutionImgId: response.solutionImgId,
        correctAnswer: response.correctOption
      };
      return problem;
  }, function (error) {
      console.log(error);
      throw error;  // Throw the error so it can be caught
  });
}

function getImageUrl(fileId: string): URL {
  const imageUrl = storage.getFileView('660ab8470ea2b4f6bf47', fileId);
  console.log(imageUrl);
  return imageUrl;
}


export default function ProblemPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [solutionImageUrl, setSolutionImageUrl] = useState<string | undefined>(undefined);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getProblem(id).then(problem => {
        setProblem(problem);
        setImageUrl(getImageUrl(problem.imgId).toString());
        setSolutionImageUrl(getImageUrl(problem.solutionImgId).toString());
      }).catch(error => {
        console.error(error);
        // handle error
      });
    }
  }, [id]);
  
  
  function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(Number(e.target.value));
  }

  function handleSave() {
    if (selectedOption === options.indexOf(problem?.correctAnswer)) {
      setResult('Correct');
    } else {
      setResult('Incorrect');
    }
  }

  function handleShowSolution() {
    setShowSolution(true);
  }

  function renderProblem(problem : Problem) { 
    return (
      <div className="grid">
        <Card className="w-11/12 mx-auto my-10 p-2 ">
          <CardHeader className="pb-4 border-b-2 border-gray-200">
            <p className="text-xl font-semibold">Problem: {problem.description} </p>
            <div className='flex space-x-4 border-1 border-black mt-2'>
              <h2 className="text-md font-medium">Difficulty: {problem.difficulty}</h2>
              <p className="text-md font-medium">Subject: {problem.subject}</p>
              <p className="text-md font-medium">Tags: {problem.tags.join(", ")}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-4">
            <div className="space-y-2">
              
              <div className="">
                <img src={imageUrl} alt="Problem" />
              </div>
              
              <p className='text-xl flex font-semibold'>Options :</p>
              <div className="flex space-x-4 mt-2">
                {options.map((option, index) => (
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
            { (
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded"
                  variant="outline"
                  onClick={() => setShowSolution(!showSolution)}
                >
                  {showSolution ? "Hide Solution" : "View Solution"}
                </Button>
              
              )}
            <Button
              className="bg-green-500 text-white hover:bg-green-600 py-2 px-4 rounded"
              variant="default"
              onClick={handleSave}
            >
              Submit
            </Button>
             
          </CardFooter>
          {result && (
            <div className={`text-center mt-4 text-2xl font-bold ${result === 'Correct' ? 'text-green-500' : 'text-red-500'}`}>
              {result}
            </div>
          )}
        </Card>
        {showSolution && (
          <Card className="w-11/12 mx-auto my-10 p-2 ">
            <CardHeader className="pb-4 border-b-2 border-gray-200">
              <p className="text-xl font-semibold">Correct Option: {problem.correctAnswer}</p>
            </CardHeader>
            <CardContent className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="">
                  <img src={solutionImageUrl} alt="Solution" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
       
      </div>
    )
  }

  if (!problem) {
    return <div>Loading...</div>;
  }
  else{
    return renderProblem(problem);
  }
}
