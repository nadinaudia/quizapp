import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter()
    useEffect(() => 
    {
        const isLogin = localStorage.getItem('sudah-login')

    if (isLogin !== 'true') {
        router.push('/')
    }
    },[])
  
  return ( 
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img 
          src="https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?t=st=1736442325~exp=1736445925~hmac=91b2ff2c6d69668231f31a6347a5ac93ddb51f05c6a36d145eddc9d3910a6477&w=1060" 
          alt="Background" 
          className="h-full w-full object-cover" 
        />
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-white text-4xl font-bold mb-8">Get Ready to Challenge Yourself !!</h1>
        <Link href="/quiz">
          <button className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors">
            Start Quiz
          </button>
        </Link>
      </div>
    </div>
  );
}
