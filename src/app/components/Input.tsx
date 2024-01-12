"use client";
import { IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { joinHackathon } from "../actions";
import { cn } from "@/lib/utils";

export default function Input() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      setLoading(false);
      setEmail("")
      return;
    }

    const response = await joinHackathon(email);

    // console.log(response);

    // alert(response?.message);

    if (response?.status === 400) {
      setLoading(false);
      setEmail("")
      toast.error(response?.message);
      return;
    } else if (response?.status === 200) {
      setLoading(false);
      setEmail("")
      toast.success(response.message);
      router.push("https://crackeddevs.devpost.com/");
      return;
    }
    
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex mx-3">
        <input
          type="email"
          onChange={handleInputChange}
          name="email"
          autoComplete="email"
          required
          placeholder="elon@spacex.com"
          className="rounded-l-lg w-full border outline-none relative z-10 focus:border-gray-500 transition-all duration-500 py-3 md:py-5 px-4 md:px-10 text-secondary bg-neutral-950 placeholder:text-neutral-700"
        />
        <button
          type="submit"
          className={cn("rounded-r-lg capitalize text-lg py-2 px-4 md:px-6 lg:px-8 bg-white text-black z-10", { "cursor-not-allowed": loading })}
          disabled={loading}
        >
          {loading ? (
            <>
              {" "}
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            <>
              <IconArrowRight/>
            </>
          )}
        </button>
      </form>
      <Toaster
        toastOptions={{
          duration: 2000,
        }}
      />
    </>
  );
}
