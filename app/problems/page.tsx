"use client"
import { useEffect, useState } from 'react';
import { Client, Databases ,Storage } from "appwrite";
import Link from "next/link"
import {
  ListFilter,
  PlusCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660aa6a870bf3eccb816');

const storage = new Storage(client);
const databases = new Databases(client);

export default function Problems() {
  const [problems, setProblems] = useState([]);
  useEffect(() => {
    const promise = databases.listDocuments('660aa6df1feb26fb9908', '660aa6ee26e26d787177');
    promise.then(function (response) {
      console.log(response); // Success
      setProblems(response.documents);
    }, function (error) {
      console.log(error); // Failure
    });
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="solved">Solved</TabsTrigger>
                <TabsTrigger value="markedReview">Marked For Review</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filter
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Difficulty Level
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Subject</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Submission Rate
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm" className="h-7 gap-1 bg-blue-400">
                  <PlusCircle className="h-3.5 w-3.5 " />
                  <Link href={`/addproblems`}>
                    <Button size="sm">Add Problem</Button>
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Problems</CardTitle>
                  <CardDescription>
                  This page hosts list of well setted problems by Experts , List of problems with supported fillters like , subject , difficulty , submission rate etc.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Sr.No</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>
                          <span >Action</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {problems.map((problem, index) => (
                      <TableRow key={problem.$id}>
                        <TableCell className="hidden sm:table-cell">
                          {index + 1}.
                        </TableCell>
                        <TableCell className="font-medium">
                          {problem.description}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{problem.subject}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={problem.difficulty}>{problem.difficulty}</Badge>
                        </TableCell>
                        <TableCell className="">
                          <Link href={`/problems/${problem.$id}`}>
                            <Button size="sm" className="bg-black text-white">
                              Solve
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))} 
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-20</strong> of <strong>500</strong>{" "}
                    Problems
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
