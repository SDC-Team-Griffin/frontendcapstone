import React from 'react'
import ReactDom from 'react-dom'
import { useSelector, useDispatch } from 'react-redux';
import {closeModal,question,answer} from '../../redux/actions/index.js'
import {useState, useEffect} from 'react'
import api from '../../apis/QA.js'
import axios from 'axios'


export default function InputModal({onClose}) {
  const dispatch = useDispatch();
  let productId = useSelector(state=>state.productId)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [submit, setSubmit] = useState(false)

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleBody = (e) => {
    setBody(e.target.value)
  }

  useEffect(() => {
    const postQuest = async () => {
      const posting = await api.postQ(productId,body,name,email)
     }
     postQuest()
  },[submit])

  const handleSubmit = async () => {
    try {
      await dispatch(question({'name':name, 'email':email,'body':body, 'product_id': productId}))
      setTimeout(() => {
        dispatch(closeModal())
      },100)
      setSubmit(true)
    } catch(error) {
      console.log('error:',error)
    }
  }



return ReactDom.createPortal(
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Ask a Question!
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <label>
                    Name:
                  <input className="my-4 text-slate-500 text-lg leading-relaxed" onChange = {handleName} type = 'text'></input>
                  <br></br>
                    Email:
                  <input className="my-4 text-slate-500 text-lg leading-relaxed" onChange = {handleEmail} type = 'text'></input>
                  <br></br>
                    Body:
                  <input className="my-4 text-slate-500 text-lg leading-relaxed" onChange = {handleBody} type = 'text'></input>
                  </label>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}>
                    Submit
                  </button>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => dispatch(closeModal())}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>, document.getElementById('portal')
)
}