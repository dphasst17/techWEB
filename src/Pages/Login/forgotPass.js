import { useState } from "react"

const Forgot = ({state,handle}) => {
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
    return <section id="content" role="main" className="w-full mx-auto p-6">
    <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
      <div className="p-4 sm:p-7">
        <div className="text-center">
          <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
          <div className=" flex justify-center mt-2 text-sm text-gray-600 dark:text-gray-400">
            Remember your password?
            <p onClick={() => {state(false)}} className="text-gray-100 decoration-2 hover:underline font-medium cursor-pointer" >
              Login here
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="formForgotPass">
            <div className="grid gap-y-4">
            <div>
                <label for="username" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Username</label>
                <div className="relative">
                  <input type="text" id="username" name="username" onChange={(e) => {setUsername(e.target.value)}} className="py-3 px-4 block w-full border-2 outline-none border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"/>
                </div>
              </div>
              <div>
                <label for="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                <div className="relative">
                  <input type="email" id="email" name="email" onChange={(e) => {setEmail(e.target.value)}}  className="py-3 px-4 block w-full outline-none border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                </div>
              </div>
              <button onClick={() => {handle(username,email)}} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
}
export default Forgot