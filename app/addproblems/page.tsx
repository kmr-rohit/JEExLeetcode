"use client"
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Client, ID, Storage , Databases } from "appwrite";
import Loader from "@/components/ui/Loader";


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660aa6a870bf3eccb816');

const storage = new Storage(client);
const databases = new Databases(client);


export default function Component() {
  const [subject, setSubject] = useState('Physics');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false); // add loading state
  const [problemId, setProblemId] = useState("");

  const resetForm = () => {
    setSubject('Physics');
    setDescription('');
    setTags('');
    setDifficulty('Easy');
  }


  const handleSubjectChange = (value) => {
    setSubject(value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };




  const handleSubmit = async () => {
    setLoading(true); // start loading
    console.log('Submitted');
    console.log('Description: ', description);
    console.log('Subject: ', subject);
    console.log('Tags: ', tags);

    // upload file to bucket first 
    const fileUpload = storage.createFile(
      '660ab8470ea2b4f6bf47',
      ID.unique(),
      document.getElementById('file').files[0]
    );  
    
    fileUpload.then(function (response) {
      console.log(response); // Success
      const imgId = response['$id'];
      const bucketId = response['bucketId'];
      console.log('Image ID: ', imgId);
      console.log('Bucket ID: ', bucketId);
      // add problems data to problems collection
      const addProblemtoDatabase = databases.createDocument(
        '660aa6df1feb26fb9908',
        '660aa6ee26e26d787177',
        ID.unique(),
        {
          difficulty : difficulty,
          subject : subject,
          description : description,
          tags : tags.split(','), // convert tags to array
          imgId : imgId,
          bucketId : bucketId
        }
      );

      addProblemtoDatabase.then(function (response) {
          console.log(response);
          setProblemId(response['$id']); // save the problem id
          resetForm(); // reset form
      }, function (error) {
          console.log(error);
      });

      setLoading(false); // stop loading
    }, function (error) {
      console.log(error); // Failure
      setLoading(false); // stop loading
    });

    
  };

  return (
    <Card className="w-[90%] md:w-[60%] mx-10 md:mx-auto mt-10 border-2 border-black">
      <CardContent className="space-y-4">
        <div className="space-y-2 mt-5">
          <Label htmlFor="description">Problem Description</Label>
          <Input id="description" value={description} onChange={handleDescriptionChange} placeholder="Enter the question description." />
        </div>
        <div className="space-y-2">
          <Label>Choose Subject </Label>
          <div className="space-y-2.5">
            <Select value={subject} onValueChange={handleSubjectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Physics" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose Subject</SelectLabel>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Maths">Maths</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
          <Label>Choose Difficulty Level </Label>
          <div className="space-y-2.5">
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Easy" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose Subject</SelectLabel>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload Image</Label>
            <Input id="file" type="file" />
          </div>
          
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" value={tags} onChange={handleTagsChange} placeholder="Enter the relevent tags."  />
        </div>
        <Button className = "bg-blue-500" onClick={handleSubmit}>Submit</Button>
        {loading && <Loader />}
        {problemId && (
        <Button className = "bg-green-500 mt-4">
          <a href={`/problems/${problemId}`}>View Added Problem</a>
        </Button>
      )}
      </CardContent>
    </Card>
  )
}