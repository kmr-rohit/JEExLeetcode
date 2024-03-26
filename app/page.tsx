import Image from "next/image";
import Link from "next/link";
import componentsImg from "./assets/components.png";
import { DownArrow, RightArrow } from "./icons";
import "./home.css";

export default function Home() {
  return (
    <main className="">
      <article className="grid lg:grid-cols-2 min-h-screen">
        <div className="px-8 py-20 md:px-20 lg:py-48">
          <h1 className="text-5xl font-semibold text-transparent md:text-6xl gradient">
            Crack JEE Here. 
          </h1>
          <p className="mt-2 text-lg">
            A simple, clean & powerfull website to help you crack JEE. It has practice problems, contests, and much more. 
          </p>
          <div className="flex gap-2 mt-8">
            <Link
              href="/dashboard"
              className="flex content-center gap-2 px-4 py-2 font-semibold text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
            >
              Go to Dashboard
              <div className="m-auto">
                <RightArrow />
              </div>
            </Link>
            <a
              className="flex gap-2 px-4 py-2 font-semibold text-gray-600 transition duration-100 rounded-lg hover:text-gray-800"
              href="#features"
            >
              Explore
              <div className="m-auto">
                <DownArrow />
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Image src={componentsImg} alt="Clerk embeddable components" />
        </div>
      </article>
      <article
        className="px-8 py-12 bg-black bg-opacity-5 md:px-20 md:py-24"
        id="features"
      >
        <h2 className="text-3xl font-semibold">What we have?</h2>
        <p className="mt-2">
          JeeXcode offers a variety of features to help you crack JEE. Here are a few of them:
        </p>
        <div className="grid gap-8 mt-8 lg:grid-cols-3">
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl border-2 border-indigo-500">
            <h3 className="text-lg font-medium">Problems</h3>
            <p className="text-gray-700">
              Problems setted by experts to help you practice and improve your skills with time limits , multiple attempts & Solutions to help you understand the problem.
            </p>
            <div className="grow"></div>
            <a
              href="/problems"
              className="text-primary-600 cta hover:underline"
              target="_blank"
            >
              Problems <span className="arrow">-&gt;</span>
            </a>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl border-2 border-indigo-500">
            <h3 className="text-lg font-medium">Contests</h3>
            <p className="text-gray-700">
              Contests to help you improve your speed and accuracy with a leaderboard to help you compare your performance with others. They also help you to stimulate CBT based JEE exam.
            </p>
            <div className="grow"></div>
            <a
              href="/contests"
              className="text-primary-600 cta hover:underline"
              target="_blank"
            >
              Contests <span className="arrow">-&gt;</span>
            </a>
          </div>
          <div className="flex flex-col h-56 gap-1 p-8 bg-white shadow-lg rounded-2xl border-2 border-indigo-500">
            <h3 className="text-lg font-medium">Discuss</h3>
            <p className="text-gray-700">
              Discuss your doubts with other students and experts to help you understand the problem better. Get to know other solutions to the same problem.
            </p>
            <div className="grow"></div>
            <a
              href="/discuss"
              className="text-primary-600 cta hover:underline"
              target="_blank"
            >
              Discuss <span className="arrow">-&gt;</span>
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
