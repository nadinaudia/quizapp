import { login } from '@/lib/login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleClick = async () => {
    const result = await login(username, password)
    
    if (result.isCorrect){
      router.push('/home')
      localStorage.setItem('sudah-login', 'true')
    } else {
      alert('password salah')
    }
    
  }


  return ( 
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="/bg-quiz.png" 
          alt="Background" 
          className="h-full w-full object-cover" 
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-white text-4xl font-bold mb-8">Welcome to the Quiz App</h1>
        <form className="bg-black/40 p-6 rounded-lg shadow-lg max-w-sm w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-whitw-700 text-sm font-bold mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username" 
              className="w-full px-3 py-2 border text-black/60 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-white-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"                   
              className="w-full px-3 py-2 border text-black/60 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

            <button 
              type="button"
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>

        </form>
      </div>
    </div>
  );
}
