"use client";

import { useUser } from "@clerk/nextjs";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { CopyIcon, Dot } from "../icons";
import Image from "next/image";
import "./prism.css";

declare global {
  interface Window {
    Prism: any;
  }
}

export function UserDetails() {
  const { isLoaded, user } = useUser();
  const [jsonOutput, setJsonOutput] = useState(false);

  return (
    <div
      className="bg-white overflow-hidden sm:rounded-lg"
      style={{
        boxShadow: `0px 20px 24px -4px rgba(16, 24, 40, 0.08)`,
      }}
    >
      {isLoaded && user ? (
        jsonOutput ? (
          <div className="overflow-scroll max-h-96 pb-6">
            <JSONOutput json={user} />
          </div>
        ) : (
          <div className="pb-6 max-h-96">
            <dl>
              {user.firstName && (
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">First Name</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {user.firstName}
                  </dd>
                </div>
              )}
              {user.lastName && (
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Last Name</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    {user.lastName}
                  </dd>
                </div>
              )}
              <div className="px-8 py-2">
                <dt className="text-sm font-semibold mb-1">Email addresses</dt>
                <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                  {user.emailAddresses.map((email) => (
                    <div key={email.id} className="flex gap-2 mb-1">
                      {email.emailAddress}
                      {user.primaryEmailAddressId === email.id && (
                        <span className="text-xs bg-primary-50 text-primary-700 rounded-2xl px-2 font-medium pt-[2px]">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </dd>
              </div>
              {user.imageUrl && (
                <div className="px-8 py-2">
                  <dt className="text-sm font-semibold mb-1">Profile Image</dt>
                  <dd className="mt-1 text-sm text-gray-600 sm:mt-0 sm:col-span-2">
                    <img
                      src={user.imageUrl}
                      className="rounded-full w-12 h-12"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )
      ) : (
        <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          Loading user data...
        </div>
      )}
    </div>
  );
}

function Toggle(props: {
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center justify-end flex-1">
      <button
        disabled={props.disabled}
        onClick={props.onChange}
        className={classNames({
          "rounded-l-lg py-2 px-4 border-solid border border-gray-300 transition text-sm font-semibold":
            true,
          "bg-gray-100": !props.checked,
          "bg-gray-50 text-gray-500 cursor-not-allowed": props.disabled,
        })}
      >
        List
      </button>
      <button
        disabled={props.disabled}
        onClick={props.onChange}
        className={classNames({
          "rounded-r-lg py-2 px-4 border-solid border border-gray-300 -ml-[1px] transition text-sm font-semibold":
            true,
          "bg-gray-100": props.checked,
          "bg-gray-50 text-gray-500 cursor-not-allowed": props.disabled,
        })}
      >
        JSON
      </button>
    </div>
  );
}

function CopyButton(props: { text: string }) {
  const [tooltipShown, setTooltipShown] = useState(false);

  useEffect(() => {
    if (tooltipShown) {
      const timeout = setTimeout(() => setTooltipShown(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [tooltipShown]);

  return (
    <>
      <button
        onClick={() => {
          if (navigator.clipboard) navigator.clipboard.writeText(props.text);
          setTooltipShown(true);
        }}
      >
        <CopyIcon />
      </button>

      <div
        className={classNames({
          "absolute z-10 bg-gray-900 text-white rounded p-2 text-xs transition-all ease-in-out translate-x-60 shadow-sm shadow-gray-500":
            true,
          "translate-y-10 opacity-0": !tooltipShown,
          "translate-y-6": tooltipShown,
        })}
      >
        Copied!
      </div>
    </>
  );
}

function JSONOutput(props: { json: any }) {
  useEffect(() => {
    if (window.Prism) {
      console.log(`highlighting`);
      window.Prism.highlightAll();
    }
  }, []);

  return (
    <pre className="px-8 sm:px-6 text-black text-sm">
      <code className="language-json">
        {JSON.stringify(props.json, null, 2)}
      </code>
    </pre>
  );
}


