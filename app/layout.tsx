import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Docs, Github, Times } from "./icons";
import { Twitter } from "./icons";
import { Discord } from "./icons";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JeeXcode",
  description:
    "A simple, clean & powerfull website to help you crack JEE. It has practice problems, contests, and much more.",
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <body className={`${inter.className} flex flex-col`}>
          <header className="flex md:flex-nowrap items-center gap-2 md:px-4 border-b border-black border-solid  border-opacity-20">
            <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
              <div className="text-2xl font-semibold text-indigo-500">JeeXcode</div>
            </Link>
            <Link href="/problems" className="flex items-center h-20 gap-2 sm:gap-4">
              <div className="text-sm  text-black">Problems</div>
            </Link>
            <Link href="/contests" className="flex items-center h-20 gap-2 sm:gap-4">
              <div className="text-sm text-black">Contests</div>
            </Link>
            <Link href="/discuss" className="flex items-center h-20 gap-2 sm:gap-4">
              <div className="text-sm  text-black">Discuss</div>
            </Link>
            <div className="grow " />
            <Link href="/dashboard" className="flex items-center h-20 gap-2 sm:gap-4">
              <div className="text-sm text-black">Dashboard</div>
            </Link>
            <SignedIn>
              <div className="hidden sm:block">
                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard" />
              </div>
              <div className="block sm:hidden">
                <OrganizationSwitcher
                  afterCreateOrganizationUrl="/dashboard"
                  appearance={{
                    elements: {
                      organizationSwitcherTriggerIcon: `hidden`,
                      organizationPreviewTextContainer: `hidden`,
                      organizationSwitcherTrigger: `pr-0`,
                    },
                  }}
                />
              </div>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </header>
          <main className="grow">{children}</main>
          <footer className="flex flex-wrap items-center h-20 gap-1 px-8 font-medium border-t md:px-20">
            <Link href="/" className="flex items-center h-20 gap-2 sm:gap-4">
              <div className="text-xl font-semibold text-indigo-500">JeeXcode</div>
            </Link>
            <span className="text-sm">© 2024</span>
          </footer>
        </body>
      </ClerkProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  );
}
