import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "~/api/authApi";
import HandleToken from "~/helper/handleToken";

const FormPass = ({ props }) => {
    const { register, handleSubmit, formState: { errors: err } } = useForm();
    const [postData,setPostData] = useState(false);
    const [dataPost,setDataPost] = useState({})
    const getToken = HandleToken()
    const onSubmit = (data) => {
        if(data.confirm !== data.newPass){
            alert("Confirm password doesn't match with new password")
            return
        }
        setDataPost({currentPass:data.currentPass,newPass:data.newPass})
        setPostData(true)
    }
    useEffect(() => {
        if(postData === true) {
           const post = async() => {
            const token = await getToken()
            updatePassword(token,dataPost)
            .then(
                res => {
                    alert(res.message)
                    if(res.status === 200){
                        setDataPost({})
                        setPostData(false)
                        props.setFormPassword(false)
                    }
                }
            )
           } 
           post()
        }
    },[postData])
    return <div className="form w-screen h-screen flex items-center justify-center fixed top-0 z-50">
        <div onClick={() => { props.setFormPassword(false) }} className="overlay w-full h-full z-10 bg-black opacity-50 absolute"></div>
        <section className="w-2/5 min-w-[300px] antialiased fixed  z-20 m-auto">
            <div className="w-full flex flex-col mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                <span className="text-4xl font-bold">Reset password</span>
                <span className="text-slate-500">Fill up the form to reset the password</span>

                <form action="" className="my-10">
                    <div className="flex flex-col space-y-5">
                        <label for="currentPass">
                            <input id="currentPass" name="currentPass" type="currentPass" className="w-full py-3 text-black border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Current password" {...register("currentPass", { required: "This is not required" })}/>
                        </label>
                        <label for="newPass">
                            <input id="newPass" name="newPass" type="newPass" className="w-full py-3 text-black border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="New password" {...register("newPass", { required: "This is not required" })}/>
                        </label>
                        <label for="confirmPass">
                            <input id="confirmPass" name="confirmPass" type="confirmPass" className="w-full py-3 text-black border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                placeholder="Confirm new password" {...register("confirm", { required: "This is not required" })}/>
                        </label>

                        <button 
                            onClick={(e) => { e.preventDefault();handleSubmit(onSubmit)(); }}
                            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                            </svg>

                            <span>Reset password</span>
                        </button>
                        
                    </div>
                </form>
            </div>

        </section>
        
    </div>
}
export default FormPass